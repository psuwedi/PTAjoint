const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");


const users = require('./routes/api/users');
const posts = require('./routes/api/posts');


const app = express();


//Bodyparser middleware

app.use(bodyParser.json());
app.use(cors());


//DB config

const db = require('./config/keys').mongoURI;

//Connect to mongoDB

mongoose
  .connect(db, { useNewUrlParser: true })
  .then( () => console.log('MongoDB connected!'))
  .catch( (err) => console.log(err)    
  );

  //Use routes
  app.use('/api/users', users);
  app.use('/api/posts', posts);

  const port = process.env.PORT || 5000;

  app.listen(port, () => console.log(`Server started on port ${port}`));