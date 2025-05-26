import sqlite3
import numpy as np 
from sentence_transformers import SentenceTransformer, util
import re

model = SentenceTransformer('all-MiniLM-L6-v2')
def connect_db():
    return sqlite3.connect('prompts.db')
    
def cargar_preguntas_respuestas():
    conn = connect_db()
    cursor = conn.cursor()
    
    # Carga todas las preguntas y respuestas de la base de datos
    cursor.execute('SELECT id, pregunta, respuesta FROM prompts_responses')
    data = cursor.fetchall()
    
    conn.close()
    
   
    
    return data
def construir_embeddings():
    preguntas_y_respuestas = cargar_preguntas_respuestas()
    preguntas = [p[1]for p in preguntas_y_respuestas]
    embeddings = model.encode(preguntas, convert_to_tensor=True)
    return preguntas_y_respuestas, embeddings

def buscar_respuesta_similar(pregunta_usuario):
    preguntas_y_respuestas, embeddings = construir_embeddings()
    embeddings_usuario = model.encode(pregunta_usuario, convert_to_tensor=True)

    scores = util.pytorch_cos_sim(embeddings_usuario, embeddings)[0]
    max_score = scores.max().item()
    if max_score >= 0.8:  # Ahora sí: solo responde si es muy similar
        best_idx = scores.argmax().item()
        _, pregunta_similar, respuesta = preguntas_y_respuestas[best_idx]
        return (pregunta_similar, respuesta)
    else:
        return None
def obtener_few_shot_por_tema(tema):
    conn = connect_db()
    cursor = conn.cursor()

    # Obtiene todos los ejemplos de la base de datos
    cursor.execute('SELECT pregunta, respuesta FROM prompts_responses WHERE tema = ?', (tema,))
    ejemplos = cursor.fetchall()

    conn.close()

    return "\n".join([f"Usuario: {p}\nExperto: {r}" for p, r in ejemplos])
    
    # Busca la pregunta más similar en la base de datos
