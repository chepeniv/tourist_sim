import csv
import json

# Define the CSV and JSON file paths
csv_file_path = 'data/encounters.csv'  # Adjust path as needed
json_file_path = 'data/encounters.json'  # Adjust path as needed

def csv_to_json(csv_file_path, json_file_path):
    encounters = []  # List to store encounters data
    
    # Open and read the CSV file
    with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)  # Read each row as a dictionary
        
        for row in csv_reader:
            encounter = {
                'id': row['id'],
                'type': row['type'],
                'description': row['description'],
                'outcome_positive': row['outcome_positive'],
                'outcome_negative': row['outcome_negative'],
                'reward_type': row['reward_type'],
                'reward_amount': row['reward_amount'],
                'penalty_type': row['penalty_type'],
                'penalty_amount': row['penalty_amount']
            }
            
            # Handling the 'null' field which may be a list
            null_values = row.get('null', '').split(',')
            if null_values != ['']:  # If 'null' field isn't empty
                encounter['null'] = null_values
            else:
                encounter['null'] = []

            encounters.append(encounter)
    
    # Write the data to a JSON file
    with open(json_file_path, mode='w', encoding='utf-8') as json_file:
        json.dump(encounters, json_file, indent=4)

if __name__ == '__main__':
    csv_to_json(csv_file_path, json_file_path)
    print(f"CSV data has been converted to JSON and saved as {json_file_path}")
