const express = require("express")//express module imported
const path=require('path');
const app=express();//created app
const bodyparser=require("body-parser")
const port =3000;

//
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/danceContact');
}
//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    Phone: String,
    Email: String,
    desc: String
});

const contact = mongoose.model('contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))//serving  static file---ie file can be used by anyone anytime without permission or login
app.use(express.urlencoded())//middleware to get the data to the express

//PUG SPECIFIC STUFF
app.set('view engine', 'pug')//set the tempelate engine as pug
app.set('views', path.join(__dirname, 'views') )//set the views directoy

//ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params)
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params)
})

app.post('/contact', (req, res) =>{
    var myData= new contact(req.body);
    myData.save().then(()=>{
        res.send("this data has been saved to the database")
    })
    .catch(()=>{
        res.status(400).send("data has not been saved to the databade")
    })
   //res.status(200).render('contact.pug')
})

//START THE SERVER
app.listen(port, ()=>{ //to listen the response to the request
    console.log(`the app started successfuly on port ${port}`)
})