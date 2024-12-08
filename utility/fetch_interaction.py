import json
import os

# Define the absolute path to the interactions JSON file
json_file_path = os.path.join(os.path.dirname(__file__), '../data/encounters.json')

def fetch_interaction(interaction_id):
    try:
        # Load the encounters data from the JSON file
        with open(json_file_path, 'r') as json_file:
            interactions = json.load(json_file)
        
        print("Loaded interactions:", interactions)  # Debugging line to show the loaded data

        # Loop through each interaction to find the one with the matching ID
        for interaction in interactions:
            if interaction['id'] == str(interaction_id):  # Ensure we match the ID as a string
                return interaction
        
        print(f"Interaction with ID {interaction_id} not found.")
        return None  # If the ID is not found, return None
    except FileNotFoundError:
        print(f"Error: The file {json_file_path} was not found.")
        return None
    except json.JSONDecodeError:
        print(f"Error: Could not decode the JSON file {json_file_path}.")
        return None

if __name__ == '__main__':
    # Example: Fetch interaction with ID 1 (you can change this ID)
    interaction_id = 1
    interaction = fetch_interaction(interaction_id)
    
    if interaction:
        print("Fetched Interaction:", interaction)
    else:
        print("No interaction found for the given ID.")
