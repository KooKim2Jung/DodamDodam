# gpt_model_utility.py
from collections import deque

import openai
from sqlalchemy.orm import Session
from users.services import ProfileService
from users.schemas import ProfileRead
from typing import List, Dict, Tuple, Any
from transformers import AutoTokenizer, AutoModel
import torch
import numpy as np


def embed_text_with_hf(text: str) -> np.ndarray:
    model_name = "BM-K/KoSimCSE-roberta-multitask"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModel.from_pretrained(model_name)

    inputs = tokenizer(text, padding=True, truncation=True, return_tensors="pt", max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
        embeddings = outputs.last_hidden_state.mean(dim=1).cpu().numpy().astype(np.float32)
    return embeddings.squeeze()

def search_documents(index, query: str, user_id: int) -> List[str]:
    query_embedding = embed_text_with_hf(query)

    index_result = index.query(
        vector=query_embedding.tolist(),
        top_k=4,
        include_metadata=True,
        filter={"user_id": user_id}  # 특정 user_id 필터링
    )

    return [match['metadata']['info'] for match in index_result['matches']]

def chat_prompt_info(user_id: int, db: Session, combined_context: str = "") -> str:
    profile: ProfileRead = ProfileService.read_profile(user=user_id, db=db)
    prompt = (
        f"Your name is 도담, and you are a friendly and casual assistant. "
        f"The user's name is {profile.name}, last name is {profile.last_name}, they are {profile.age} years old. "
        f"The user's gender is {profile.gender}, and their peculiarity is '{profile.remark}'. "
        f"Please respond informally in Korean. Do not use emoticons. "
        f"Include the user's profile information in your responses only if the conversation naturally leads to it."
        f"Since people are shy about the peculiarities, it is better to have a conversation based on the relevant contents "
        f"when the conversation is about the peculiarities rather than recklessly mentioning the peculiarities."
        f"Your answers are sometimes out of context. Why don't you answer them step by step?"
        f"It's important to answer at eye level because the person you're talking to may find it hard to understand difficult words."
        f"I think your way of speaking is unnatural when you ask questions related to peculiarities. Why don't you say it step by step?"
        f"If a person talks to you with honorifics, you'd better talk with honorifics."
        f"But if you talk in a friendly way, you should talk in a friendly way, too."
        f"Even if a person speaks to you in a friendly way, if they ask you to speak in honorifics, you should speak in honorifics."
        f"\n\nRelevant information based on previous context:\n{combined_context}"
    )
    return prompt


def summarize_messages(messages: deque, prompt: str) -> deque:
    summary_message = "요약된 대화 내용: "
    for message in messages:
        summary_message += f"{message['role']}: {message['content']} "

    # 요약된 내용을 새로운 deque로 반환, 프롬프트를 다시 포함
    summarized_deque = deque([{"role": "system", "content": prompt}, {"role": "system", "content": summary_message}], maxlen=10)
    return summarized_deque

def chat(message: str, user_id: int, db: Session, messages: deque, pinecone_index) -> tuple[Any, deque]:
    # RAG를 위한 검색 - user_id를 포함하여 검색
    related_texts = search_documents(pinecone_index, message, user_id)
    combined_context = " ".join(related_texts)

    if not messages:  # deque가 비어있는 경우 초기 메시지 추가
        prompt = chat_prompt_info(user_id, db, combined_context)  # combined_context 전달
        messages.append({"role": "system", "content": prompt})

    messages.append({"role": "user", "content": message})

    # 토큰 수 계산
    total_tokens = sum(len(m["content"]) for m in messages)
    print(f"Current total tokens: {total_tokens}")

    # 최대 토큰 수 제한을 초과할 경우 요약
    if total_tokens > 1500:  # 1500은 예시로, 실제 모델 토큰 제한을 고려하여 설정
        prompt = chat_prompt_info(user_id, db, combined_context)  # combined_context 전달
        messages = summarize_messages(messages, prompt)
        total_tokens = sum(len(m["content"]) for m in messages)  # 요약 후 토큰 수 다시 계산
        print(f"요약된 내용: {messages}")
        print(f"Messages summarized. New total tokens: {total_tokens}")

    # 실제 GPT-3.5 API 호출 전, 메시지 출력
    print("Sending the following messages to GPT-3.5 API:")
    for m in messages:
        print(f"{m['role']}: {m['content']}")

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=list(messages),  # deque를 list로 변환하여 전달
        max_tokens=500,
        temperature=0.9,
    )

    response_text = response.choices[0]['message']['content']  # 올바른 응답 데이터 접근
    messages.append({"role": "assistant", "content": response_text})

    return response_text, messages


def summary_prompt(user_id: int, db: Session) -> str:
    profile: ProfileRead = ProfileService.read_profile(user=user_id, db=db)
    prompt = (
        f"Please provide a brief summary."
        f"The user's name is {profile.name}님. "
        f"Please provide the summary in Korean using a natural and friendly honorific in the form of '~했습니다'. "
        f"Ensure the summary is written in the past tense. "
        f"Exclude any unimportant greetings or remarks and focus on summarizing the events."
    )
    return prompt

def summary(message: str, user_id: int, db: Session) -> str:
    content = summary_prompt(user_id, db)
    combined_prompt = f"{message}\n{content}"

    response = openai.Completion.create(
        model="gpt-3.5-turbo-instruct",
        prompt=combined_prompt,
        max_tokens=700,
        temperature=0.5
    )
    return response.choices[0].text.strip()

# Hugging Face 모델을 사용하여 텍스트를 벡터화
def vectorize_message(text: str) -> np.ndarray:
    model_name = "BM-K/KoSimCSE-roberta-multitask"  # Pinecone에 사용되는 모델로 변경
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModel.from_pretrained(model_name)

    inputs = tokenizer(text, padding=True, truncation=True, return_tensors="pt", max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
        embeddings = outputs.last_hidden_state.mean(dim=1).cpu().numpy().astype(np.float32)
    return embeddings.squeeze()

def schedule_prompt(message: str, user_id: int, db: Session) -> str:
    # profile: ProfileRead = ProfileService.read_profile(user=user_id, db=db)
    prompt = (
        # f"The user's name is {profile.name}. Please generate a reminder message in Korean "
         f"The user input the following schedule: '{message}'.\n"
        f"Generate a reminder message in Korean.\n"
        f"Modify the schedule input to a natural phrase if necessary.\n"
        f"Use the format: '지금 [변환된 내용] 시간이야.'\n"
        f"Example inputs and outputs:\n"
        f"- Input: '잠자기', Output: '지금 잘 시간이야.'\n"
        f"- Input: '밥 먹기', Output: '지금 밥 먹을 시간이야.'\n"
        f"- Input: '학원 가기', Output: '지금 학원 갈 시간이야.'\n"
        f"Please make sure the response is concise and uses the appropriate verb form based on the input."
    )
    return prompt

def schedule(message: str, user_id: int, db: Session) -> str:
    content = schedule_prompt(message, user_id, db)

    response = openai.Completion.create(
        model="gpt-3.5-turbo-instruct",
        prompt=content,
        max_tokens=500,
        temperature=0.5
    )
    return response.choices[0].text.strip()
