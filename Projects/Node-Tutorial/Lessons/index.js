const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// const { getElementById, seedElements } = require('./utils');

const expressions = [];
let contries={
  Japan:'Tokyo',
  'United Arab': 'Abu Ahbi',
  'United Kingdom': 'London',
  'United States': 'Washington',
  Vietnam: 'Hanoi'
};

const studentRouter = express.Router();
app.use(express.static('public'))
app.use('/students',studentRouter);
app.use(bodyParser.urlencoded({extended:false}))

var __dirname = path.resolve();
app.get('/form', (req, res, next)=>{
  console.log(req.body);
  res.sendFile(__dirname+'/public/form.html')
})

app.post('/userData', (req, res, next)=>{
  console.log(req.body);
  let username = req.body.userName
  let userPhn = req.body.userPhn
  let course = req.body.course;

  if(!username|| !userPhn || !course)
    res.status(400).send('The bad request with missing parameters.')
  res.send(`Your data: ${username}, ${userPhn}, ${course}`)
})

app.get('/', (req, res, next) => {
  res.send(contries);
});

app.get('/:country', (req, res, next) => {
  const capital = contries[req.params.country];
  res.send(capital);
});

studentRouter.get('/', (req, res, next)=>[
  res.send('Student page')
])

studentRouter.get('/:id', (req, res, next)=>[
  res.send('Student ID page')
])

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
