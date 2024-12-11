#!/usr/bin/python3

from sys import argv
from json import dumps
from random import choice

# wall codes indicate which walls are _present_
# as walls are removed these numbers should
# never increase

traceback_path = list()
visited_blocks = set()
wall_code = [
    # x,  l,  r, lr
    [ 0,  1,  2,  3], # y
    [ 4,  5,  6,  7], # t
    [ 8,  9, 10, 11], # b
    [12, 13, 14, 15], # tb
]

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
def next_block(last_pos, limit):
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
            newx < limit and
            newy >= 0 and
            newy < limit):
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
    limit = len(maze)
    while True:
        (last_y, last_x) = next_pos
        (path, next_pos) = next_block(next_pos, limit)

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

def encode_row(row):
    encoded_row = []
    for columm in row:
        tb = columm[0]
        lr = columm[1]
        code = wall_code[tb][lr]
        encoded_row.append(code)
    return encoded_row

def encode_maze(maze):
    return list(map(encode_row, maze))

def compresse_maze(maze):
    compressed = []
    height = range(len(maze))
    width = range(int((len(maze) / 2)))
    for row in height:
        new_row = []
        for column in width:
            shift = row % 2
            column = column * 2 + shift
            code = maze[row][column]
            new_row.append(code)
        compressed.append(new_row)
    return compressed

def parse_input():
    default = 12
    size = default

    if len(argv) >= 2:
        size = argv[1]
        if not size.isdecimal():
            print('unparsable input, setting size to delault')
            return default

        size = int(size)
        if size > 128:
            size = 128
        elif size < 8:
            size = 8
    else:
        print('no argument provided, setting size to delault')

    return size

def export_json(maze):
    maze_data = dumps(maze)
    with open('data/maze_data.json', mode='w') as json_file:
        json_file.write(maze_data)

def generate_maze(size):
    visited_blocks.clear()

    maze = init_maze(size)
    draw_path(maze)

    maze = encode_maze(maze)
    maze = compresse_maze(maze)

    # export_json(maze)
    return maze
