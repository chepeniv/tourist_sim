#!/usr/bin/python3

from random import randint, choice

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

traceback_path = [[0, 0]]
visited_blocks = []

def print_maze(maze_array):
    for row in maze_array:
        print(row)

def get_xy(current_pos):
    x = current_pos[0]
    y = current_pos[1]
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
        # if (xy not in visited_blocks and
        if (newx >= 0 and
            newx < maze_size and
            newy >= 0 and
            newy < maze_size):
            available.append(xy)

    if len(available) == 0:
        print('out of bounds')
        # return traceback_path.pop()
        return current_pos

    new_pos = choice(available)
    return new_pos

def init_maze(size):
    maze_array = []
    maze_row = []

    for x in range(size):
        maze_row.append(0)
    for x in range(size):
        maze_array.append(maze_row)

    return maze_array

print_maze(init_maze(maze_size))

current_pos = [0, 0]
# while true
for i in range(maze_size * 4):
    print(current_pos)
    last_pos = current_pos
    current_pos = get_xy(current_pos)
    # break if position returned is [0, 0]

