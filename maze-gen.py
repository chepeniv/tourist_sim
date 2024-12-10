#!/usr/bin/python3

from random import randint, choice

maze_size = 12
wall_codes = {
    # singles
    'no_wall':  0,
    'left':     1,
    'top':      2,
    'right':    3,
    'bot':      4,

    # halls
    'l_r':      5,
    't_b':      6,

    # dead-ends
    'r_t_b':    7,
    'r_t_b':    8,
    'r_t_b':    9,
    'r_t_b':    10,

    # corners
    'l_t':      11,
    'r_t':      12,
    'r_b':      13,
    'l_b':      14,
}

traceback_path = list()
visited_blocks = set()

def init_maze(size):
    maze_array = []
    maze_row = []

    for x in range(size):
        maze_row.append(0)
    for x in range(size):
        maze_array.append(maze_row)

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
        key = item[0]
        xy = item[1]
        (newy, newx) = xy

        if (xy not in visited_blocks and
            newx >= 0 and
            newx < maze_size and
            newy >= 0 and
            newy < maze_size):
            available.append(item)

    if len(available) == 0:
        return traceback_path.pop()

    traceback_path.append(last_pos)
    (path, block) = choice(available)
    # print(path + '\t: ' + str(block))
    return block

def draw_path():
    current_pos = (0, 0)
    current_pos = next_xy(current_pos)
    while current_pos != (0, 0):
        last_pos = current_pos
        current_pos = next_xy(current_pos)
    print(len(visited_blocks))

# maze = init_maze(maze_size)
draw_path()
