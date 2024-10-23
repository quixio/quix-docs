import os

# Path to the directory containing the files
directory_path = '../'
url_base = "https://quixdocsdev.blob.core.windows.net/tag-test-vendor-pages/connect/"

# Loop through each file in the directory
for filename in os.listdir(directory_path):
    # Check if it's a file (not a directory)
    if os.path.isfile(os.path.join(directory_path, filename)):
        # Split the filename and extension
        file_name_without_extension = os.path.splitext(filename)[0]
        # Print the file name without the extension
        print(f'{url_base}{file_name_without_extension}.html')