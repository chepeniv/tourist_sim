#!/usr/bin/python3
from random import choice
import json


size = 4
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
        return grid_cells[x][y]

def remove_walls(current, next):
    dx = current.x - next.x
    dy = current.y - next.y
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
    print(f"{current.walls}")
    print(f"{next.walls}")

def generate_maze():
    global grid_cells
    grid_cells = [[Cell(x, y) for y in range(size)] for x in range(size)]

    def dfs(current):
        current.visited = True
        print(f"Visiting cell ({current.x}, {current.y})")
        print(f"Current walls: {current.walls}")
        print(f"Neighbors: {current.walls['top']}, {current.walls['left']}, {current.walls['bottom']}, {current.walls['right']}")

        stack = [current]
        while stack:
            current = stack[-1]
            print(f"Visiting cell ({current.x}, {current.y})")
            print(f"Current walls: {current.walls}")
            print(f"Neighbors: {current.walls['top']}, {current.walls['left']}, {current.walls['bottom']}, {current.walls['right']}")
            neighbors = []
            top = current.check_cell(current.x, current.y-1)
            left = current.check_cell(current.x-1, current.y)
            bottom = current.check_cell(current.x, current.y+1)
            right = current.check_cell(current.x+1, current.y)

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
                next_cell.visited = True
                print(f"Removing walls between ({current.x}, {current.y}) and ({next_cell.x}, {next_cell.y})")
                stack.append(next_cell)
            else:
                print("backtracking by one")
                stack.pop()

    start = grid_cells[0][0]
    dfs(start)

def maze_to_json(maze):
    def cell_to_number(cell):
        walls = cell.walls.copy()

        if walls['top'] and walls['bottom'] and not walls['left'] and not walls['right']:
            return 0
        elif walls['left'] and walls['right'] and not walls['top'] and not walls['bottom']:
            return 1
        elif walls['left'] and walls['right'] and walls['top'] and not walls['bottom']:
            return 2
        elif walls['top'] and walls['bottom'] and walls['right'] and not walls['left']:
            return 3
        elif walls['left'] and walls['top'] and walls['bottom'] and not walls['right']:
            return 4
        elif walls['left'] and walls['right'] and walls['bottom'] and not walls['top']:
            return 5
        elif walls['top'] and walls['left'] and not walls['bottom'] and not walls['right']:
            return 6
        elif walls['top'] and walls['right'] and not walls['bottom'] and not walls['right']:
            return 7
        elif walls['bottom'] and walls['left'] and not walls['top'] and not walls['right']:
            return 8
        elif walls['bottom'] and walls['right'] and not walls['top'] and not walls['left']:
            return 9
        elif walls['top'] and not walls['right'] and not walls['bottom'] and not walls['left']:
            return 10
        elif walls['right'] and not walls['top'] and not walls['left'] and not walls['bottom']:
            return 11
        elif walls['bottom'] and not walls['left'] and not walls['top'] and not walls['right']:
            return 12
        elif walls['left'] and not walls['top'] and not walls['right'] and not walls['bottom']:
            return 13

    return [[cell_to_number(cell) for cell in row] for row in maze]

generate_maze()

serialized_maze = maze_to_json(grid_cells)

with open('mazes.json', 'w') as f:
    json.dump(serialized_maze, f)
