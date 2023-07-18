const express = require('express')
const mongoose = require('mongoose')
const Activity = require('./models/activity.js')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('connected to mongodb');
    app.listen(3000, ()=>{
        console.log('Server is running on port 3000');
    })
    
})
.catch((error)=>{
    console.log('error connecting to mongodb');
})

//routes
app.get('/', (req, res)=> {
    res.send('Hello there server')
})

app.get('/activities', async(req, res)=> {
    try {
        const activities = await Activity.find({}).toArray()
        res.status(200).json(activities)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.get('/activities/:id', async(req, res)=> {
    try {
        const {id} = req.params
        const activity = await Activity.findById(id)
        res.status(200).json(activity)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/activities', async(req, res)=> {
    try {
        const activity = await Activity.create(req.body);
        res.status(200).json(activity)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.put('/activities/:id', async(req, res)=> {
    try {
        const {id} = req.params;
        const activity = await Activity.findByIdAndUpdate(id, req.body)
        //cannot find the activity in the database
        if(!activity){
            res.status(404).json({message: `cannot find the activity with ID = ${id}`})
        }
        const updatedActivity = await Activity.findById(id)
        res.status(200).json(updatedActivity)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/activities/:id', async(req, res)=> {
    try {
        const {id} = req.params;
        const activity = await Activity.findByIdAndDelete(id);
        if(!activity){
            return res.status(404).json({message: `cannot find activity with ID ${id}`})
        }
        res.status(200).json(activity)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
