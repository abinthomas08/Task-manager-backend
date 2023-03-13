const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost:27017/TaskManagerTwo',()=>{
    console.log("MongoDB connected successfully");
})


// create model for the 



const User = mongoose.model('User',{
    name:String,
    email:String,
    password:String
    
    

})


// create model for the Lists

const List =mongoose.model('List',{
    title:{
        type:String,
        required:true,
        minlength:1,
        trim:true,
    },
    _userId:{
        type:mongoose.Types.ObjectId,
        required:true
    }
})

// create model for the Tasks

const Task =mongoose.model('Task',{

    title:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },

        _listId:{
        
            type:mongoose.Types.ObjectId,
        
            required:true
        }


    ,
    completed: {
        type: Boolean,
        default: false
    }

})
// export the model 

module.exports={
    User,
    List,
    Task
}

