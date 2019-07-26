const axios = require('axios');

const { authenticate } = require('../auth/authenticate');
const Users = require('./model')
const crypt = require('../auth/encrypt')

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

const status = (res , code , data) => {
return res.status(code).json(data)
}
const register = async(req, res) =>{
  // implement user registration
  const {username , password} = req.body
  try{
    const checkUserNameExists = await Users.getUserByUsername(username)
    if(!!checkUserNameExists){
      status(res , 404 , 'Username already exists')
    }
    const hashed = crypt.hashPassword(password) 
    const addUser = Users.insertUser({username , hashed})
    status(res, 201, addUser)
  }catch(err){
    status(res , 500 , 'Cannot Register User')
  }
  
}

function login(req, res) {
  const {username , password} = req.body
  try{
    const getUser = await Users.getUserByUsername(username);
    if (!getUser) {
      status(res, 404, "Username does not exist");
    }
    if (!crypted.comparePassword(password, getUser.password)) {
      status(res, 404, "Wrong Password");
    }
    req.session.user=crypt.generateToken(getUser)
    status(res , 200 , `Welcome ${getUser.username}`)

  }catch(err){
    status(res, 500, "Cannot Login");
  }
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
