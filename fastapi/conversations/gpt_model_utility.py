import openai

def chat(message: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a friendly and casual assistant."},
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
    # 'data' 키 아래 리스트의 첫 번째 항목에서 'embedding' 키에 접근
    return response['data'][0]['embedding']