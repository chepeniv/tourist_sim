#!/usr/bin/python3

from random import choice

maze_size = 8
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
    visited_blocks.add(tuple(last_pos))

    x = last_pos[0]
    y = last_pos[1]

    directions = [
        [x + 1  ,   y       ],
        [x      ,   y + 1   ],
        [x - 1  ,   y       ],
        [x      ,   y - 1   ]
    ]

    available = []

    for xy in directions:
        newx = xy[0]
        newy = xy[1]
        if (tuple(xy) not in visited_blocks and
            newx >= 0 and
            newx < maze_size and
            newy >= 0 and
            newy < maze_size):
            available.append(xy)

    if len(available) == 0:
        return traceback_path.pop()

    traceback_path.append(last_pos)
    next_pos = choice(available)
    return next_pos

def draw_path():
    current_pos = [0, 0]
    current_pos = next_xy(current_pos)
    while current_pos != [0, 0]:
        print(current_pos)
        last_pos = current_pos
        current_pos = next_xy(current_pos)
    print(len(visited_blocks))

# maze = init_maze(maze_size)
draw_path()
