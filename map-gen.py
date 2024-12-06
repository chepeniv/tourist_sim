#!/usr/bin/python3
from random import choice
# find a depth-first search algorithm to make a maze

# convert the generated maze into a binary tree
# (possibly not needed if the algorithm already does this)

# use the binary tree data structure to make an array of numbers based on the layout
# (see the photo in slack for what 0-9 mean)

# make it jsonifyable

#export the json into mazes.json
size = 12
cols = size
rows = size


class Cell:
    def __init__(self, x, y):
        self.x, self.y = x, y
        self.walls = {'top':True, 'left':True, 'bottom':True, 'right':True}
        self.path = {'top':False, 'left':False, 'bottom':False, 'right':False}
        self.visited = False

    def check_cell(self, x, y):
        find_index = lamba x, y: x + y * cols
        if x < 0 or x > cols-1 or y < 0 or y > rows-1:
            return False
        return grid_cells[find_index(x, y)]

    def check_neighbors(self):
        neighbors = []
        top = self.check_cell(self.x, self.y-1)
        left = self.check_cell(self.x-1, self.y)
        bottom = self.check_cell(self.x, self.y+1)
        right = self.check_cell(self.x+1, self.y)
        if top and not top.visited:
            neighbors.append(top)
        if left and not left.visited:
            neighbors.append(left)
        if bottom and not bottom.visited:
            neighbors.append(bottom)
        if right and not right.visited:
            neighbors.append(right)
        return choice(neighbors) if neighbors else False

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
