#!/usr/bin/node
/* global $ */

// List of possible wall encodings for the maze
const wallEncodings = [
  'no-wall',
  'left-wall',
  'top-wall',
  'right-wall',
  'bottom-wall',
  'right-wall left-wall',
  'top-wall bottom-wall',
  'right-wall bottom-wall left-wall',
  'top-wall left-wall bottom-wall',
  'right-wall top-wall left-wall',
  'top-wall right-wall bottom-wall',
  'left-wall top-wall',
  'right-wall top-wall',
  'right-wall bottom-wall',
  'left-wall bottom-wall'
];

// Maze layout (initial empty layout)
const initMaze = [
  [0, 4, 4, 3],
  [14, 11, 5, 1],
  [4, 10, 1, 6],
  [6, 3, 7, 4],
  [4, 6, 1, 6],
  [6, 12, 11, 4],
  [3, 7, 5, 6],
  [0, 1, 2, 1]
];

// List of possible encounters
const encounters = [
  {
    "id": "1",
    "type": "thief",
    "description": "A shady thief lurks here. Be careful",
    "outcome_positive": " or you might lose what little you have!",
    "outcome_negative": "Thief tricks you and steals belongings.",
    "reward_type": "You walk away unharmed.",
    "reward_amount": "money",
    "penalty_type": "0",
    "penalty_amount": "money",
    "null": ["-20"]
  },
  {
    "id": "2",
    "type": "cop",
    "description": "A police officer stands nearby",
    "outcome_positive": " observing everything.",
    "outcome_negative": "Cop gives helpful advice.",
    "reward_type": "Cop fines you for bribery.",
    "reward_amount": "health",
    "penalty_type": "10",
    "penalty_amount": "money",
    "null": ["-10"]
  },
  {
    "id": "3",
    "type": "old-man",
    "description": "An old man sits here",
    "outcome_positive": " looking friendly.",
    "outcome_negative": "Old man shares a valuable tip.",
    "reward_type": "You miss out on some helpful advice.",
    "reward_amount": "money",
    "penalty_type": "10",
    "penalty_amount": "none",
    "null": ["0"]
  },
  {
    "id": "4",
    "type": "woman",
    "description": "A local woman is standing here",
    "outcome_positive": " looking curious.",
    "outcome_negative": "You buy a first aid kit.",
    "reward_type": "You walk away with no changes.",
    "reward_amount": "money",
    "penalty_type": "-15",
    "penalty_amount": "item",
    "null": ["first aid kit"]
  },
  {
    "id": "5",
    "type": "trash",
    "description": "A pile of trash is here. Maybe you should check it out.",
    "outcome_positive": "You find some money.",
    "outcome_negative": "You injure yourself.",
    "reward_type": "money",
    "reward_amount": "10",
    "penalty_type": "health",
    "penalty_amount": "-15"
  },
  {
    "id": "6",
    "type": "store",
    "description": "A store is here. Maybe you can buy something useful.",
    "outcome_positive": "You regain health by buying items.",
    "outcome_negative": "You walk away with no changes.",
    "reward_type": "health",
    "reward_amount": "20",
    "penalty_type": "money",
    "penalty_amount": "-10"
  }
];

// Random encounter positions
const encounterPositions = [];

// Randomly assign encounters to maze positions
function assignEncounters(layout) {
  const totalCells = layout.length * layout[0].length; // Total number of cells in the maze
  const numEncounters = Math.floor(totalCells / 5); // Place encounters at 20% of the positions

  // Randomly pick positions for encounters
  while (encounterPositions.length < numEncounters) {
    const randomY = Math.floor(Math.random() * layout.length);
    const randomX = Math.floor(Math.random() * layout[randomY].length);

    // Avoid duplicate positions
    if (!encounterPositions.some(pos => pos.y === randomY && pos.x === randomX)) {
      encounterPositions.push({ x: randomX, y: randomY });
    }
  }

  // Assign encounters to the selected positions
  encounterPositions.forEach(pos => {
    const randomEncounter = encounters[Math.floor(Math.random() * encounters.length)];
    layout[pos.y][pos.x] = randomEncounter;  // Replace the maze cell with an encounter
  });
}

// Draw the maze with encounters
function drawMaze(layout) {
  const height = layout.length;
  const width = Math.floor(height / 2);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const shift = y % 2;
      const row = y;
      const column = (x * 2) + shift;

      const code = layout[y][x];
      const walls = wallEncodings[code];

      const coordinates = `.${row} .${column}`;
      $(coordinates).addClass(walls);

      // If there's an encounter at this position, add its details
      if (encounterPositions.some(pos => pos.y === y && pos.x === x)) {
        const encounter = layout[y][x];
        $(coordinates).attr('data-encounter', encounter.id);
        $(coordinates).addClass('has-encounter');  // Optional: add class for styling encounter
        $(coordinates).attr('title', encounter.description);  // Tooltip for encounter description
      }
    }
  }
}

// Initialize the maze
$(function () {
  assignEncounters(initMaze);  // Assign encounters to the maze layout
  drawMaze(initMaze);  // Draw the maze with encounters
});
