from rembg import remove
from PIL import Image
import numpy as np

print("Processing house.png with rembg...")
try:
    input_house = Image.open("public/house.png")
    output_house = remove(input_house)
    output_house.save("public/house_nobg.png")
    print("Saved public/house_nobg.png")
except Exception as e:
    print(f"Error processing house.png: {e}")

print("Processing clouds.png...")
try:
    input_clouds = Image.open("public/clouds.png").convert("RGBA")
    data = np.array(input_clouds)
    
    # The clouds image has a black background. We want to convert the black (0,0,0) to transparent.
    # A good way is to use the luminance (brightness) as the alpha channel, and set the color to white.
    # L = 0.299*R + 0.587*G + 0.114*B
    r = data[:, :, 0]
    g = data[:, :, 1]
    b = data[:, :, 2]
    luminance = (0.299 * r + 0.587 * g + 0.114 * b)
    
    # Boost the alpha dramatically so the clouds are solid white and highly visible
    alpha = np.clip(luminance * 3.0, 0, 255)
    
    # Set RGB to white (255, 255, 255) and Alpha to the boosted luminance
    data[:, :, 0] = 255
    data[:, :, 1] = 255
    data[:, :, 2] = 255
    data[:, :, 3] = alpha.astype(np.uint8)
    
    output_clouds = Image.fromarray(data, "RGBA")
    output_clouds.save("public/clouds_nobg.png")
    print("Saved public/clouds_nobg.png")
except Exception as e:
    print(f"Error processing clouds.png: {e}")
