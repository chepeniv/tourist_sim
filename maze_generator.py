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

        if walls['top'] and walls['bottom']:
            if walls['left'] and walls['right']:
               return 3  # All walls
            elif walls['left']:
                return 4  # Top and bottom, left
            elif walls['right']:
                return 5  # Top and bottom, right
            else:
                return 0  # Top and bottom only
        elif walls['left'] and walls['right']:
            if walls['top']:
                return 6  # Left and right, top
            elif walls['bottom']:
                return 7  # Left and right, bottom
            else:
                return 1  # Left and right only
        elif walls['top']:
            return 2  # Top only
        elif walls['bottom']:
            return 8  # Bottom only
        elif walls['left']:
            return 9  # Left only
        elif walls['right']:
            return 10  # Right only
        else:
            return 11  # No walls

    return [[cell_to_number(cell) for cell in row] for row in maze]

generate_maze()

serialized_maze = maze_to_json(grid_cells)

with open('mazes.json', 'w') as f:
    json.dump(serialized_maze, f)
