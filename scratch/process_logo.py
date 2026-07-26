import os
from PIL import Image, ImageDraw

def make_circle_transparent(img_path):
    if not os.path.exists(img_path):
        print(f"Error: {img_path} not found")
        return
    
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    
    # Create mask
    mask = Image.new("L", (width, height), 0)
    draw = ImageDraw.Draw(mask)
    
    # Draw white circle in the middle (taking up almost full size)
    # The logo has a small padding or we can just crop the circle precisely
    # Let's crop a circle with 2% margin to avoid cutting details, or full diameter.
    margin = int(width * 0.01)
    draw.ellipse((margin, margin, width - margin, height - margin), fill=255)
    
    # Apply mask
    result = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    result.paste(img, (0, 0), mask=mask)
    
    # Save back
    result.save(img_path, "PNG")
    print(f"Successfully processed {img_path} to be circular transparent.")

if __name__ == "__main__":
    make_circle_transparent("public/images/logo.png")
