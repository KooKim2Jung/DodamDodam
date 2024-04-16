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
