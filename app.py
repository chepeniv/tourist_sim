from flask import Flask, jsonify

app = Flask(__name__)

# Define a route for the root URL
@app.route('/')
def home():
    return 'Welcome to the Tourist Simulation!'

# Route to fetch interaction by ID
@app.route('/interaction/<int:id>', methods=['GET'])
def get_interaction(id):
    # Example interactions (you can load this from a JSON or database later)
    interactions = [
        {"id": 1, "type": "thief", "description": "A shady thief lurks here. Be careful"},
        {"id": 2, "type": "cop", "description": "A police officer stands nearby"},
        {"id": 3, "type": "old-man", "description": "An old man sits here"},
    ]
    
    # Find the interaction by id
    interaction = next((item for item in interactions if item["id"] == id), None)
    
    if interaction:
        return jsonify(interaction)
    else:
        return jsonify({"error": "Interaction not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
