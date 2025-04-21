const express = require('express')
const path = require('path')

const server = express()

server.set('view engine', 'ejs')
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, "public")))

server.get('/', (req, res) => {
    res.render('index')

})

server.get('/read', (req, res) => {
    res.render('read')
})


server.listen('3000', () => {
    console.log('listening...');
})