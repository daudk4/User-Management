const express = require('express')
const path = require('path')
const userModel = require('./models/user')

const server = express()

server.set('view engine', 'ejs')
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, "public")))

server.get('/', (req, res) => {
    res.render('index')

})

server.get('/read', async (req, res) => {
    const users = await userModel.find()
    res.render('read', { users: users })
})

server.post('/create', async (req, res) => {
    const { name, email, url } = req.body
    const createdUser = await userModel.create({
        name,
        email,
        url
    })
    res.redirect('/read')
})

server.listen('3000', () => {
    console.log('listening...');
})