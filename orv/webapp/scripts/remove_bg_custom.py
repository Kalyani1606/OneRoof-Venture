from rembg import remove
from PIL import Image

input_path = "c:/Users/Admin/Desktop/oneroof/OneRoof-Venture/orv/images.jpg"
output_path = "c:/Users/Admin/Desktop/oneroof/OneRoof-Venture/orv/webapp/public/contact-bg-removed.png"

input_image = Image.open(input_path)
output_image = remove(input_image)
output_image.save(output_path)
print("Saved", output_path)
