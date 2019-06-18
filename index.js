console.log ('182 Main St. You are standing on Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle. On the door is a handwritten sign.')
const readline = require('readline');
//var roomNumber = ('roomOne', 'roomTwo', 'roomThree');
const readlineInterface = readline.createInterface( 
{
  input : process.stdin,
  output : process.stdout
});

var rooms = {
  'outside': {canChangeTo: ['foyer']},
  'foyer': {canChangeTo: [ 'stairway']},
  'stairway': {canChangeTo: ['hallway']},
  'hallway': {canChangeTo: ['classroom']},
  'classroom': {canChangeTo: ['hallway']},
  'stairway': {canChangeTo: ['foyer']},
  'foyer': {canChangeTo: ['outside']}
};

let currentState = "outside";

function enterState(newState) {
  let validTransitions = rooms[currentState].canChangeTo;
  if (validTransitions.includes(room)) {
    currentState = newState;
  } else {
    throw 'Invalid state transition attempted - from ' + currentState + ' to ' + newState;
  }
}

readlineInterface.setPrompt('>_');
readlineInterface.prompt();
readlineInterface.on('line', function(answer)

{
start();

async function start() {

  //const userPrompt = `\n>_`;
 // let userAnswerLC = userAnswer.toLowerCase(); 
  if (answer === 'gargle') {
    console.log("Sorry, I don't know how to gargle.");
  } 
  else if (answer === 'read sign') {
    console.log(
      `The sign says "Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code 12345."`);
      //return userPrompt  
  } 
    else if (answer == 'take sign') {
      console.log ('Leave the sign alone, moron.')
    }
  else if (answer === 'enter code 12345')
    {console.log('Success! The door opens. You enter the foyer and the door shuts behind you');
}
  
  else { 
    console.log("Sorry, I don't understand that.");
    
   // process.exit();
  }
}
 readlineInterface.prompt();
})

