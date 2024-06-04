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

def summary(message: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Please provide a summary of the key points discussed, "
                                           "using a natural and friendly honorific in Korean. "
                                           "Just convey the content of the summary, without any introductory remarks or greetings. "
                                           "This conversation is between a protected person and the AI, Dodam. "
                                           "The summary will be reviewed by a guardian."
                                           "When referring to the AI model, please use the name 도담이."},
            {"role": "user", "content": message},
        ],
        max_tokens=500,
        temperature=0.7,
    )
    return response.choices[0].message["content"]

def vectorize_message(message: str) -> list:
    response = openai.Embedding.create(
        input=message,
        model="text-embedding-3-small"
    )
    return response['data'][0]['embedding']
