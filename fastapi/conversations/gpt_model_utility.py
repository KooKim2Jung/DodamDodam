# gpt_model_utility.py
from collections import deque

import openai
from sqlalchemy.orm import Session
from users.services import ProfileService
from users.schemas import ProfileRead
from typing import List, Dict

def chat_prompt_info(user_id: int, db: Session) -> str:
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
    )
    return prompt

def chat(message: str, user_id: int, db: Session, messages: deque) -> str:
    if not messages:  # deque가 비어있는 경우 초기 메시지 추가
        prompt = chat_prompt_info(user_id, db)
        messages.append({"role": "system", "content": prompt})

    messages.append({"role": "user", "content": message})

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=list(messages),  # deque를 list로 변환하여 전달
        max_tokens=500,
        temperature=0.9,
    )

    response_text = response.choices[0].message["content"]
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

def vectorize_message(message: str) -> list:
    response = openai.Embedding.create(
        input=message,
        model="text-embedding-3-small"
    )
    return response['data'][0]['embedding']
