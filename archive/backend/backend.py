#!/usr/bin/python3

from flask import Flask, render_template, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.register_blueprint(app_views)
cors_setup = CORS(
    app,
    send_wildcard=True,
    resources={r"/data/*": {"origins": "*"}})

@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not found"}), 404

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port='5001',
        threaded=True
    )
