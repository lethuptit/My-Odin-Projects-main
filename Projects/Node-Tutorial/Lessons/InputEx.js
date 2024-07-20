let {testNumber} = require('./game.js');

// process.stdout.write("I'm thinking of a number from 1 through 10. What do you think it is? \n(Write \"quit\" to give up.)\n\nIs the number ... ");


// let playGame = (userInput, test) => {
//   console.log(test)
//   let input = userInput.toString().trim();
//   testNumber(input);

// };

//process.stdin.on('data', playGame);

let infoInstructions=['Enter your name: ','Enter your age: '];
let inforValues=[]
let idx=0;

let getInfo = (userInput) => {
   
  inforValues[idx] = userInput.toString().trim();
  idx++;
  if(idx===2)
    process.exit();
  process.stdout.write(infoInstructions[idx])
};


console.log('Testing the testNumber function')
process.stdout.write('Enter your name ... \n')
process.stdin.on('data', getInfo);
