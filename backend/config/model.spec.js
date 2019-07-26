const db = require('../database/dbConfig');
const Users = require('./model');

// test model


// take the database to initial state
beforeEach(async () => {
  await db('users').truncate();
});

describe('users.insertUser',()=>{
    it('should add users to db', async () => {
        //check if truncation works
        let allUsers = await Users.getAll()
        expect(allUsers).toHaveLength(0)
        await Users.insertUser({username:'basil', password:'12345'})
        allUsers = await Users.getAll()
        expect(allUsers).toHaveLength(1)
    })
    
})