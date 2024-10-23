from openai import OpenAI
import os
from dotenv import load_dotenv
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
def generate_text(prompt):
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



# Path to your CSV file
csv_file_path = 'tech-list.csv'

# Open the CSV file and read its contents as a string
with open(csv_file_path, 'r') as file:
    content = file.read()  # Read the entire file content

# Split the content by commas to create a list
tech_list = content.split(',')


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
        save_path = os.path.join(save_dir, f"logo_{i+1}.jpg")
        with open(save_path, 'wb') as file:
            file.write(response.content)
        print(f"Image {i+1} saved to {save_path}")

# Strip whitespace and print the loaded technologies
print("Loaded technologies:")
for tech in tech_list:
    print(tech.strip())  # Strip any leading/trailing whitespace

    tech_name = tech.strip()
    print("Processing " + tech_name)

    # Generate Mermaid diagram
    mermaid_prompt = f"Create a simple Mermaid diagram for integrating Kafka with {tech_name}. Just produce the diagram, I dont want any fluff or words to go with it."
    mermaid_diagram = generate_mermaid_diagram(mermaid_prompt)

    # Generate description about the tech
    description_prompt = f"Write a paragraph describing the technology called {tech_name}."
    tech_description = generate_text(description_prompt)

    # Generate paragraph about why Quix is a good fit
    quix_prompt = f"Explain why Quix is a good fit for integrating with the technology called {tech_name}. Use this for reference -- Quix Cloud is a comprehensive platform designed for developing, deploying, and managing real-time data pipelines. It offers a range of features to streamline development, enhance collaboration, and provide real-time monitoring and scaling capabilities. Key components include:Streamlined Development and Deployment: Integrated online code editors and CI/CD tools simplify the creation and deployment of data pipelines. YAML synchronization allows for defining pipelines and environment variables as code.Enhanced Collaboration: The platform supports efficient collaboration with organization and permission management, increasing project visibility and control.3. Real-Time Monitoring: Quix Cloud provides tools for real-time logs, metrics, and data exploration, allowing users to monitor pipeline performance and critical metrics.4. Flexible Scaling and Management: Users can easily scale resources, manage CPU and memory, and handle multiple environments linked to Git branches.Security and Compliance: The platform ensures secure management of secrets and compliance with dedicated infrastructure options and SLAs.Development Tools: Quix Cloud includes online code editors, code templates, and connectors for various data sources and sinks, supporting DevContainers for enhanced workflows.7. Data Exploration and Visualization: Users can query and explore data using waveform and table views, and visualize messages and metrics in real-time.Robust CI/CD Processes: Integration with Git providers like GitHub and Bitbucket facilitates seamless CI/CD processes, with synchronization via GitHub actions and CLI commands.9. Kafka Integration: Quix Cloud supports both Quix-hosted and third-party Kafka solutions, including Confluent Cloud and Redpanda.10. Dedicated/BYOC Options: The platform offers options for running pipelines on dedicated infrastructure, with historical logs and metrics visualization through Grafana dashboards. and use this for Quix Streams: Quix Streams is a cloud-native library for processing data in Kafka using Python. It combines Kafka's scalability with a user-friendly Python interface. Key benefits include:No JVM Required: Operates without a server-side engine or orchestrator.Python Ecosystem Integration: Works seamlessly with libraries like Pandas, scikit-learn, TensorFlow, and PyTorch.Serialization and State Management: Supports various serialization formats and stateful operations using RocksDB.Time Window Aggregations: Facilitates aggregations over tumbling and hopping time windows.Resilient Scaling: Designed to run and scale via container orchestration, such as Kubernetes.Local and Jupyter Notebook Support: Enables convenient development and debugging."
    quix_description = generate_text(quix_prompt)

    # Read the base template
    with open('index.md', 'r') as file:
        template = file.read()

    # Replace placeholders with generated content
    content = template.replace("[tech-name]", tech_name)
    content = content.replace("[mermaid-diagram]", mermaid_diagram)
    content = content.replace("[blurb-about-tech-name]", tech_description)
    content = content.replace("[blurb-about-why]", quix_description)

    # Write the new content to a Markdown file
    lower_case_tech_name = tech_name.lower().replace(" ", "_").replace(".", "_").replace("()", "_").replace(")", "_")
    folder_name = f'../{lower_case_tech_name}'
    output_path = f'docs/connect/{folder_name}/kafka-to-{lower_case_tech_name}.md'

    os.makedirs(folder_name, exist_ok=True)

    with open(output_path, 'w') as output_file:
        output_file.write(content)

    image_urls = get_image_urls(tech_name, num_images=1)

    if image_urls:
        save_directory = f"docs/connect/{folder_name}/images/"
        download_images(image_urls, save_directory, tech_name)
    else:
        print("No images found.")
        
    print(f"Generated documentation for {tech_name}")