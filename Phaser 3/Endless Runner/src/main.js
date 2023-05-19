// Zehao Dong
"use strict";

var config = {
    parent: 'phaser-game',  // for info text
    type: Phaser.WEBGL,
    width: 480,
    height: 960,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    input: {
        gamepad: true       // let's use gamepads
    },
    scene: [ Play ]
};

// 🌎
let game = new Phaser.Game(config);

let debugText;

const centerX = game.config.width / 2;
const centerY = game.config.height / 2;

let scrollSpeed = 0;
const maxScrollSpeed = 48;
const maxCarVelocity = 250;
const carAcceleration = 750;

let score = 0;