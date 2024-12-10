#!/usr/bin/python3
from random import choice
import json


size = 12
cols = size
rows = size


class Cell:
    def __init__(self, x, y):
        self.x, self.y = x, y
        self.walls = {'top':True, 'left':True, 'bottom':True, 'right':True}
        self.visited = False

    def check_cell(self, x, y):
        find_index = lambda x, y: x + y * cols
        if x < 0 or x > cols-1 or y < 0 or y > rows-1:
            return False
        return grid_cells[find_index(x, y)]

def remove_walls(current, next):
    dx, dy = current.x - next.x, current.y, next.y
    if dx == 1:
        current.walls['left'] = False
        next.walls['right'] = False
    if dx == -1:
        current.walls['right'] = False
        next.walls['left'] = False
    if dy == 1:
        current.walls['top'] = False
        next.walls['bottom'] = False
    if dy == -1:
        current.walls['bottom'] = False
        next.walls['top'] = False

def generate_maze():
    global grid_cells
    grid_cells = [[Cell(x, y) for y in range(size)] for x in range(size)]

    def dfs(current):
        current.visited = True

        neighbors = []
        top = grid_cells[current.x][current.y-1] if current.y > 0 else None
        left = grid_cells[current.x-1][current.y] if current.x > 0 else None
        bottom = grid_cells[current.x][current.y+1] if current.y > size-1 else None
        right = grid_cells[current.x+1][current.y] if current.x > size-1 else None
        if top and not top.visited:
            neighbors.append(top)
        if left and not left.visited:
            neighbors.append(left)
        if bottom and not bottom.visited:
            neighbors.append(bottom)
        if right and not right.visited:
            neighbors.append(right)
        
        if neighbors:
            next_cell = choice(neighbors)
            remove_walls(current, next_cell)
            dfs(next_cell)

    start = grid_cells[0][0]
    dfs(start)

def maze_to_json(maze):
    def cell_to_number(cell):
        walls = cell.walls.copy()
        if walls['top'] and walls['bottom'] and walls['right']:
            return 3
        elif walls['top'] and walls['bottom'] and walls['left']:
            return 4
        elif walls['top'] and walls['right'] and walls['left']:
            return 2
        elif walls['right'] and walls['left'] and walls['bottom']:
            return 5
        elif walls['top'] and walls['bottom']:
            return 0
        elif walls['left'] and walls['right']:
            return 1
        elif walls['top'] and walls['left']:
            return 6
        elif walls['top'] and walls['right']:
            return 7
        elif walls['left'] and walls['bottom']:
            return 8
        elif walls['right'] and walls['bottom']:
            return 9
        else:
            ValueError()

    return [[cell_to_number(cell) for cell in row] for row in maze]

generate_maze()

serialized_maze = maze_to_json(grid_cells)

with open('mazes.json', 'w') as f:
    json.dump(serialized_maze, f)
