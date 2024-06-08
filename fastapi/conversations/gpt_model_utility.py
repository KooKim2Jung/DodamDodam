# gpt_model_utility.py
import openai
from sqlalchemy.orm import Session
from users.services import ProfileService
from users.schemas import ProfileRead

def chat_prompt_info(user_id: int, db: Session) -> str:
    profile: ProfileRead = ProfileService.read_profile(user=user_id, db=db)
    prompt = (
        f"Your name is 도담, and you are a friendly and casual assistant. "
        f"The user's name is {profile.name}, they are {profile.age} years old, "
        f"their gender is {profile.gender}, and their remark is '{profile.remark}'. "
        "Please respond informally in Korean. Do not use emoticons. "
        "Include the user's profile information in your responses only if the conversation naturally leads to it."
    )
    return prompt

def chat(message: str, user_id: int, db: Session) -> str:
    prompt = chat_prompt_info(user_id, db)
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": message},
        ],
        max_tokens=500,
        temperature=0.9,
    )
    return response.choices[0].message["content"]

def summary_prompt(user_id: int, db: Session) -> str:
    profile: ProfileRead = ProfileService.read_profile(user=user_id, db=db)
    prompt = (
        f"Please summarize the conversation between {profile.name} and the AI assistant, Dodam. "
        f"When summarizing, focus more on the content provided by {profile.name}. "
        f"This conversation is between a protected person and the AI assistant, Dodam. "
        f"The summary will be reviewed by a guardian. "
        f"The user's name is {profile.name} and the AI's name is '도담이'. "
        f"Please provide the summary in Korean using a natural and friendly honorific in the form of '~했습니다'. "
        f"Ensure the summary is written in the past tense. "
        f"Focus only on the important events and details, excluding any trivial or redundant information. "
        f"Just return the content of the summary without any additional remarks or greetings."
    )
    return prompt

def summary(message: str, user_id: int, db: Session) -> str:
    content = summary_prompt(user_id, db)
    combined_prompt = f"{content}\n{message}"

    response = openai.Completion.create(
        model="gpt-3.5-turbo-instruct",
        prompt=combined_prompt,
        max_tokens=500,
        temperature=0.5
    )
    return response.choices[0].text.strip()

def vectorize_message(message: str) -> list:
    response = openai.Embedding.create(
        input=message,
        model="text-embedding-3-small"
    )
    return response['data'][0]['embedding']
