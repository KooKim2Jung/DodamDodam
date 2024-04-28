import os

from dotenv import load_dotenv
from fastapi import requests

load_dotenv()

client_id = os.getenv("RTZR_STT_CLIENT_ID")
client_secret = os.getenv("RTZR_STT_CLIENT_SECRET")

print(os.getenv("RTZR_STT_CLIENT_ID"))
print(os.getenv("RTZR_STT_CLIENT_SECRET"))

resp = requests.post(
    'https://openapi.vito.ai/v1/authenticate',
    data={'client_id': 'client_id',
          'client_secret': 'client_secret'}
)
resp.raise_for_status()
print(resp.json())