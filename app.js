const express = require("express")//express module imported
const path=require('path');
const app=express();//created app
const port =3000;

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

//START THE SERVER
app.listen(port, ()=>{ //to listen the response to the request
    console.log(`the app started successfuly on port ${port}`)
})