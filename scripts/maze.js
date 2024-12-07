#!/usr/bin/node
/* global $ */

// TASK
// implement block types

// const fs = require('fs');

const mazeSize = 16;
const lastRow = mazeSize - 1;
const lastColumn = lastRow;

// key codes
const left = 37;
const up = 38;
const right = 39;
const down = 40;

// block type definitions
const horHall = 0;
const verHall = 1;
const deadEndDown = 2;
const deadEndLeft = 3;
const deadEndUp = 4;
const deadEndRight = 5;
const cornerUpLeft = 6;
const cornerUpRight = 7;
const cornerDownRight = 8;
const cornerDownLeft = 9;

// temporary: suppressing errors
console.log(horHall, verHall, deadEndDown, deadEndUp, deadEndLeft, deadEndRight);
console.log(cornerUpRight, cornerUpLeft, cornerDownLeft, cornerDownRight);

function buildRow (size, y) {
  $('.maze').append(`<tr class="row ${y}"></tr>`);
  const lastRow = $('tr').last();

  for (let x = 0; x < size; x++) {
    lastRow.append(`<td class="block ${x}"></td>`);
    const lastBlock = lastRow.children().last();
    if (y === 0) {
      lastBlock.addClass('bound-top');
    }
    if (y === size - 1) {
      lastBlock.addClass('bound-bottom');
    }
    if (x === 0) {
      lastBlock.addClass('bound-left');
    }
    if (x === size - 1) {
      lastBlock.addClass('bound-right');
    }
  }
}

// used to confine and center entry and exits
function padNum (size) {
  const center = size / 2;
  return Math.floor((Math.random() * center) + (center / 2));
}

function setEntry (size) {
  const entry = padNum(size);
  const row = `.${entry} .0`;
  $(row).addClass('player-pos');
}

function setExits (size) {
  const topExit = padNum(size);
  const rightExit = padNum(size);
  const bottomExit = padNum(size);

  const topEdge = `.0 .${topExit}`;
  const rightEdge = `.${rightExit} .${lastColumn}`;
  const bottomEdge = `.${lastRow} .${bottomExit}`;

  $(topEdge).addClass('exit-top');
  $(rightEdge).addClass('exit-right');
  $(bottomEdge).addClass('exit-bottom');
}

function buildMazeGrid (size) {
  for (let i = 0; i < size; i++) {
    buildRow(size, i);
  }
  setEntry(size);
  setExits(size);
}

function reachedExit () {
  // implement popup with jquery ui and hidden html
  console.log('reached exit!');
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
  buildMazeGrid(mazeSize);

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
