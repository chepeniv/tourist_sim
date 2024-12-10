#!/usr/bin/python3

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

def create_maze(size):
    path_stack = []

