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

function respondPositively() {
  startInteraction(); // Disable movement during response
  clearEncounter(); // Clear encounter state
  setTimeout(function () {
    effectStats(1); // Apply positive effects
    endInteraction(); // Re-enable movement
  }, 1000); // Simulate a delay before re-enabling movement
}

function respondNeutrally() {
  startInteraction(); // Disable movement during response
  clearEncounter(); // Clear encounter state
  setTimeout(function () {
    effectStats(0); // Apply neutral effects
    endInteraction(); // Re-enable movement
  }, 1000); // Simulate a delay before re-enabling movement
}

function respondNegatively() {
  startInteraction(); // Disable movement during response
  clearEncounter(); // Clear encounter state
  setTimeout(function () {
    effectStats(-1); // Apply negative effects
    endInteraction(); // Re-enable movement
  }, 1000); // Simulate a delay before re-enabling movement
}

function ignoreEncounter() {
  const pos = $('.player-pos');
  console.log("Ignoring encounter");  // Debugging log
  pos.removeClass('encounter engaged');  // Remove encounter and engaged classes
  $('.options').hide();  // Hide the options
  setTimeout(function () {
    endInteraction();  // Allow movement again after 1 second
  }, 1000);  // Allow the player to move after 1 second
}

function initEncounter() {
  const pos = $('.player-pos');
  if (pos.hasClass('encounter') && !pos.hasClass('engaged')) {
    pos.addClass('engaged');
    $('.options').show();  // Show the options when encounter is triggered
  }
}

$(function () {
  createEncounters(8);  // Creates random encounters on the grid

  $('.options').hide();  // Hide options initially

  $('html').on('keydown', function (e) {
    const oldPos = $('.player-pos');

    // Don't process any key press if encounter is engaged
    if (oldPos.hasClass('engaged')) {
      return;
    }

    // Check for encounter and initiate interaction
    initEncounter();

    // Add movement logic here...
    // For example, moving the player position
  });

  // Event listeners for buttons in the options menu
  $('#polite').on('click', function () {
    respondPositively();
  });

  $('#mellow').on('click', function () {
    respondNeutrally();
  });

  $('#rude').on('click', function () {
    respondNegatively();
  });

  // Add an event for the "ignore" button
  $('#ignore').on('click', function () {
    ignoreEncounter();  // Call ignore encounter function when clicked
  });
});
