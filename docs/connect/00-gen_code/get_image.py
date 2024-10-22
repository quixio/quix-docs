import requests
from bs4 import BeautifulSoup
import os
from urllib.parse import urljoin

def get_image_urls(query, num_images=10):
    # Construct the Google search URL
    search_url = f"https://www.google.com/search?q={query}+logo&tbm=isch"

    # Send a request to the search URL
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
    }
    response = requests.get(search_url, headers=headers)

    # Parse the HTML content
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find image elements
    img_tags = soup.find_all("img")

    # Extract image URLs
    img_urls = []
    for img_tag in img_tags:
        img_url = img_tag.get("src")
        if img_url and img_url.startswith(('http://', 'https://')):
            img_urls.append(img_url)
        if len(img_urls) >= num_images:
            break

    return img_urls

def download_images(image_urls, save_dir, tech_name):
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)

    for i, image_url in enumerate(image_urls):
        response = requests.get(image_url)
        save_path = os.path.join(save_dir, f"{tech_name.replace(' ', '_')}_logo_{i+1}.jpg")
        with open(save_path, 'wb') as file:
            file.write(response.content)
        print(f"Image {i+1} saved to {save_path}")

# Example usage
tech_name = "Apache Kafka"
image_urls = get_image_urls(tech_name, num_images=10)

if image_urls:
    save_directory = "images/"+tech_name
    download_images(image_urls, save_directory, tech_name)
else:
    print("No images found.")