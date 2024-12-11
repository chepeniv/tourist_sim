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
global visited_blocks
visited_blocks = {'visited_blocks': set()}

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
    global visited_blocks
    print(f"last_pos: {last_pos}")
    if isinstance(last_pos, str):
        last_x, last_y = map(int, last_pos.split(','))
    else:
        last_x, last_y = last_pos

    visited_blocks['visited_blocks'].add((last_x, last_y))

    directions = {
        'up':    (-1, 0),
        'right': (0, 1),
        'down':  (1, 0),
        'left':  (0, -1)
    }

    available = []
    for item in directions.items():
        dir_name, (dx, dy) = item
        print(f"last_x: {last_x}")
        print(f"dx: {dx}")
        print(f"last_y: {last_y}")
        print(f"dy: {dy}")
        new_x = last_x + dx
        new_y = last_y + dy

        if (new_x, new_y) not in visited_blocks['visited_blocks'] and \
            0 <= new_x < maze_size and \
            0 <= new_y < maze_size:
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
