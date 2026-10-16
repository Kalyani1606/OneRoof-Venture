from PIL import Image

def remove_light_grey_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    # The background looks like a solid light grey.
    # Let's check for pixels that have r, g, b > 180 and the difference between r, g, and b is small (to ensure it's grey).
    for item in datas:
        r, g, b, a = item
        # If it's bright and grey-ish
        if r > 180 and g > 180 and b > 180 and max(r, g, b) - min(r, g, b) < 20:
            newData.append((255, 255, 255, 0)) # transparent
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_light_grey_bg(
        "c:/Users/Admin/Desktop/oneroof/OneRoof-Venture/orv/webapp/public/contact-bg-removed.jpg",
        "c:/Users/Admin/Desktop/oneroof/OneRoof-Venture/orv/webapp/public/contact-bg-removed.png"
    )
