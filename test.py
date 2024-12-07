from random import choice


# Initialization
x, y = 0, 0 # Starting position
cols, rows = 12, 12
find_solution = False
global count
count = 0

class Cell:
    def __init__(self,x,y):
        self.x, self.y = x, y
        self.walls = {'top':True, 'left':True, 'bottom':True, 'right':True}
        self.path = {'top':False, 'left':False, 'bottom':False, 'right':False}
        self.visited = False

    def check_cell(self, x, y):
        find_index = lambda x, y: x + y * cols
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
    dx, dy = current.x - next.x, current.y - next.y
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

def maze_to_json(maze):
    def cell_to_number(cell):
        walls = cell.walls.copy()

        if walls['top'] and walls['bottom'] and walls['right']:
            return 3
        elif walls['top'] and walls['bottom'] and walls['left']:
            return 4
        elif walls['top'] and walls['right'] and walls['left']:
            return 2
        elif walls['right'] and walls['left'] and walls['bottom']:
            return 5
        elif walls['top'] and walls['bottom']:
            return 0
        elif walls['left'] and walls['right']:
            return 1
        elif walls['top'] and walls['left']:
            return 6
        elif walls['top'] and walls['right']:
            return 7
        elif walls['left'] and walls['bottom']:
            return 8
        elif walls['right'] and walls['bottom']:
            return 9
        else:
            ValueError()

    return [[cell_to_number(cell) for cell in row] for row in maze]

grid_cells = [Cell(col,row) for row in range(rows) for col in range(cols)]
current_cell = grid_cells[0]
stack = []

print("before loop")
while True:
    current_cell.visited = True
    count = count + 1
    print(f"Loop count: {count}")
    next_cell = current_cell.check_neighbors()
    if next_cell:
        next_cell.visited = True
        stack.append(current_cell)
        remove_walls(current_cell, next_cell)
        current_cell = next_cell
    elif stack:
        current_cell = stack.pop()
    else:
        if find_solution:
            if solution:
                previous_cell = current_cell
                current_cell = solution[-1]
                current_cell.solution = True
                add_solution_path(previous_cell, current_cell)
                solution.pop()
            else:
                previous_cell = current_cell
                current_cell = grid_cells[0]
                add_solution_path(previous_cell, current_cell)
print("after loop")
serialized_maze = maze_to_json(grid_cells)

with open('mazes.json', 'w') as f:
    json.dump(serialized_maze, f)
