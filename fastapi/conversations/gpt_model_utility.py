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
        "Please respond informally in Korean."
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

def vectorize_message(message: str) -> list:
    response = openai.Embedding.create(
        input=message,
        model="text-embedding-3-small"
    )
    return response['data'][0]['embedding']
