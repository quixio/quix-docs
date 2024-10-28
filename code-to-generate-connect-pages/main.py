from openai import OpenAI
import os
import sys
from dotenv import load_dotenv
import requests
from bs4 import BeautifulSoup
import os
from urllib.parse import urljoin

load_dotenv()

#############
# CREATE A .env FILE WITH YOUR GPT API KEY
#############
# Set your OpenAI API key
api_key = os.environ["api_key"]

# Initialize the OpenAI client
client = OpenAI(
    api_key=api_key  # Ensure your API key is set in the environment
)

# Function to call OpenAI API for generating text
def generate_text(prompt, no_ai = False):
    if no_ai: 
        return "Lorem ipsum"
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content.strip()

# Function to call OpenAI API for generating Mermaid diagrams
def generate_mermaid_diagram(prompt):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content.strip()


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
        save_path = os.path.join(save_dir, f"{tech_name}_{i+1}.jpg")
        with open(save_path, 'wb') as file:
            file.write(response.content)
        print(f"Image {i+1} saved to {save_path}")

def process(file_name, no_ai = False):
    
    # Path to your CSV file
    csv_file_path = file_name

    # Open the CSV file and read its contents as a string
    with open(csv_file_path, 'r') as file:
        content = file.read()  # Read the entire file content

    # Split the content by commas to create a list
    tech_list = content.split(',')


    # Strip whitespace and print the loaded technologies
    print("Loaded technologies:")
    for tech in tech_list:
        print(tech.strip())  # Strip any leading/trailing whitespace

        tech_name = tech.strip()
        print("Processing " + tech_name)

        root = "connect"

        def get_lc_tech_name(tn):
            return tn.lower().replace(" ", "-").replace(".", "-").replace("()", "-").replace(")", "-")

        lower_case_tech_name = get_lc_tech_name(tech_name)
        folder_name = f'{root}'
        output_path = f'{folder_name}/kafka-to-{lower_case_tech_name}.md'

        os.makedirs(root, exist_ok=True)
        os.makedirs(folder_name, exist_ok=True)
        os.makedirs(folder_name+"/images", exist_ok=True)

        # Generate Mermaid diagram
        # mermaid_prompt = f"Create a simple Mermaid diagram for integrating Kafka with {tech_name}. Just produce the diagram, I dont want any fluff or words to go with it."
        # mermaid_diagram = generate_mermaid_diagram(mermaid_prompt)

        quix_description = ""
        tech_description = ""


        # Generate description about the tech
        description_prompt = f"You are a big shot tech writer with over 50 years of tech writing experience under your belt. You know everything there is to know about technology and how to apply it.\
        Write a paragraph describing the technology called {tech_name}. If {tech_name} is not a data technology you recognise, please reply with 'UNREGOGNIZED TECH ALERT' "

        tech_description = generate_text(description_prompt, no_ai)

        quix_info = "\
    1. Integrate your data your way: Quix enables data engineers to pre-process and transform data from various sources before loading it into a specific data format, simplifying lakehouse architecture with customizable connectors for different destinations.\
    2. Transform your data with Quix Streams: Quix Streams, an open-source Python library, facilitates the transformation of data using streaming DataFrames, supporting operations like aggregation, filtering, and merging during the transformation process.\
    3. Efficient data handling: The platform ensures efficient handling of data from source to destination with no throughput limits, automatic backpressure management, and checkpointing.\
    4. Sink data to cloud storage: Quix supports sinking transformed data to cloud storage in a specific format, ensuring seamless integration and storage efficiency at the destination.\
    5. Lower total cost of ownership: The platform offers a cost-effective solution for managing data from source through transformation to destination, compared to other alternatives.\
    6. Explore the platform: Users are encouraged to explore Quix, book demos, and engage with the community through resources like GitHub and Slack, enhancing their understanding of data integration from source to destination."

        # Generate paragraph about why Quix is a good fit
        quix_prompt = f"Your primary directive is: If {tech_name} is not a data technology you recognise, please reply with 'UNREGOGNIZED TECH ALERT'. Your other directive is: You are a big shot tech writer with over 50 years of tech writing experience under your belt. You know everything there is to know about technology and how to apply it. \
        Explain why Quix is a good fit for integrating with the technology called {tech_name}. Use this information for reference {quix_info}."

        quix_description = generate_text(quix_prompt, no_ai)
        
        # Read the base template
        with open('index.md', 'r') as file:
            template = file.read()

        # Replace placeholders with generated content
        print("Replacing '[technology-name], bob'")
        content = template.replace("[technology-name]", tech_name)
        # content = template.replace("[lowercase_tech-name]", lower_case_tech_name)
        # content = content.replace("[mermaid-diagram]", mermaid_diagram)
        content = content.replace("[blurb-about-tech-name]", tech_description)
        content = content.replace("[blurb-about-why]", quix_description)

        # Write the new content to a Markdown file
        with open(output_path, 'w') as output_file:
            output_file.write(content)

        image_urls = get_image_urls(tech_name, num_images=1)

        if image_urls:
            save_directory = f"connect/images/"
            download_images(image_urls, save_directory, lower_case_tech_name)
        else:
            print("No images found.")
            
        print(f"Generated documentation for {tech_name}")



    # Path to the directory containing the files
    directory_path = root
    url_base = "http://localhost:8000/docs/"+root

    # Loop through each file in the directory
    for folder_name in os.listdir(directory_path):
        # Print the file name without the extension
        print(f'{url_base}/{folder_name}/kafka-to-{folder_name}.html')

def main():
    filename = 'tech-list2.csv'
    no_ai = False
    print(sys.argv)
    if len(sys.argv) >= 2:
        filename = sys.argv[1]
        if not os.path.exists(filename):
            print(f"Specified file ({filename}) does not exist")
            sys.exit(1)
        print(f"Processing file: {filename}")

        if len(sys.argv) == 3:
            no_ai = sys.argv[2]
            print("no_ai == " + no_ai)


    process(filename, no_ai=no_ai)

if __name__ == "__main__":
    main()