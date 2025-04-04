import requests
import json
import os
from dotenv import load_dotenv, dotenv_values
load_dotenv()

# Ваш токен
token = os.getenv('TOKEN')

# URL сервера
server_url = 'https://games-test.datsteam.dev'

# Заголовки запроса
headers = {
        'X-Auth-Token': token,
        'Content-Type': 'application/json'
    }

def sendCommand(data):
    if isinstance(data, str):
        api = f'/api/{data}'
        url = f"{server_url}{api}"
        response = requests.get(url, headers=headers)
        return response.json()
    # Выполнение POST-запроса
    response = requests.post(url, headers=headers, json=data)
    return response.json()

print(sendCommand('rounds'))