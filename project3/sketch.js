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

/* Barrels 
   array filled with objects that have values
*/
let barrels = [
   { x: 325, y: 300, hp: 20, broken: 0 },
   { x: 700, y: 200, hp: 20, broken: 0 },
   { x: 770, y: 245, hp: 20, broken: 0 }
];

let bg;

//walk timer for good animation
let wTime = 0;

//Jack sprites:
let jackStandR;
let jackStandL;
let jackWalkR1;
let jackWalkR2;
let jackWalkR3;
let jackWalkR4;
let jackWalkL1;
let jackWalkL2;
let jackWalkL3;
let jackWalkL4;
let jackPunchL1;
let jackPunchL2;
let jackPunchL3;
let jackPunchR1;
let jackPunchR2;
let jackPunchR3;

//Hunter sprites:
let hStandR;
let hStandL;
let hWalkR1;
let hWalkR2;
let hWalkR3;
let hWalkR4;
let hWalkL1;
let hWalkL2;
let hWalkL3;
let hWalkL4;
let hPunchL1;
let hPunchL2;
let hPunchL3;
let hPunchR1;
let hPunchR2;
let hPunchR3;

/**
 * setup :
 */
function setup() {
   let cnv = createCanvas(1300, 550);
   cnv.parent('canvas-container');
   rectMode(CENTER);
   imageMode(CENTER);
   frameRate(30);

}

function preload() {
   bg = loadImage('bg.png');
   jackStandR = loadImage('JackStandR.png');
   jackStandL = loadImage('JackStandL.png');
   jackWalkR1 = loadImage('JackWalkR1.png');
   jackWalkR2 = loadImage('JackWalkR2.png');
   jackWalkR3 = loadImage('JackWalkR3.png');
   jackWalkR4 = loadImage('JackWalkR4.png');
   jackWalkL1 = loadImage('JackWalkL1.png');
   jackWalkL2 = loadImage('JackWalkL2.png');   
   jackWalkL3 = loadImage('JackWalkL3.png');
   jackWalkL4 = loadImage('JackWalkL4.png');

   jackPunchL1 = loadImage('JackLP1.png');
   jackPunchL2 = loadImage('JackLP2.png');
   jackPunchL3 = loadImage('JackLP3.png');
   jackPunchR1 = loadImage('JackRP1.png');
   jackPunchR2 = loadImage('JackRP2.png');
   jackPunchR3 = loadImage('JackRP3.png');

   hStandR = loadImage('HStandR.png');
   hStandL = loadImage('HStandL.png');
   hWalkR1 = loadImage('HWalkR1.png');
   hWalkR2 = loadImage('HWalkR2.png');
   hWalkL1 = loadImage('HWalk1.png');
   hWalkL2 = loadImage('HWalkL2.png');
   hPunchL1 = loadImage('HPL1.png');
   hPunchL2 = loadImage('HPL2.png');
   hPunchL3 = loadImage('HPL3.png');
   hPunchR1 = loadImage('HPR1.png');
   hPunchR2 = loadImage('HPR2.png');
   hPunchR3 = loadImage('HPR3.png');

}

/**
 * draw :
 */
