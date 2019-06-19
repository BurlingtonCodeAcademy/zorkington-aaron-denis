/* Denis Poirier - Proj 2 with Aaron - Zork/Zorkington */

const readline = require('readline');
//var roomNumber = ('roomOne', 'roomTwo', 'roomThree');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

let currentRoom = "outside";

var player = {
  currentState: currentRoom, 
  inventory: []
}

var rooms = {

  'outside': {canChangeTo: ['cheat', 'sign'],
            welcomeMessage: `182 Main St. You are standing on Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle. On the door is a handwritten sign.`
          },

  'cheat': {canChangeTo: ['sign', 'noCheat'],
              welcomeMessage: `You played this before, huh? Read the damn sign!`
            },
         
          
        'noCheat': {canChangeTo: ['sign'],
          welcomeMessage: `Okay. That's better.`
       },
        
        'sign': {canChangeTo: ['foyer'],
         welcomeMessage: `The sign says "Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code 12345."`
      },

  'foyer': {canChangeTo: ['stairway'],
              welcomeMessage: `You are in a foyer. Or maybe it's an antechamber. Or a 
              vestibule. Or an entryway. Or an atrium. Or a narthex.
              But let's forget all that fancy flatlander vocabulary,
              and just call it a foyer. In Vermont, this is pronounced
              "FO-ee-yurr".
              A copy of Seven Days lies in a corner.`
},
  'stairway': {canChangeTo: ['hallway']},
  'hallway': {canChangeTo: ['classroom']},
  'classroom': {canChangeTo: ['hallway']},
  'stairway': {canChangeTo: ['foyer']}
};



function enterState(newState) {
  let validTransitions = rooms[currentRoom].canChangeTo;
  if (validTransitions.includes(newState)) {
    currentRoom = newState;
  } else {
    throw 'Invalid state transition attempted - from ' + currentRoom + ' to ' + newState;
  }
}

start();

async function start() {
  console.log(rooms[currentRoom].welcomeMessage);
  //const userPrompt = `\n>_`;
 // let userAnswerLC = userAnswer.toLowerCase(); 
  let answer = await ask('_>');
  while(answer !== 'exit') {
  if (answer == 'read sign') {
    enterState('sign')
    console.log(rooms[currentRoom].welcomeMessage);
    }

    

    else if (answer == 'take sign') {
      console.log ('Leave the sign alone, moron.')
    }

    else if (answer =='open door')
    {
      console.log ('Door is locked. There is a keypad on the door handle.');
    }
    
     else if (answer == 'gargle')
     {console.log('I do not know how to gargle.');
  }

  else if (currentRoom == 'sign' && answer == 'enter code 12345' ||currentRoom == 'sign' && answer == 'key in 12345')
  {
    console.log('Success! The door opens. You enter the foyer and the door shuts behind you');
    enterState('foyer');
    console.log(rooms[currentRoom].welcomeMessage);
  }
  //else if (answer == 'enter code ' + 0-5) {
  //  console.log ('Nice guess...but try again.')
 // }
 else if (answer == 'enter code 12345'||answer == 'key in 12345')
    {
      enterState('cheat')
      console.log(rooms[currentRoom].welcomeMessage);
     // console.log('You played this before, huh? Read the damn sign!');
    }
   else if (answer.includes("enter code ") && !answer.includes("12345")){
      console.log("Good guess...but it was wrong. Try again.")
    }
    else if (currentRoom == 'foyer' && answer == 'take seven days')
    {
      console.log (`You pick up the paper and leaf through it looking for comics 
      and ignoring the articles, just like everybody else does.`);
      player.inventory.push('seven days')
    }
      else if (answer == ("drop seven days") && player.inventory.includes("seven days"))
      {
        console.log (`You very clearly have no respect for Mother Earth and casually 
        tossed the "Seven Days" to the ground.`);
        player.inventory.pop('seven days')
       }
    
 else { 
    console.log("Sorry, I don't understand that.");
   // process.exit();
  }
  
  answer = await ask('_>');
  }
}