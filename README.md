# FEND-Arcade-Game

This is an animated game based on the Frogger concept. The aim is to cross the board avoiding the enemy bugs in your path.

## Table of Contents

* [Installation](#installation)
* [Source](#Source)
* [Collisions](#Collisions)
* [Known Bugs](#Bugs)
* [Play Now!](#Play)

## Installation

Clone the GitHub repository.

`$ git clone https://github.com/DMcKenzie205/FEND-Arcade-Game
$ cd FEND-Arcade-game`

## Source

This project is done as part of the Udacity Front-End NanoDegree (FEND). The code is based on a basic structure provided by Udacity. The original Source files can be found at https://github.com/udacity/frontend-nanodegree-arcade-game

## Collisions

The Collision code was build using code from https://gamedev.stackexchange.com/a/587 as the basis. Initiallly the collision code was build in to a single JS file along with the CanvasEntity, Player and Enemy classes.  This created a large and difficult to follow file. The decision was taken to split the class/subclasses in to separate files and have the collision code within the main class file.

The advantage of this approach is that the game can, in the future, add any kind of player or enemy class and utilise the same code with minimum effort. It also allows for the addition of objects and obstacles to the game without a major code rewrite/addition.

## Bugs

The code that generates the enemy sprites is not sufficiently random and 75% of sprites are usually on the same line. Randomisation to be improved.

The enemy sprites overrun each other when of varying speeds. Enemy.js collision code to be added that detects collision between enemies and slow down the colliding enemy sprite.

## Play

The game can be played at https://dmckenzie205.github.io/FEND-Arcade-Game/