import sqlite3
conn = sqlite3.connect('prompts.db')
cursos = conn.cursor()
cursos.execute('''
CREATE TABLE IF NOT EXISTS prompts_responses (
    id Integer PRIMARY KEY AUTOINCREMENT,
    tema TEXT NOT NULL,
    pregunta TEXT NOT NULL UNIQUE,
    respuesta TEXT NOT NULL
)
''')

conn.commit()
conn.close()
print("Base de datos inicializada y tabla creada.")