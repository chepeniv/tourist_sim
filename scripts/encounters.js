#!/usr/bin/node
/* global $ */

// Function to create random encounters on the grid
function createEncounters(size) {
  for (let i = 0; i < size; i++) {
    const randX = Math.floor(Math.random() * size);
    const randY = Math.floor(Math.random() * size);
    const tile = $(`.${randY} .${randX}`);
    if (!tile.hasClass('player-pos')) {
      tile.addClass('encounter');
    }
  }
}

// Function to modify player stats (health, cash, etc.)
function effectStats(num) {
  // Modify the stats (this is a placeholder, adjust based on your needs)
  if (num === 1) {
    console.log("Player responds positively: gain health or cash");
  } else if (num === 0) {
    console.log("Player responds neutrally: no change in stats");
  } else if (num === -1) {
    console.log("Player responds negatively: lose health or cash");
  }
}

// Handle encounter responses (engage or ignore)
function respond() {
  const pos = $('.player-pos');
  pos.removeClass('encounter engaged'); // Remove the encounter and engaged classes
  $('.options').hide(); // Hide the options
  // Allow the player to move immediately after response
  setTimeout(function () {
    pos.removeClass('engaged'); // Ensure movement is enabled after response
    $('.player-pos').removeClass('engaged'); // Explicitly ensure movement state is reset
  }, 500); // 500ms (0.5 seconds) delay before allowing movement
}

// Respond positively to the encounter (e.g., gain something)
function respondPositively() {
  respond();
  effectStats(1); // Example: increase health or cash
}

// Respond neutrally to the encounter (e.g., no change)
function respondNeutrally() {
  respond();
  effectStats(0); // No effect on stats
}

// Respond negatively to the encounter (e.g., lose something)
function respondNegatively() {
  respond();
  effectStats(-1); // Example: decrease health or cash
}

// Ignore the encounter, allow the player to move freely
function ignoreEncounter() {
  const pos = $('.player-pos');
  console.log("Ignoring encounter");  // Debugging log
  pos.removeClass('encounter engaged'); // Remove encounter and engaged classes
  $('.options').hide(); // Hide the options
  // Allow the player to move immediately after ignoring the encounter
  setTimeout(function () {
    pos.removeClass('engaged'); // Ensure movement is enabled after ignoring
  }, 500); // 500ms (0.5 seconds) delay before allowing movement
}

// Initialize the encounter interaction
function initEncounter() {
  const pos = $('.player-pos');
  if (pos.hasClass('encounter') && !pos.hasClass('engaged')) {
    pos.addClass('engaged'); // Mark the encounter as engaged
    $('.options').show(); // Show the options when an encounter is triggered
  }
}

$(function () {
  createEncounters(8); // Creates random encounters on the grid

  $('.options').hide(); // Initially hide options for responding to encounters

  // Key press event to detect player movement and trigger encounters
  $('html').on('keydown', function (e) {
    const oldPos = $('.player-pos');

    // Don't process key press if encounter is engaged
    if (oldPos.hasClass('engaged')) {
      return;
    }

    // Check for encounter and initiate interaction
    initEncounter();

    // Add movement logic here for the player...
    // Example of player movement (you can replace it with your actual logic)
    // movePlayer(e); // Define this function to move the player on the grid
  });

  // Event listeners for buttons in the options menu
  $('#polite').on('click', function () {
    respondPositively(); // Handle the positive response
  });

  $('#mellow').on('click', function () {
    respondNeutrally(); // Handle the neutral response
  });

  $('#rude').on('click', function () {
    respondNegatively(); // Handle the negative response
  });

  // Add an event listener for the "ignore" button to dismiss the encounter
  $('#ignore').on('click', function () {
    ignoreEncounter(); // Call ignore encounter function
  });
});
