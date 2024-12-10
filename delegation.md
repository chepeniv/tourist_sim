# delegations

## in progress

- [ ] standardize map file layout
	- [ ] reach consensus

### Malik :
- [ ] handwrite .csv data
- [ ] create .py that jsonifies it to data/encounters.json
- [ ] create scripts/encounter_loader.js that take json file

- [ ] write out encounters ideas
	- [ ] title / id num
	- [ ] character
		- [ ] name, image url
	- [ ] dialogue text
	- [ ] response text
		- [ ] positive, negative, neutral
	- [ ] outcome codes
		- [ ] positive, negative, neutral

### chepe
- [ ] create stats mgmt logic
	- [ ] add dummy button to dummy encounter
	- [ ] increment/decrement health and cash
		- [ ] add color feedback

### top priority

- [ ] slide show
- [ ] readme

### bottom priority

## queue

- [ ] build, standardize, and organize asset library
	- [ ] handcrafted mazes
	- [ ] backgrounds
	- [ ] characters
	- [ ] obstacles
	- [ ] city layouts


### maze generator

- [ ] 12x12 format being generated
- [ ] one entrance and then one exit on each side
- [ ] implement a maze algorithm
- [ ] have it output json data to mazes.json

## extra

- [ ] implement map transformation
- [ ] random generator
- [ ] more stats like being positioned and such
- [ ] create data structures and algorithms for prime number encoding

## completed

- [x] build grid - **chepe**
- [x] implement movement and feedback - **chepe**
- [x] make handcrafted map - **chepe**
	- [x] implement handcrafted map
- [x] implement map edge detection - **chepe**
- [x] implement block types - **chepe**
	- [x] path, exit, enter, dead-end
- [x] add inventory - **chepe**
	- [x] html and css
	- [x] layout grid
- [x] craft encounter logic - **chepe**
	- [x] populate map with encounters
	- [x] trigger encounter upon arrival
		- [x] prevent further movement
		- [x] update encounter box
