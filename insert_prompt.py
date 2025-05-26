import sqlite3

ejemplos = [
  ("geografia", "¿ Cual es la Capital del Vallle del Cauca?", "Cali"),
("matematicas", "¿ Cuánto es 2 x 3 ?", "6"),
("geografia", "¿ Cual es la Capital de Antioquia (sin tilde)?", "Medellin"),
("matematicas", "¿ Cuánto es 3 - 2 ?", "1"),
("matematicas", "¿ Cuánto es 9 - 2 ?", "7"),
("matematicas", "¿ Cuánto es 6 + 2 ?", "8"),
("geografia", "¿ Cual es la Capital del Atlantico?", "Barranquilla"),
("geografia", "¿ Cual es la Capital de Colombia (sin tilde)?", "Bogota"),
("matematicas", "¿ Cuánto es 3 x 3 ?", "9"),
("matematicas", "¿ Cuánto es 4 + 3 ?", "7"),
("matematicas", "¿ Cuánto es 5 + 3 ?", "8")
]

conn = sqlite3.connect('prompts.db')
cursor = conn.cursor()

for tema, pregunta, respuesta in ejemplos:
    try:
        cursor.execute('''
        INSERT INTO prompts_responses (tema, pregunta, respuesta)
        VALUES (?, ?, ?)
        ''', (tema, pregunta, respuesta))
    except sqlite3.IntegrityError:
        print(f"ya existe: {pregunta}")
conn.commit()
conn.close()
    
