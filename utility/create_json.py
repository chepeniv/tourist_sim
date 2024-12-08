import os
import json
import csv

# Define paths relative to the project root
csv_file_path = './data/interactions.csv'  # CSV file in the data folder
json_file_path = './data/encounters.json'  # JSON file in the data folder

def csv_to_json(csv_file, json_file):
    try:
        # Open the CSV file
        with open(csv_file, mode='r') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            data = [row for row in csv_reader]

        # Create the JSON file
        with open(json_file, mode='w') as json_file:
            json.dump(data, json_file, indent=4)

        print(f"JSON file created successfully: {json_file_path}")

    except FileNotFoundError as e:
        print(f"File not found: {e}")
        exit(1)

# Execute the function
csv_to_json(csv_file_path, json_file_path)
