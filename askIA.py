from db import buscar_respuesta_similar
from flask import  session
import requests  # Para hacer peticiones HTTP
import json  # Para manejar datos en formato JSON
from db import buscar_respuesta_similar, obtener_few_shot_por_tema



# URL local donde Ollama está sirviendo el modelo
OLLAMA_URL = "http://localhost:11434/api/chat"

# Nombre del modelo que quieres usar en Ollama (debe estar cargado)
MODEL_NAME = "mistral:instruct"

def ask_model(user_question: str, documento: str, nombre: str):

    
    if not user_question :
        return "Entrada vacía. Por favor, proporciona una pregunta.", 400

    # Bloquea preguntas sobre FLEX DRIVE
    if "flex drive" in user_question.lower():
        return "Lo siento, no puedo ayudar con preguntas sobre FLEX DRIVE.", 400

    # Primero busca en la base de datos
    resultado = buscar_respuesta_similar(user_question)
    if resultado is not None:
        pregunta_similar, respuesta = resultado
        return respuesta, 200

    historial = []
    if not historial:
        historial.append({
            "role": "system",
            "content": (
        f'''Eres un asistente experto en información de usuarios. 
        El usuario se llama {nombre} y su número de documento es {documento}.
        Responde únicamente preguntas relacionadas con este usuario. 
        Sé directo y responde solo con la información solicitada, sin agregar texto adicional.'''
    )
        })
 
    historial.append({
        "role": "user",
        "content": user_question
    })

    payload = {
        "model": MODEL_NAME,
        "messages": historial
    }
    try:
        response = requests.post(OLLAMA_URL, json=payload, stream=True)
        response.raise_for_status()

        lines = response.text.strip().split('\n')
        respuesta = ""

        for line in lines:
            try:
                data = json.loads(line)
                # Solo suma si existe 'message' y 'content'
                if isinstance(data, dict) and 'message' in data and 'content' in data['message']:
                    respuesta += data['message']['content']
                elif 'error' in data:
                    print('Error de Ollama:', data['error'])
            except Exception as e:
                print('Línea mal formada: ', line, "- Error: ", e)
        historial.append({
            "role": "assistant",
            "content": respuesta
        })

        session['historial'] = historial
        return respuesta, 200

    except Exception as e:
        print("ERROR EN STREAM:", str(e))
        return f"Error al procesar la pregunta. Por favor, inténtalo de nuevo más tarde. {e}", 500
    