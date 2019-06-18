/* Denis Poirier - Proj 2 with Aaron - Zork/Zorkington */

const readline = require('readline');
//var roomNumber = ('roomOne', 'roomTwo', 'roomThree');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// remember the StateMachine lecture
// https://bootcamp.burlingtoncodeacademy.com/lessons/cs/state-machines

let rooms = {     // was given in starter code 
  'outside':   { 
    canMoveTo: [ 'foyer' ],    
    roomMessage: `182 Main St.
  You are standing on Main Street between Church and South Winooski.
  There is a door here. A keypad sits on the handle.
  On the door is a handwritten sign.`, 
    signMsg: `The sign says "Welcome to Burlington Code Academy! Come on up to
    the third floor. If the door is locked, use the code 12345."`, 
    exitKey: `12345` },
  'foyer':     {
    canMoveTo: [ `stairway` ] ,
    roomMessage: `You are in foyer`,
    signMsg: `This sign says nothing.`,                           
    exitKey: `exit1` },
  'stairway':  {
    canMoveTo: [ `hallway` ],   
    roomMessage: `You are in stairway`,
    signMsg: `This sign says nothing.`,                           
    exitKey: `exit2` },
  'hallway':   {
    canMoveTo: [ 'classroom' ], 
    roomMessage: `You are in hallway`,
    signMsg: `This sign says nothing.`,                           
    exitKey: `exit3` },
  'classroom': {
    canMoveTo: [ 'hallway' ],   
    roomMessage: `You are in classroom!`,
    signMsg: `This sign says "classroom".`,                       
    exitKey: `exit4` }
};
let currentRoom = "outside";

var player = {
  currentState: currentRoom, 
  inventory: []
}

function enterRoom(newRoom) {
  let validTransitions = rooms[currentRoom].canMoveTo;
  if (validTransitions.includes(newRoom)) {
    currentRoom = newRoom;
  } else {
    throw 'Invalid room transition attempted - from ' + currentRoom + ' to ' + newRoom;
  }

start();

async function start() {

  const userPrompt = `\n>_`;
  let userAnswer = await ask(rooms[currentRoom].roomMessage + userPrompt);
  let userAnswerLC = userAnswer.toLowerCase(); 
  while (userAnswerLC != 'exit') { 
    if ((userAnswerLC == 'gargle') && (room[currentRoom] == 'outside')) {
      console.log(`Sorry, I don't know how to ` + userAnswerLC + `.` + userPrompt);
    } else if (userAnswerLC == 'read sign') {
      console.log(signMsg + userPrompt);    
    } else if (userAnswerLC == this.exitKey) {
        enterRoom();
      // return;  
    } else if (userAnswerLC == 'exit') { 
      console.log("Thanks for playing.");
      process.exit();
    } 
    userAnswer = await ask(this.roomMessage + userPrompt); // keeps on asking
    userAnswerLC = userAnswer.toLowerCase(); // keeps lowercasing the answer 
  }
}  // end of main pgm

// functions should be last?

  console.log(rooms[currentRoom].welcomeMessage);
  //const userPrompt = `\n>_`;
 // let userAnswerLC = userAnswer.toLowerCase(); 
  let answer = await ask('_>');
  while(answer !== 'exit') {
  if (answer == 'read sign') {
    console.log(`The sign says "Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code 12345."`);
      //return userPrompt  
    
    }
    else if(currentRoom == 'foyer' || answer == 'take seven days')
    {
      console.log ('You have taken the seven days');
      player.inventory.push('seven days')
    }
    else if (answer == 'take sign') {
      console.log ('Leave the sign alone, moron.')
    }
    
  else if (answer === 'enter code 12345')
    {
      console.log('Success! The door opens. You enter the foyer and the door shuts behind you');
      enterState('foyer');
      console.log(rooms[currentState].welcomeMessage);
    }
    else if (answer ==='open door')
    {
      console.log ('Door is locked!');
    }
  
  else { 
    console.log("Sorry, I don't understand that.");
   // process.exit();
  }
  answer = await ask('_>');
  }
}
