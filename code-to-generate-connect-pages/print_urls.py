import os

# Path to the directory containing the files
directory_path = '../docs/connect/'
url_base = "https://quixdocsdev.blob.core.windows.net/pr423/connect/"

# Loop through each file in the directory
for filename in os.listdir(directory_path):
    # Print the file name without the extension
    print(f'{url_base}{filename}/kafka-to-{filename}.html')