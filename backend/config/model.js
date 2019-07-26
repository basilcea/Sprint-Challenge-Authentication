const db = require('../database/dbConfig')
const insertUser = async (data) => {
   const [id] = await db('users').insert(data)
   return getUser(id)
}
const getUser = async(id) => {
return await db('users').where('id', id)
}

const getUserByUsername = async(username) => {
    return await db('users').where('username',username).first()
   
}
const getAll = async() => {
    return await db('users')
}
module.exports ={
    insertUser , getUser , getUserByUsername, getAll
}