const express = require('express');

const cors = require('cors')

const dataService = require('./services/dataService')

const server = express();
const mongoose = require('mongoose');

server.use(cors({
    origin:'http://localhost:4200'
    
}))

server.use(express.json())

server.listen(3000,()=>{
    console.log("server started at 3000")
})




// register api call 

server.post('/register',(req,res)=>{

    console.log("inside register funciton")
    console.log(req.body)
    dataService.register(req.body.name,req.body.email,req.body.pswd)
    .then((result)=>{

        res.status(result.statusCode).json(result)
    })

    

})



server.post('/login',(req,res)=>{

    console.log("inside register funciton")
    console.log(req.body)
    dataService.login(req.body.email,req.body.pswd)
    .then((result)=>{

        res.status(result.statusCode).json(result)
    })

    

})


// to view the lists 

// server.get('/viewlists:userId',(req,res)=>{
//     console.log("inside the get lists");
//     const {userId} =req.body;
//     dataService.viewList( userId)
//     .then((result)=>{
//         console.log(result)
//         res.send(result);
//     })
// })

server.get('/lists/:userId', (req, res) => {
    console.log("inside the get lists");
    const { userId } = req.params;
    dataService.viewList(userId)
      .then((result) => {
        console.log(result)
        res.send(result);
      })
  })
  




// to create a new list 

server.post('/createlist',(req,res)=>{
    console.log("inside the creatte list ");
    const { title, userId } = req.body;

    
      
    console.log(title);
    console.log(userId);
    dataService.createList(title,userId)
    .then((result)=>{
        res.status(result.statusCode).json(result);
    })
})


// to create a new task

server.post('/createtask',(req,res)=>{
    console.log("inside the creatte task ");
    const { title, listId } = req.body;

    
      
    console.log(title);
    console.log(listId);
    dataService.createTask(title,listId)
    .then((result)=>{
        res.status(result.statusCode).json(result);
    })
})


server.get('/lists/:listId/tasks', (req, res) => {
    console.log("inside the get tasks");
    const { listId } = req.params;
    dataService.viewTask(listId)
      .then((result) => {
        console.log(result)
        res.send(result);
      })
  })
  


// server.delete('/deletelist/:listId',(req,res)=>{
//     console.log("inside the delete list route");
//     const {listId}=req.params;
//     dataService.deleteList(listId)
//     .then((result)=>{
//         console.log(result);
//         res.status(result.statusCode).json(result)
//     })

// })


server.delete('/deletelist/:listId',(req,res)=>{
    console.log("inside the delete list route");
    const {listId}=req.params;
    if (!mongoose.Types.ObjectId.isValid(listId)) {
        return res.status(400).json({ message: 'Invalid list ID' });
    }
    dataService.deleteList(listId)
        .then((result)=>{
            console.log(result);
            res.status(result.statusCode).json(result)
        })
})


server.post('/editlist',(req,res)=>{
    console.log("inside the edit list route")
    const {listId,title} =req.body
    dataService.editList(listId,title)
    .then((result)=>{
        console.log(result);
        res.status(result.statusCode).json(result)
    })
})