const readline = require('readline');
const fs = require('fs');

function printData(data){
  console.log(`Item: ${data}`)
}

const myInterface = readline.createInterface({
  input: fs.createReadStream('shoppingList.txt')
});
const fileStream = fs.createWriteStream('shoppingResults.txt');
function transformData(line){
  fileStream.app(`They were out of: ${line}\n`)
}

myInterface.on('line', printData);
myInterface.on('line', transformData)