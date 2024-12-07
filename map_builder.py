import json

with open('mazes.json', 'r') as file:
    maze_data = json.load(file)

print(maze_data)
