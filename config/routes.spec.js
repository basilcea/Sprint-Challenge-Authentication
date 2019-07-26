const db = require('../database/dbConfig');
const Users = require('./model');
const request = require('supertest');
const server = require('../api/server')

describe('[Post] /api/register', () => {
    it('fail if no credentails' ,() => {
        return request(server)
        .post('/api/register')
        .send({})
        .then(res => {
            expect(res.status).toEqual(500)
        })
    })
    it('should register if credential are correct', () => {
        return request(server)
        .post('/api/register')
        .send({username:'Winker' ,password:'14567'})
        .then(res =>{
            console.log(res.body)
            expect(res.status).toEqual(201)
        })
    })
    it('fail if username already exists', ()=> {
        return request(server)
        .post('/api/register')
        .send({username:'Winker', password:'12345'})
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.status).toEqual(400)
            expect(res.body).toBe('Username already exists')
          });
    });
})