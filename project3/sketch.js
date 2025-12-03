/**
 * Adam Goltsman, m/d/25
 * IGME-102: Assignment Name
 * Description and interaction instructions
 */

"use strict"; //catch some common coding errors

/* Player Data */
let player = {
   y: 275, // y coord
   x: 70, // x coord
   face: 'right', // direction player faces
   speed: 4, // movement speed
   dmg: 5, // damage
   maxCombo: 4, // max attack length
   canAttack: true, // if the player can attack
   attackCount: 0, // what # attack has been done in a combo
   name: 'Jack', // selected character
   step: 0, // what step of the walk cycle the player is in
   atkTime: 0, // time left in the attack
   comboTime: 0 // time left until the combo drops
}


/**
 * setup :
 */
function setup() {
   let cnv = createCanvas(1300, 550);
   cnv.parent('canvas-container');
   rectMode(CENTER);
   frameRate(30);

}

/**
 * draw :
 */
function draw() {
   if (player.atkTime > 0) {
      player.atkTime--;
   }
   if (player.comboTime > 0) {
      player.comboTime--;
   }
   if (player.comboTime === 0) { player.attackCount = 0; }


   //character specific stats:
   switch (player.name) {
      case 'Jack':
         player.speed = 10;
         player.dmg = 5;
         player.maxCombo = 4;
         break;

      case 'Hunter':
         player.speed = 20;
         player.dmg = 3.33;
         player.maxCombo = 6;
         break;

      case 'Nate':
         player.speed = 7;
         player.dmg = 10;
         player.maxCombo = 3;
         break;


   }

   //name card control
   switch (player.name) {
      case 'Jack':
         document.querySelector('#protag').textContent = 'JACK';
         break;
      case 'Hunter':
         document.querySelector('#protag').textContent = 'HUNTER';
         break;
      case 'Nate':
         document.querySelector('#protag').textContent = 'NATE';
         break;

   }


   atkCheck();

   background("green");

   walkin();
   playDisplay();



}

//walk cycle
function walkCyc() {
   switch (player.step) {
      case 0:
         player.step++;
         break;
      case 1:
         player.step++;
         break;
      case 2:
         player.step++;
         break;
      case 3:
         player.step++;
         break;
      case 4:
         player.step++;
         break;
      case 5:
         player.step++;
         break;
      case 6:
         player.step = 1;
         break;
   }
}

//walking controls
function walkin() {
   let moving = false;

   if (keyIsDown(65)) {
      if (player.x > 50) {
         player.x -= player.speed;
         moving = true;
         walkCyc();
         player.face = 'left';
      }
   }

   if (keyIsDown(68)) {
      if (player.x < width - 50) {
         player.x += player.speed;
         moving = true;
         walkCyc();
         player.face = 'right';

      }
   }

   if (keyIsDown(87)) {
      if (player.y > 100) {
         player.y -= player.speed;
         walkCyc();
         moving = true;

      }
   }

   if (keyIsDown(83)) {
      if (player.y < 450) {
         player.y += player.speed;
         walkCyc();
         moving = true;

      }
   }

   if (player.atkTime > 0) { player.speed = 0; }
   if (!moving) { player.speed = 0; }

}

//display function
function playDisplay() {
   if (player.face == 'right') { fill('blue'); }
   if (player.face == 'left') { fill('purple'); }
   stroke(0);
   rect(player.x, player.y, 100, 200);

   if (player.atkTime > 0) { fill("red"); }
   else { fill(0, 0, 0, 0); }
   noStroke();

   if (player.face == 'right') {
      rect(player.x + 50, player.y, 100, 200);
   }
   else if (player.face == 'left') {
      rect(player.x - 50, player.y, 100, 200);
   }

}

function attack() {
   atkCheck();
   //if statement that checks if space key is pressed
   if (player.canAttack && keyIsDown(32) && player.attackCount < player.maxCombo) {

      switch (player.name) {
         case 'Jack':
            player.atkTime = 5;
            player.comboTime = 15
            break;

         case 'Hunter':
            player.atkTime = 2;
            player.comboTime = 15;
            break;

         case 'Nate':
            player.atkTime = 10;
            player.comboTime = 25;
            break;


      }
      player.attackCount++;
   }
}

function keyPressed() {
   // spacebar => attack button
   if (keyCode == 32) {
      attack();
   }

   //Hotswap characters with enter key
   if (keyCode == 13) {
      switch (player.name) {
         case 'Jack':
            player.name = 'Hunter';
            break;
         case 'Hunter':
            player.name = 'Nate';
            break;
         case 'Nate':
            player.name = 'Jack';
            break;
      }
   }
}

function atkCheck() {
   if (player.atkTime > 0) {
      player.canAttack = false;
      player.speed = 0;
   }
   else {
      player.canAttack = true;

      switch (player.name) {
         case 'Jack':
            player.speed = 10;
            break;

         case 'Hunter':
            player.speed = 20;
            break;

         case 'Nate':
            player.speed = 7;
            break;


      }

   }
}

