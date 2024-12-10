# laytout

- `encounters.json`
	- encounters layout:
		- title
		- character name
		- dialogue
		- responses
			- good, bad, neutral
		- consequences
			- good, bad, neutral
				- stat.health, stat.cash

- city templates:
	- `main.html`
	- `downtown.html`
	- `uptown.html`
	- `sketchy.hmtl`

- `exploration.js`
	- purpose: core logic of the game

## backend

- `maze_generator.py`
	- output maze file

- `map_builder.py`
	- read/get maze data
	- add transformations
	- add background
	- add images
	- add encounters
	- output map file ?

## tools

- `encounter_builder`
	- purpose to streamline the encounter management
	- CRUD
