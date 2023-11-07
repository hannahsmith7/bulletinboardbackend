const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express()
app.use(helmet())
app.use(morgan('combined'))

const urlprefix = '/api'

const mongoose = require('mongoose')
const fs = require('fs');
const cert = fs.readFileSync('keys/certificate.pem');
const options = {
    server: { sslCA: cert }};
const connstring = 'mongodb+srv://hannah7smith2:RrguUF8kIRqzPqQZ@cluster0.7tenx9u.mongodb.net/?retryWrites=true&w=majority'

const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

mongoose.connect(connstring)
.then(()=>
{
    console.log('Connected :-)')
})
.catch(()=>
{
    console.log('NOT connected :-(')
},options);

app.use(express.json())

app.use((reg,res,next)=>
{
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
 res.setHeader('Access-Control-Allow-Methods', '*');
 next();
});

app.get(urlprefix+'/', (req, res) => {
    res.send('Hello World')
})

app.use(urlprefix+'/bulletinpost', postRoutes)
app.use(urlprefix+'/users', userRoutes)

module.exports = app;




