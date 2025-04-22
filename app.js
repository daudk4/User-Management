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

server.post('/create', async (req, res) => {
    const { name, email, url } = req.body;
    const isUrlProvided = Boolean(url)
    const defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s'
    const createdUser = await userModel.create({
        name,
        email,
        url: isUrlProvided ? url : defaultAvatar
    });
    res.redirect('/read');
})

server.get('/read', async (req, res) => {
    const users = await userModel.find()
    res.render('read', { users: users })
})

server.get('/edit/:userId', async (req, res) => {
    const { userId } = req.params;
    const user = await userModel.findOne({ _id: userId })
    res.render("edit", { user });
})

server.post('/update/:userId', async (req, res) => {
    const { userId } = req.params;
    const { name, email, url } = req.body

    const updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { name, email, url }, { new: true })
    res.redirect('/read');
})


server.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const deletedUser = await userModel.findOneAndDelete({ _id: id });
    res.redirect('/read')
})


server.listen('3000', () => {
    console.log('listening...');
})



//https://i.pinimg.com/736x/b7/6d/07/b76d075cb50a861bf5e662f1bc220421.jpg  Harvey Spectre harvey@example.com

//James Mcgill  jimmy@bettercallsaul.com  https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaJyFdHqUV7PcSwK1ybdYsEk_YWfATdDIizg&s

//Morgan Freeman  morgan@freeman.com  https://www.famousafricanamericans.org/images/morgan-freeman.jpg

//Crazy Monkey monkey@crazy.com   https://ih1.redbubble.net/image.4975405802.3310/st,small,507x507-pad,600x600,f8f8f8.jpg