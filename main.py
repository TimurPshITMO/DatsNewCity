import json

def sendCommand(data):
    if data == 'words':
        data = None
        with open('json.json', 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)
        return data
    print('data should be "words"')
    return None

resp = sendCommand('words')
words = resp['words']
words.sort(key = lambda s: len(s), reverse = True)
print(words)
