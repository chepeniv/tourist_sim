#!/usr/bin/python3

from random import randint, choice

maze_size = 12

(none, left, right, left_right) = (0, 1, 2, 3)
(top, bottom, top_bottom) = (1, 2, 3)

# codes indicate which walls are _present_
wall_codes = [
    # x,  l,  r, lr
    [ 0,  1,  2,  3], # x
    [ 4,  5,  6,  7], # t
    [ 8,  9, 10, 11], # b
    [12, 13, 14, 15], # tb
]

wall_indeces = {
            # prev      next
    'up':    (bottom,   top),
    'right': (left,     right),
    'down':  (top,      bottom),
    'left':  (right,    left)
}

traceback_path = list()
visited_blocks = set()

def init_maze(size):
    maze_array = []
    maze_row = []

    for x in range(size):
        maze_row.append([3, 3]) # all blocks closed
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
    return choice(available)

def draw_path(maze):
    init_pos = (0, 0)
    next_pos = next_xy(init_pos)
    while next_pos != (0, 0):
        last_pos = next_pos

        (path, next_pos) = next_xy(last_pos)
        (prev_idx, next_idx) = wall_indeces.get(path)

        last_y = last_pos[0]
        last_x = last_pos[1]
        next_y = next_pos[0]
        next_x = next_pos[1]

        # solution / simplification the trace-back
        # will automatically remove the remaining half-wall
        (last_tb, last_lr) = maze[last_y][last_x]
        (next_tb, next_lr) = maze[next_y][next_x]

        if path in ('up, down'):
            maze[last_y][last_x] = (prev_idx, last_lr)
            maze[next_y][next_x] = (next_idx, next_lr)
        else:
            maze[last_y][last_x] = (last_tb, prev_idx)
            maze[next_y][next_x] = (next_tb, next_idx)

maze = init_maze(maze_size)
draw_path(maze)
print_maze(maze)
