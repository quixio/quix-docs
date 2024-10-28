import os

# Specify the directory containing the files
directory = 'connect/'

# Iterate over all files in the directory
for filename in os.listdir(directory):
    file_path = os.path.join(directory, filename)
    
    # Check if it's a file (not a directory)
    if os.path.isfile(file_path):
        try:
            # Open the file with a different encoding, e.g., 'latin-1'
            with open(file_path, 'r') as file:
                content = file.read()
            
            # Save the content back to the file with UTF-8 encoding
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(content)
            
            print(f"Converted {filename} to UTF-8.")
        
        except Exception as e:
            print(f"Failed to convert {filename}: {e}")