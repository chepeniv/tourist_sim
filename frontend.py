#!/usr/bin/python3

from flask import Flask, abort, render_template
from utility.maze_gen import generate_maze
from json import loads
# from flask_cors import CORS, cross_origin // for backend

app = Flask(__name__)

@app.route('/', strict_slashes=False)
def landing_page():
    return render_template('homepage.html')

@app.route('/generate_maze', strict_slashes=False)
def get_maze():
    return generate_maze(16)
    # maze_data = []
    # with open('data/maze_data.json', mode='r') as json_file:
    #     maze_data = json_file.read()
    # maze_data = loads(maze_data)
    # return maze_data

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')

