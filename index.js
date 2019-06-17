const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// remember the StateMachine lecture
// https://bootcamp.burlingtoncodeacademy.com/lessons/cs/state-machines

let states = {
  'outside':   { canChangeTo: [ 'foyer' ]    },
  'foyer':     { canChangeTo: [ 'stairway' ] },
  'stairway':  { canChangeTo: [ 'hallway']   },
  'hallway':   { canChangeTo: [ 'classroom'] },
  'classroom': { canChangeTo: [ 'hallway']   },
  'stairway':  { canChangeTo: [ 'foyer' ]    },
  'foyer':     { canChangeTo: [ 'outside' ]  }
};

let currentState = "green";

function enterState(newState) {
  let validTransitions = states[currentState].canChangeTo;
  if (validTransitions.includes(newState)) {
    currentState = newState;
  } else {
    throw 'Invalid state transition attempted - from ' + currentState + ' to ' + newState;
  }
}

start();

async function start() {
  const welcomeMessage = `
182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
  const userPrompt = `\n>_`;
  let userAnswer = await ask(welcomeMessage + userPrompt);
  let userAnswerLC = userAnswer.toLowerCase(); 
  if (userAnswerLC == 'gargle') {
    console.log("Sorry, I don't know how to gargle.");
  } else if (userAnswer.toLowerCase == 'read sign') {
    console.log(
      `The sign says "Welcome to Burlington Code Academy! Come on up to
      the third floor. If the door is locked, use the code 12345."`);
      return userPrompt  
  } else { 
    console.log("Sorry, I don't understand that.");
    process.exit();
  }
  
}
