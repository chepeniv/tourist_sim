#!/usr/bin/python3

from sys import argv
# from json import argv
from random import choice

maze_size = 4

# add var-args
# append to json file as json

# codes indicate which walls are _present_
# as walls are removed these numbers should
# never increase
wall_code = [
    # x,  l,  r, lr
    [ 0,  1,  2,  3], # y
    [ 4,  5,  6,  7], # t
    [ 8,  9, 10, 11], # b
    [12, 13, 14, 15], # tb
]

traceback_path = list()
visited_blocks = set()

def init_maze(size):
    maze_array = []
    maze_row = []

    for x in range(size):
        maze_row.append([3, 3]) # all blocks closed
    for x in range(size):
        maze_array.append(maze_row.copy())

    return maze_array

def print_maze(maze_array):
    for row in maze_array:
        print(row)

# only visited unvisited nodes unless they are on the trace-back path
def next_xy(last_pos):
    visited_blocks.add(last_pos)

    y = last_pos[0] # row
    x = last_pos[1] # column
    directions = {
        'up':    (y - 1, x    ),
        'right': (y    , x + 1),
        'down':  (y + 1, x    ),
        'left':  (y    , x - 1)
    }

    available = []
    for item in directions.items():
        xy = item[1]
        (newy, newx) = xy

        if (xy not in visited_blocks and
            newx >= 0 and
            newx < maze_size and
            newy >= 0 and
            newy < maze_size):
            available.append(item)

    if len(available) == 0:
        prev_pos = traceback_path.pop()
        for (path, pos) in directions.items():
            if prev_pos == pos:
                return (path, prev_pos)

    traceback_path.append(last_pos)
    return choice(available)

def draw_path(maze):
    next_pos = (0, 0)
    while True:
        (last_y, last_x) = next_pos
        (path, next_pos) = next_xy(next_pos)

        (code_y, code_x) = maze[last_y][last_x]

        # trace-back automatically removes the remaining half-wall
        if path == 'up':
            code_y = (code_y - 1) if code_y in (1, 3) else code_y
        elif path == 'down':
            code_y = (code_y - 2) if code_y in (2, 3) else code_y
        elif path == 'right':
            code_x = (code_x - 2) if code_x in (2, 3) else code_x
        elif path == 'left':
            code_x = (code_x - 1) if code_x in (1, 3) else code_x

        maze[last_y][last_x] = (code_y, code_x)

        if next_pos == (0, 0):
            break

def maze_encoder(row):
    encoded_row = []
    for columm in row:
        tb = columm[0]
        lr = columm[1]
        code = wall_code[tb][lr]
        encoded_row.append(code)
    return encoded_row

def maze_compressor(maze):
    comp_maze = []
    height = range(len(maze))
    width = range(int((len(maze) / 2)))
    for row in height:
        new_row = []
        for column in width:
            shift = row % 2
            column = column * 2 + shift
            code = maze[row][column]
            new_row.append(code)
        comp_maze.append(new_row)
    return comp_maze

def parse_input():
    if len(argv) >= 2:
        size = argv[1]
        size = int(size) if size.isdecimal() else 8

        if size > 128:
            size = 128
        elif size < 8:
            size = 8

        print(size)
    else:
        print('no argument provided')

if __name__ == '__main__':
    parse_input()


    # maze = init_maze(maze_size)
    # draw_path(maze)
    # print_maze(maze)

    # maze2 = list(map(maze_encoder, maze))
    # print_maze(maze2)

    # maze3 = maze_compressor(maze2)
    # print_maze(maze3)
