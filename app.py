# Importa las librerías necesarias
from flask import Flask,  Response, jsonify, session, request  # Flask para servidor web
from flask_session import Session
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import Select
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from askIA import ask_model
import undetected_chromedriver as uc
import time

# Crea una instancia de la aplicación Flask
app = Flask(__name__)

# Genera chat por sesiones y tenga un historial
app.secret_key="1234abcd"
app.config['SESSION_TYPE']='filesystem'
Session(app)


DOCUMENT = ["1051064407", "1049625235"]
OPCIONES_SELECT = {
    "CC": "1",
    "PEP": "0",
    "Nit": "2",
    "Passport": "5",
    "PPT": "10"
}


# Ruta principal "/" para cargar la página HTML
@app.route("/")
def home():
    return Response('Hello world')  # Renderiza el archivo index.html desde /templates

 
# Ruta "/ask" para recibir las preguntas desde el frontend
@app.route("/antecedentes", methods=["POST"])
def antecedentes():
    
    try:
        documento = request.json.get("documento")
        if not documento:
            return Response("No se recibió ningún documento.", status=400)
        print("Documento recibido:", documento)
        
        nombres = request.json.get("nombres")
        if not nombres:
            return Response("No se recibieron nombres.", status=400)
        print("Nombres recibidos:", nombres)
        
        tipoDocumento = request.json.get("tipoDocumento")
        if not tipoDocumento:
            return Response("No se recibió tipo de documento.", status=400) 
        print("Tipo de documento recibido:", tipoDocumento)
    
        driver = uc.Chrome()
        url  = "https://www.procuraduria.gov.co/Pages/Consulta-de-Antecedentes.aspx"
  
        option = webdriver.ChromeOptions()
        # option.add_argument("--headless")
        option.add_argument("--window-size=1920x1080")
   
        driver.get(url) 

        wait = WebDriverWait(driver, 20)
        # Espera y cambia al iframe
        iframe = wait.until(EC.presence_of_element_located((By.TAG_NAME, "iframe")))
        driver.switch_to.frame(iframe)

        # Ahora sí busca el select y el input
        select_element = wait.until(EC.presence_of_element_located((By.ID, "ddlTipoID")))
        select = Select(select_element)
        select.select_by_value(OPCIONES_SELECT[tipoDocumento])

        input_element = wait.until(EC.presence_of_element_located((By.ID, "txtNumID")))
        input_element.send_keys(documento)

        pregunta_span = wait.until(EC.presence_of_element_located((By.ID, "lblPregunta")))
        texto_pregunta = pregunta_span.text.strip()
    
        respuesta_ia, error = ask_model(texto_pregunta, documento, nombres)
        
        if error != 200:
            return Response(f"Error al procesar la pregunta: {respuesta_ia}", status=error)     
    
        respuesta_input = wait.until(EC.presence_of_element_located((By.ID, "txtRespuestaPregunta")))
        respuesta_input.clear()
        respuesta_input.send_keys(respuesta_ia)

        time.sleep(3)


        button = driver.find_element(By.ID, "btnConsultar")
        button.click()

     
        time.sleep(3)
    

        # Espera a que aparezca el div con los resultados
        resultado_div = wait.until(EC.presence_of_element_located((By.ID, "divSec")))

        # Extrae los spans con los nombres
        spans = resultado_div.find_elements(By.CSS_SELECTOR, ".datosConsultado span")
        nombres = [span.text.strip() for span in spans if span.text.strip() != ""]
        print("Nombres extraídos:", nombres)

        # Extrae el mensaje de antecedentes
        mensaje = resultado_div.find_element(By.TAG_NAME, "h2").text.strip()
        print("Mensaje de antecedentes:", mensaje)
        mensaje_antecedentes = resultado_div.find_elements(By.TAG_NAME, "h2")[1].text.strip()
        print("Mensaje de antecedentes:", mensaje_antecedentes)
        
        
        # Almacena todo en un arreglo
        datos_dict = {
            "nombres": nombres,
            "mensaje": mensaje,
            "mensaje_antecedentes": mensaje_antecedentes
        }
        return datos_dict
    except Exception as e:
        print("Error:", e)
        return Response("Error al procesar la solicitud.", status=500)
    finally:
        driver.quit()
    

@app.route("/reset", methods=["POST"])
def reset():
    # Reinicia el historial de la conversación
    session.pop('historial', None)
    return jsonify({"status": "ok", "message":"historial borrado"}), 200

# Indica que si se ejecuta este archivo directamente, levante el servidor en localhost:5000
if __name__ == "__main__":
    app.run(port=5000, debug=True)