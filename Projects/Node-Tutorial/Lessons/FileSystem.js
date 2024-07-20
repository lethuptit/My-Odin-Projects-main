const fs = require('fs');

let secretWord = 'cheeseburgerpizzabagels';

let readDataCallback = (err, data) => {
  if (err) {
    console.log(`Something went wrong: ${err}`);
  } else {
    console.log(`Provided file contained: ${data}`);
    //secretWord = 
  }
};
//fs.readFile('./finalFile.txt', 'utf-8', readDataCallback);

fs.appendFile('writeFile1.txt', secretWord,(err)=>{
  if(err)
    console.log(`Something went wrong: ${err}`);
  
  else {
    console.log(`File written successfully`);
  }
});