// import db.js
const db = require('./db')

//register
const register =(name,email,pswd)=>{

    // check email in mongodb  -db.users.findOne
    return db.User.findOne({
        email
    }).then((result)=>{
        console.log(result);
        if(result){
            return{
                statusCode:401,
                message:'Account already exist'
            }
        }
        else{
            // to add new user 

            const newUser = new db.User({

                name,
                email,
                password:pswd
                
            })
            // to save new user in mongodb use save()
            // newUser.save()
            //     return {
            //       statusCode: 200,
            //       message: 'Registration successful',
                  
            //     };
            
            return newUser.save().then((savedUser) => {
                return {
                    statusCode: 200,
                    message: 'Registration successful',
                    _id: savedUser._id
                };
            });
        

               
                
            
           
        }

    })
}


const login = (email,pswd) =>{
    console.log("inside the login function body");
    return db.User.findOne({
        email,
        password:pswd

    }).then((result)=>{

        if(result){
            return{
                statusCode:200,
                message:"login successfull",
                _id:result._id
            }
        }
        else{
            return{
                statusCode:404,
                message:"Invalid Account/ password"
                
            }
        }


        
    })
}

const viewList =(userId)=>{

  return db.List.find({
    _userId:userId
  }).then((lists)=>{

    console.log("iside the dataservice");
    console.log(lists);
    if (lists) {
      return {
           lists
      };
    } else {
      return {
        statusCode: 404,
        message: "Invalid Account/ password",
      };
    }

  })
  .catch((error) => {
    if (error.name === "ValidationError") {
      return {
        statusCode: 400,
        message: error.message,
      };
    } else {
      return {
        statusCode: 500,
        message: "Internal server error",
      };
    }
  });

}


// const createList =(title,userId)=>{

//    let newList = new db.List({
//     title,
//     _userId:userId
//    })
//    return  newList.save().then((result)=>{

//     if(result){
//         return{
//             statusCode:200,
//             message:"new list addedd successfully",
//             _id:result._id
//         }
//     }
    
//     else{
//             return{
//                 statusCode:404,
//                 message:"Invalid Account/ password"
                
//             }
//         }
    
//    })
    

// }



const createList = (title, userId) => {
    console.log('Creating new list with user ID:', userId);
    let newList = new db.List({
      title,
      _userId: userId,
    });
    return newList
      .save()
      .then((result) => {
        if (result) {
          return {
            statusCode: 200,
            message: "new list added successfully",
            _id: result._id,
          };
        } else {
          return {
            statusCode: 404,
            message: "Invalid Account/ password",
          };
        }
      })
      .catch((error) => {
        if (error.name === "ValidationError") {
          return {
            statusCode: 400,
            message: error.message,
          };
        } else {
          return {
            statusCode: 500,
            message: "Internal server error",
          };
        }
      });
  };



  
const createTask = (title, listId) => {
  console.log('Creating new task with list ID:', listId);
  let newTask = new db.Task({
    title,
    _listId: listId,
  
  });
  return newTask
    .save()
    .then((result) => {
      if (result) {
        return {
          statusCode: 200,
          message: "new list added successfully",
          _id: result._id,
        };
      } else {
        return {
          statusCode: 404,
          message: "Invalid Account/ password",
        };
      }
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        return {
          statusCode: 400,
          message: error.message,
        };
      } else {
        return {
          statusCode: 500,
          message: "Internal server error",
        };
      }
    });
};




const viewTask =(listId)=>{

  return db.Task.find({
    _listId:listId
  }).then((tasks)=>{

    console.log("iside the task dataservice");
    console.log(tasks);
    if (tasks) {
      return {
           tasks
      };
    } else {
      return {
        statusCode: 404,
        message: "Invalid Account/ password",
      };
    }

  })
  .catch((error) => {
    if (error.name === "ValidationError") {
      return {
        statusCode: 400,
        message: error.message,
      };
    } else {
      return {
        statusCode: 500,
        message: "Internal server error",
      };
    }
  });

}


// const deleteList =(listId)=>{

//   return db.List.findByIdAndDelete({
//     _id: listId

//   })
//   .then(
//     (result)=>{
//         if(result){

//             return{

//                 statusCode:200,
//                 message:'Account deleted successfully '
//             }
//         }
//         else{
//             return{
//                 statusCode:401,
//                 message:'Invalid  account number '
//             }
//         }
//     }
// )

// }



const deleteList = (listId) => {
  console.log('Deleting list with ID:', listId);
  return db.List.findOneAndRemove({ _id: listId })
      .then((result) => {
          console.log('Result of deletion:', result);
          if (result) {
              return {
                  statusCode: 200,
                  message: 'List deleted successfully',
              };
          } else {
              return {
                  statusCode: 401,
                  message: 'Invalid list ID',
              };
          }
      });
};


const editList =(listId,title)=>{
  console.log('inside the edit list service')

  return db.List.findOne({
    _id:listId
  }).then((result)=>{
    if(result){

      result.title = title
      result.save()
      return{
        statusCode:200,
        message:"Data updated successfully"
    }

    }

    else{
          
      return{
          statusCode:400,
          message:" no data is available"
      }
  }

  })
}









module.exports={
    register,
    login,
    viewList,
    createList,
    createTask,
    viewTask,
    deleteList,
    editList
}