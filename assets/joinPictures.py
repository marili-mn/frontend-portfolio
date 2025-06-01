
import os
from PIL import Image

def concatenate_images_in_directory(output_path="joinPicture.jpg"):
    """
    Detecta todas las imágenes en el directorio actual, las concatena verticalmente y guarda el resultado.
    
    :param output_path: Ruta del archivo de salida. Por defecto es 'joinPicture.jpg'.
    """
    # Extensiones válidas de imágenes
    valid_extensions = (".png", ".jpg", ".jpeg", ".bmp", ".gif", ".tiff")
    
    # Obtener todas las imágenes del directorio actual
    current_dir = os.getcwd()
    image_files = [file for file in os.listdir(current_dir) if file.lower().endswith(valid_extensions)]
    
    if not image_files:
        print("No se encontraron imágenes en el directorio actual.")
        return
    
    # Cargar las imágenes
    images = [Image.open(image_file) for image_file in image_files]
    
    # Calcular el ancho y la altura total de la imagen concatenada
    total_width = max(image.width for image in images)
    total_height = sum(image.height for image in images)
    
    # Crear una nueva imagen con un fondo blanco
    concatenated_image = Image.new("RGB", (total_width, total_height), "white")
    
    # Pegar cada imagen una debajo de la otra
    y_offset = 0
    for img in images:
        concatenated_image.paste(img, (0, y_offset))
        y_offset += img.height
    
    # Guardar la imagen concatenada
    concatenated_image.save(output_path)
    print(f"Imagen concatenada guardada como: {output_path}")

# Ejemplo de uso
if __name__ == "__main__":
    concatenate_images_in_directory()
