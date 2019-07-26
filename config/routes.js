const axios = require('axios');
const express = require('express');
const route = express.Router()
const { authenticate } = require('../auth/authenticate');
const Users = require('./model')
const crypt = require('../auth/encrypt')



const status = (res , code , data) => {
return res.status(code).json(data)
}
const register = async(req, res) =>{
  // implement user registration
  const {username , password} = req.body
  try{
    console.log(username ,password)
    const checkUserNameExists = await Users.getUserByUsername(username)
    console.log(!checkUserNameExists)
    if(!checkUserNameExists){
      return status(res , 400 , 'Username already exists')
    }
    const hashed = crypt.hashPassword(password) 
    const addUser = Users.insertUser({username , password:hashed})
    return status(res, 201, addUser)
  }catch(err){
    return status(res , 500 , err.toString())
  }
  
}

const login= async(req, res) =>{
  const {username , password} = req.body
  try{
    const getUser = await Users.getUserByUsername(username);
    if (!getUser) {
      return status(res, 404, "Username does not exist");
    }
    if (!crypted.comparePassword(password, getUser.password)) {
      return status(res, 404, "Wrong Password");
    }
    token = crypt.generateToken(getUser)
    return status(res , 200 , `Welcome ${getUser.username}, token:${token}`)

  }catch(err){
    return status(res, 500, "Cannot Login");
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


route.post('/api/register', register);
route.post('/api/login', login);
route.get('/api/jokes', authenticate, getJokes);

module.exports = route