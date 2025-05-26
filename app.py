from flask import Flask, request, jsonify
from scraper import obtener_multas_por_cedula

app = Flask(__name__)

@app.route('/api/multas', methods=['POST'])
def consultar_multas():
    data = request.json
    cedula = data.get('cedula')

    if not cedula:
        return jsonify({"error": "Falta el parámetro 'cedula'"}), 400

    multas = obtener_multas_por_cedula(cedula)
    return jsonify({"multas": multas}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
