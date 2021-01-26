require('dotenv').config()

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json())

const port = process.env.PORT || 5000

// DB simulation
const students = [
  {
    username: 'Marc',
    message: 'I hope it works'
  },
  {
    username: 'Teiko',
    message: 'I like css'
  },
  {
    username: 'Ioan',
    message: 'I do not like css'
  },
  {
    username: 'Victoria',
    message: 'I like postman'
  },
]



app.get('/', (req, res) => {
  res.send('jwt here we go')
})

// Middleware in charge of authenticate a user
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  console.log(authHeader)

  // get only the token
  const token = authHeader && authHeader.split(' ')[1]
  console.log(token)
  // check if we have a token, if not, send an error
  if (token === undefined) return res.sendStatus(401)
  // check if the token is valid, if not send an error, if valid, go to the next
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // not a valid token
    if(err) return res.sendStatus(403)
    // valid token
    console.log('verified', user)
    req.user = user;
    next();
  })
}

// at /message the user will see the message that is related to it's user name and only this one
app.get('/message', authenticateToken, (req, res) => {
  res.send(students.filter(text => text.username === req.body.username))
})

// post a user to /login to get a token back
app.post('/login', (req, res) => {
  const username = req.body.username
  console.log(username)
  const user = {
    username: username
  }
  // we will associate to that user a token with the .sign method from jwt package
  const generatedToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  // we will send it to the frontend
  res.status(200).json({accessToken: generatedToken})
})


app.listen(port, ()=> {
  console.log(`app works and runs at port ${port}`)
})