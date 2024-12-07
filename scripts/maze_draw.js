#!/usr/bin/node
/* global $ */

// TASK
// implement block types

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
$(function () {
  console.log(horHall, verHall, deadEndDown, deadEndUp, deadEndLeft, deadEndRight);
  console.log(cornerUpRight, cornerUpLeft, cornerDownLeft, cornerDownRight);
});
