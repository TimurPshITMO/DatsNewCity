import requests
import json
import os
from dotenv import load_dotenv, dotenv_values
load_dotenv()

# Ваш токен
token = os.getenv('TOKEN')

# URL сервера
server_url = 'https://google.com'

# API-метод
api = ''
url = f"{server_url}{api}"

# Данные для отправки
baseReq = {
  "snakes": [
    {
      "id": "351aadb036bdd706dc4aea62482059291d4e8a52",
      "direction": [
        1,
        0,
        0
      ]
    }
  ]
}

# Заголовки запроса
headers = {
        'X-Auth-Token': token,
        'Content-Type': 'application/json'
    }

def sendCommand(data = baseReq):
    # Выполнение POST-запроса
    response = requests.post(url, headers=headers, json=data)
    with open('responses/response.txt', 'w') as f:
        f.write(response.text)
    return response.json()

print(sendCommand())