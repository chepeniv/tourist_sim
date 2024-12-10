#!/usr/bin/node
/* global $ */

// key codes
const left = 37;
const up = 38;
const right = 39;
const down = 40;

// Flag to check if interaction is ongoing
let isInteracting = false;

function encounterEngaged(position) {
  return position.hasClass('encounter');
}

function reachedExit() {
  $('.dialogue p').text('Exit reached!');
  setTimeout(function () {
    $('.dialogue p').text('');
  }, 250);
}

function moveRight(oldPos) {
  const next = oldPos.next();
  const isExit = oldPos.hasClass('exit-right');
  const boundRight = (
    oldPos.hasClass('right-wall') ||
    next.hasClass('left-wall')
  );

  if (!boundRight) {
    oldPos.toggleClass('player-pos');
    next.toggleClass('player-pos');
  }
  if (isExit) { reachedExit(); }
}

function moveLeft(oldPos) {
  const prev = oldPos.prev();
  const boundLeft = (
    oldPos.hasClass('left-wall') ||
    prev.hasClass('right-wall')
  );

  if (!boundLeft) {
    oldPos.toggleClass('player-pos');
    prev.toggleClass('player-pos');
  }
}

function moveUp(oldPos) {
  const index = oldPos.index();
  const rowIndex = oldPos.parent().index();
  const newPos = $(`.${rowIndex - 1} .${index}`);

  const boundTop = (
    oldPos.hasClass('top-wall') ||
    newPos.hasClass('bottom-wall')
  );

  if (!boundTop) {
    oldPos.toggleClass('player-pos');
    newPos.toggleClass('player-pos');
  }
  if (oldPos.hasClass('exit-top')) { reachedExit(); }
}

function moveDown(oldPos) {
  const index = oldPos.index();
  const rowIndex = oldPos.parent().index();
  const newPos = $(`.${rowIndex + 1} .${index}`);

  const boundBottom = (
    oldPos.hasClass('bottom-wall') ||
    newPos.hasClass('top-wall')
  );

  if (!boundBottom) {
    oldPos.toggleClass('player-pos');
    newPos.toggleClass('player-pos');
  }
  if (oldPos.hasClass('exit-bottom')) { reachedExit(); }
}

$(function () {
  $('html').on('keydown', function (e) {
    if (isInteracting) {
      // Prevent movement if interacting
      return;
    }

    const oldPos = $('.player-pos');

    if (
      e.keyCode < left ||
      down < e.keyCode ||
      encounterEngaged(oldPos)
    ) {
      return;
    }

    if (e.keyCode === right) {
      moveRight(oldPos);
    } else if (e.keyCode === left) {
      moveLeft(oldPos);
    } else if (e.keyCode === up) {
      moveUp(oldPos);
    } else if (e.keyCode === down) {
      moveDown(oldPos);
    }
  });
});

// Modify interaction logic to disable movement during interaction
function startInteraction() {
  isInteracting = true; // Prevent movement
}

function endInteraction() {
  isInteracting = false; // Allow movement again
}

function clearEncounter() {
  const pos = $('.player-pos');
  pos.removeClass('encounter engaged'); // Clear encounter state
  $('.options').hide(); // Hide options menu
}

function respond(actionEffect) {
  startInteraction(); // Disable movement during response
  clearEncounter(); // Clear encounter state
  setTimeout(function () {
    effectStats(actionEffect); // Apply effect based on action
    endInteraction(); // Re-enable movement
  }, 1000); // Simulate a delay before re-enabling movement
}

function respondPositively() {
  respond(1); // Apply positive effects
}

function respondNeutrally() {
  respond(0); // Apply neutral effects
}

function respondNegatively() {
  respond(-1); // Apply negative effects
}

function ignoreEncounter() {
  console.log("Ignoring encounter...");
  clearEncounter(); // Clear encounter state
  setTimeout(function () {
    endInteraction(); // Re-enable movement after delay
  }, 1000);
}

function initEncounter() {
  const pos = $('.player-pos');
  if (pos.hasClass('encounter') && !pos.hasClass('engaged')) {
    console.log("Encounter initiated"); // Debugging log
    pos.addClass('engaged');
    $('.options').show(); // Display options
    startInteraction(); // Block movement during interaction
  }
}

$(function () {
  createEncounters(8); // Place random encounters

  $('.options').hide(); // Initially hide options

  $('html').on('keydown', function (e) {
    const oldPos = $('.player-pos');

    // Skip movement if interacting or engaged in encounter
    if (isInteracting || oldPos.hasClass('engaged')) {
      return;
    }

    // Check for encounters
    initEncounter();
  });

  // Event listeners for buttons in the options menu
  $('#polite').on('click', function () {
    respondPositively(); // Apply positive response
  });

  $('#mellow').on('click', function () {
    respondNeutrally(); // Apply neutral response
  });

  $('#rude').on('click', function () {
    respondNegatively(); // Apply negative response
  });

  // Add an event for the "ignore" button
  $('#ignore').on('click', function () {
    ignoreEncounter(); // Call ignore encounter function
  });
});
