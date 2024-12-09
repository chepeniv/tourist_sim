from flask import Flask, jsonify
import json

app = Flask(__name__)

# Define a route for the root URL
@app.route('/')
def home():
    return 'Welcome to the Tourist Simulation!'

# Route to fetch interaction by ID
@app.route('/interaction/<int:id>', methods=['GET'])
def get_interaction(id):
    # Load interactions from the encounters.json file
    try:
        with open('data/encounters.json', 'r') as file:
            interactions = json.load(file)
    except FileNotFoundError:
        return jsonify({"error": "encounters.json file not found"}), 500

    # Find the interaction by id
    interaction = next((item for item in interactions if item["id"] == id), None)
    
    if interaction:
        return jsonify(interaction)
    else:
        return jsonify({"error": "Interaction not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
