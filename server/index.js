const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./router/user');

const app = express();

app.use(bodyParser.json());
app.use('/user', userRouter);

app.listen(9090, function() {
  console.log('server success start at port 9090');
});
