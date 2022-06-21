const express = require('express')
const connectDB = require('./config/db')
const app = express()


connectDB();

// Init Middleware
app.use(express.json({extended: false}));


app.use(express.json({extended:false}));

// Define Routes
app.use('/api/user',require('./routes/api/user'))
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/posts',require('./routes/api/posts'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/employee',require('./routes/api/employee'))


//serve static assets to production
if(process.env.NODE_ENV='production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))
