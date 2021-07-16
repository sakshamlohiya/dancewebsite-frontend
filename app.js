const express = require('express');
const path = require('path');
const fs = require('fs');
const Bodyparser = require('body-parser')
const app = express();
port = 80;
//mongoose
const mongoose = require('mongoose');
const url = 'mongodb+srv://contact-dance:contactdance@cluster1204.zqvyk.mongodb.net/contact-dance?retryWrites=true&w=majority';
var db = mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true }, (err) =>{
    if(!err){
        console.log('Connected');

    }else{
        console.log('error'+err);
    }
})

//mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    Email: String,
    phone: String,
    Address: String,
    Desc: String,


  });

var Contact = mongoose.model('Kitten', contactSchema);
// EXPRESS SPECIFIC STUFF 
app.use('/static',express.static('static'))
app.use(express.urlencoded({
    extended:true
}))

// PUG SPECIFIC STUFF 
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

// ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=> {
        // res.send('This itemhas been saved')
        res.status(200).render('contact.pug');

    }).catch(()=>{
        res.status(400).send('Item is not saved')
    });
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});