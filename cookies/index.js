const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// middlewate that will act in our whole app. It Allows to parse any cookie
app.use(cookieParser());

app.get('/', (req, res) => {
  console.log(req.cookies)
  // we add our own cookie
  let existingCookie = req.cookies['remote-cookie']

  // if we do have this cookie, we will show that message
  if(existingCookie) {
    res.cookie('remote-cookie', 'true').send('<h1>Good to see you again friend!</h1>')
  } else {
    // if we do not have it, we show that other one instead
    res.cookie('remote-cookie', 'false').send('<h1>Hello stranger!</h1>')
  }


})

app.listen(5000, () => {
  console.log('app works at port 5000')
})