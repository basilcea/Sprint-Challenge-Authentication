const db = require('../database/dbConfig')
const insertUser = async (data) => {
   const [id] = await db('users').insert(data)
   return getUser(id)
}
const getUser = async(id) => {
return await db('users').where('id', id)
}
module.exports ={
    insertUser , getUser
}