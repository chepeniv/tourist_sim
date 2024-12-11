#!/usr/bin/python3

from flask import Flask, abort, render_template
from utility.maze_gen import generate_maze
from json import loads

app = Flask(__name__)

@app.route('/', strict_slashes=False)
def landing_page():
    update_maze()
    return render_template('homepage.html')

@app.route('/generate_maze', strict_slashes=False)
def update_maze():
    return generate_maze(16)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')

