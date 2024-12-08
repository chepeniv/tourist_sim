#!/usr/bin/node
/* global $ */

// key codes
const left = 37;
const up = 38;
const right = 39;
const down = 40;

function encounterEngaged (position) {
  return position.hasClass('encounter');
}

function reachedExit () {
  $('.dialogue').prepend('<p>exit reached!</p>');
  setTimeout(function () {
    $('.dialogue p').remove();
  }, 250);
}

function moveRight (oldPos) {
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

function moveLeft (oldPos) {
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

function moveUp (oldPos) {
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

function moveDown (oldPos) {
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