function draw() {
   noStroke();
   if (player.atkTime > 0) {
      player.atkTime--;
   }
   if (player.comboTime > 0) {
      player.comboTime--;
   }
   if (player.comboTime === 0) { player.attackCount = 0; }
   if (wTime > 0) { wTime--; }
   else if (wTime == 0) { wTime = 3; }


   //character specific stats:
   switch (player.name) {
      case 'Jack':
         player.speed = 10;
         player.dmg = 5;
         player.maxCombo = 4;
         break;

      case 'Hunter':
         player.speed = 13;
         player.dmg = 3.34;
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
   image(bg, width / 2, height / 2, width, height);


   walkin();
   barrels.forEach(barrel => {
      barrelDisplay(barrel);
      barrelRestore(barrel);

   });
   playDisplay();


}

//walk cycle
function walkCyc() {

if(player.name == 'Jack'){
      if (player.atkTime > 0) {
      if (player.face == 'right') {
         switch (player.attackCount) {
            case 1:
               image(jackPunchR1, player.x, player.y, 100, 200);
               break;
            case 2:
               image(jackPunchR1, player.x, player.y, 100, 200);
               break;
            case 3:
               image(jackPunchR2, player.x, player.y, 100, 200);
               break;
            case 4:
               image(jackPunchR3, player.x, player.y, 100, 200);
               break;
         }

         return;
      }
      else if (player.face == 'left') {
         switch (player.attackCount) {
            case 1:
               image(jackPunchL1, player.x, player.y, 100, 200);
               break;
            case 2:
               image(jackPunchL1, player.x, player.y, 100, 200);
               break;
            case 3:
               image(jackPunchL2, player.x, player.y, 100, 200);
               break;
            case 4:
               image(jackPunchL3, player.x, player.y, 100, 200);
               break;
         }         return;
      }

   }
   else {
      switch (player.step) {
         case 0:
            if (wTime == 0) { player.step++; }
            break;
         case 1:
            if (wTime == 0) { player.step++; }
            break;
         case 2:
            if (wTime == 0) { player.step++; }
            break;
         case 3:
            if (wTime == 0) { player.step++; }
            break;
         case 4:
            if (wTime == 0) { player.step = 1; }
            break;
      }

      if (keyIsDown(68)) {
         switch (player.step) {
            case 1:
               image(jackWalkR1, player.x, player.y, 100, 200);
               break;
            case 2:
               image(jackWalkR2, player.x, player.y, 100, 200);
               break;
            case 3:
               image(jackWalkR3, player.x, player.y, 100, 200);
               break;
            case 4:
               image(jackWalkR4, player.x, player.y, 100, 200);
               break;



         }
      }
      else if (keyIsDown(65)) {
         switch (player.step) {
            case 1:
               image(jackWalkL1, player.x, player.y, 100, 200);
               break;
            case 2:
               image(jackWalkL2, player.x, player.y, 100, 200);
               break;
            case 3:
               image(jackWalkL3, player.x, player.y, 100, 200);
               break;
            case 4:
               image(jackWalkL4, player.x, player.y, 100, 200);
               break;

         }
      }
      else if (keyIsDown(87) || keyIsDown(83)) {
         if (player.face == 'right') {
            switch (player.step) {
               case 1:
                  image(jackWalkR1, player.x, player.y, 100, 200);
                  break;
               case 2:
                  image(jackWalkR2, player.x, player.y, 100, 200);
                  break;
               case 3:
                  image(jackWalkR3, player.x, player.y, 100, 200);
                  break;
               case 4:
                  image(jackWalkR4, player.x, player.y, 100, 200);
                  break;



            }
         }
         if (player.face == 'left') {
            switch (player.step) {
               case 1:
                  image(jackWalkL1, player.x, player.y, 100, 200);
                  break;
               case 2:
                  image(jackWalkL2, player.x, player.y, 100, 200);
                  break;
               case 3:
                  image(jackWalkL3, player.x, player.y, 100, 200);
                  break;
               case 4:
                  image(jackWalkL4, player.x, player.y, 100, 200);
                  break;



            }
         }

      }
      else {
         if (player.face == 'right') { image(jackStandR, player.x, player.y, 100, 200); }
         if (player.face == 'left') { image(jackStandL, player.x, player.y, 100, 200); }

      }

   }

}





}

//walking controls
function walkin() {
   let moving = false;

   if (keyIsDown(65) && player.x > 50) {
      player.x -= player.speed;
      moving = true;
      player.face = 'left';
   }

   if (keyIsDown(68) && player.x < width - 50) {
      player.x += player.speed;
      moving = true;
      player.face = 'right';
   }

   if (keyIsDown(87) && player.y > 100) {
      player.y -= player.speed / 2;
      moving = true;
   }

   if (keyIsDown(83) && player.y < 450) {
      player.y += player.speed / 2;
      moving = true;
   }

   // manage speed
   if (player.atkTime > 0 || !moving) {
      player.speed = 0;
   }
}

//display function
function playDisplay() {
   walkCyc();

   barrels.forEach(barrel => {
      if (player.y + 50 < barrel.y + 25) {
         barrelDisplay(barrel);
      }
   });


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

   barrelHit();
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

function barrelDisplay(thing) {
   if (thing.hp > 10) {
      fill("orange");
   }
   else if (thing.hp > .1) {
      fill('red');
   }
   else {
      noFill();
   }
   rect(thing.x, thing.y, 100, 150);
}

//function to recharge barrels
function barrelRestore(thing) {
   if (thing.hp <= 0) {
      thing.broken = 45;
   }

   //check if recharging
   if (thing.broken > 1) {
      thing.hp = .1;
      thing.broken--;
   }
   else if (thing.broken == 1) {
      thing.hp = 20;
      barrelDisplay(thing);
      thing.broken--;
   }
}

// function to catch if an attack hits a barrel
function barrelHit() {
   barrels.forEach(barrel => {
      if (player.face == 'right') {
         if (
            player.x + 65 < barrel.x + 50 && player.x + 65 > barrel.x - 50
            && player.y < barrel.y + 75 && player.y > barrel.y - 75
         ) {
            barrel.hp -= player.dmg;
         }
      }
      if (player.face == 'left') {
         if (
            player.x - 65 < barrel.x + 50 && player.x - 65 > barrel.x - 50
            && player.y < barrel.y + 75 && player.y > barrel.y - 75
         ) {
            barrel.hp -= player.dmg;
         }
      }

   });

}

