from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time

def cerrar_popup(driver):
    try:
        driver.execute_script("""
            if (typeof Swal !== 'undefined') {
                Swal.close();
            }
            var closeButtons = document.querySelectorAll('.swal2-close, .modal .close, [aria-label="Close"]');
            closeButtons.forEach(function(button) {
                button.click();
            });
            var overlays = document.querySelectorAll('.swal2-container, .modal, .modal-backdrop');
            overlays.forEach(function(overlay) {
                overlay.parentNode.removeChild(overlay);
            });
            document.body.style.overflow = 'auto';
        """)
        return True
    except:
        return False

def obtener_multas_por_cedula(cedula):
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    options.add_argument('--no-sandbox')
    options.add_argument('--window-size=1920,1080')

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    driver.get("https://www.fcm.org.co/simit/#/home-public")

    cerrar_popup(driver)

    input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "txtBusqueda"))
    )
    input.send_keys(cedula)

    boton = driver.find_element(By.ID, "consultar")
    boton.click()
    time.sleep(6)

    multas = []

    try:
        try:
            select_element = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.ID, "pageLengthSelect"))
            )
            select = Select(select_element)
            values_disponibles = [opt.get_attribute("value") for opt in select.options]
            if "15" in values_disponibles:
                select.select_by_value("15")
                time.sleep(2)
        except:
            pass

        WebDriverWait(driver, 15).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "tr.page-row"))
        )

        filas = driver.find_elements(By.CSS_SELECTOR, "tr.page-row")
        for fila in filas[:10]:
            try:
                multa = {
                    "numero_comparendo": fila.find_element(By.CSS_SELECTOR, "td[data-label='Tipo'] a").text.strip(),
                    "fecha_comparendo": fila.find_element(By.CSS_SELECTOR, "td[data-label='Tipo'] span.fs-13").text.strip().split(":")[-1].strip(),
                    "estado": fila.find_element(By.CSS_SELECTOR, "td[data-label='Estado']").text.strip().split("\n")[0],
                    "entidad": fila.find_element(By.CSS_SELECTOR, "td[data-label='Secretaría']").text.strip(),
                    "codigo_infraccion": fila.find_element(By.CSS_SELECTOR, "td[data-label='Infracción'] label span").text.strip(),
                    "descripcion_infraccion": fila.find_element(By.CSS_SELECTOR, "td[data-label='Infracción'] span.popover-infraccion").get_attribute("data-content").strip(),
                    "id_documento": cedula
                }

                multas.append(multa)
            except:
                continue

    except:
        pass

    driver.quit()
    return multas
