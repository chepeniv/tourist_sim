#!/usr/bin/node
/* global $ */

// key codes
const left = 37;
const up = 38;
const right = 39;
const down = 40;

function reachedExit () {
  $('.dialogue').prepend('<p>exit reached!</p>');
  setTimeout(function () {
    $('.dialogue p').remove();
  }, 250);
}

function moveRight (oldPos) {
  const boundRight = oldPos.hasClass('bound-right');
  const isExit = oldPos.hasClass('exit-right');
  const next = oldPos.next();
  if (!boundRight) {
    oldPos.toggleClass('player-pos');
    next.toggleClass('player-pos');
  }
  if (isExit) { reachedExit(); }
}

function moveLeft (oldPos) {
  const boundLeft = oldPos.hasClass('bound-left');
  const prev = oldPos.prev();
  if (!boundLeft) {
    oldPos.toggleClass('player-pos');
    prev.toggleClass('player-pos');
  }
}

function moveUp (oldPos) {
  const index = oldPos.index();
  const rowIndex = oldPos.parent().index();
  const boundTop = oldPos.hasClass('bound-top');
  const newPos = `.${rowIndex - 1} .${index}`;
  if (!boundTop) {
    oldPos.toggleClass('player-pos');
    $(newPos).toggleClass('player-pos');
  }
  if (oldPos.hasClass('exit-top')) { reachedExit(); }
}

function moveDown (oldPos) {
  const index = oldPos.index();
  const rowIndex = oldPos.parent().index();
  const boundBottom = oldPos.hasClass('bound-bottom');
  const newPos = `.${rowIndex + 1} .${index}`;
  if (!boundBottom) {
    oldPos.toggleClass('player-pos');
    $(newPos).toggleClass('player-pos');
  }
  if (oldPos.hasClass('exit-bottom')) { reachedExit(); }
}

$(function () {
  $('html').keydown(function (e) {
    if (e.keyCode < left || down < e.keyCode) {
      return;
    }

    const oldPos = $('.player-pos');
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
