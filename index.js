require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();




app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());


app.get('/', (req,res)=>{
    res.json({message:'oi express!'});
});

const personRoutes = require('./routers/personRoutes')

app.use('/person', personRoutes)

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.gql1h.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
.then(()=>{
    console.log("Conectamos ao MongoDB!")
    app.listen(3000);
}).catch((err)=>{console.log(err)});




