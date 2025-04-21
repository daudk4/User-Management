const express = require('express')
const userModel = require('./usermodel')

//initialize server
const server = express()


//routes
server.get('/', (req, res) => {
    res.send('Connected!')
})

//create user document in db
server.get('/create', async (req, res) => {
    const createdUser = await userModel.create({
        username: "imgroot",
        name: "Parsa Sheikh",
        email: 'parsasheikh@gmail.com',
        contact: 123345678911,
    })
    res.send(createdUser)
})

//update user document in db
server.get('/update', async (req, res) => {
    const updatedUser = await userModel.findOneAndUpdate(
        { name: 'Parsa Sheikh' }, { name: 'Daud Ali Khan' }, { new: true }) //return the updated user info if new: true. else return the previous user info
    res.send(updatedUser)
})

//read user model in db
server.get('/read', async (req, res) => {
    const users = await userModel.find() //return array of all users (documents)
    const user = await userModel.findOne({ username: 'daudk4' }) //return object of the first user who have a username: daud
    res.send(users)
})

//delete user document in db
server.get('/delete', async (req, res) => {
    const deletedUser = await userModel.findOneAndDelete({ username: 'imgroot' })
    res.send(deletedUser)
})

//listening
server.listen('3000', () => {
    console.log('listening...');
})