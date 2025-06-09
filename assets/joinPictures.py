import os
from PIL import Image

#pip install pillow

def unir_imagenes(directorio=None, salida="joinPicture.jpg"):
    """
    Une imágenes shot(numero).png verticalmente sin espacios.
    - Todas deben tener el mismo ancho
    - Se ordenan por número aunque empiecen en cualquier valor
    - No hay espaciado entre imágenes
    """
    # Establecer directorio
    directorio = directorio or os.getcwd()

    # Obtener y ordenar imágenes shot(numero).png
    imagenes = []
    for archivo in os.listdir(directorio):
        if archivo.lower().startswith('shot') and archivo.lower().endswith('.png'):
            try:
                # Extraer número del nombre (shot123.png → 123)
                num = int(''.join(c for c in archivo if c.isdigit()))
                imagenes.append((num, archivo))
            except ValueError:
                continue

    if not imagenes:
        print(f"No se encontraron imágenes shot(numero).png en {directorio}")
        return

    # Ordenar por número
    imagenes.sort()

    print(f"Uniendo {len(imagenes)} imágenes en orden:")
    for i, (num, archivo) in enumerate(imagenes, 1):
        print(f"{i}. {archivo}")

    # Cargar imágenes y verificar anchos
    ancho_comun = None
    imagenes_cargadas = []
    for num, archivo in imagenes:
        try:
            img = Image.open(os.path.join(directorio, archivo))
            if ancho_comun is None:
                ancho_comun = img.width
            elif img.width != ancho_comun:
                print(f"Advertencia: {archivo} tiene ancho {img.width}, debería ser {ancho_comun}")
            imagenes_cargadas.append(img)
        except Exception as e:
            print(f"Error al cargar {archivo}: {e}")

    if not imagenes_cargadas:
        print("No se pudieron cargar imágenes válidas.")
        return

    # Calcular dimensiones finales
    altura_total = sum(img.height for img in imagenes_cargadas)

    # Crear imagen resultante
    resultado = Image.new("RGB", (ancho_comun, altura_total))

    # Pegar imágenes una debajo de otra
    y = 0
    for img in imagenes_cargadas:
        resultado.paste(img, (0, y))
        y += img.height

    # Guardar
    resultado.save(salida)
    print(f"\nImagen unida guardada como: {salida}")
    print(f"Dimensiones: {ancho_comun}px ancho × {altura_total}px alto")

if __name__ == "__main__":
    unir_imagenes()  # Usa directorio actual y guarda como imagen_unida.jpg
