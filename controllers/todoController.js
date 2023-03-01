var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const dotenv= require('dotenv').config();

//connect to the database
mongoose.set('strictQuery' , false)
mongoose.connect(process.env.PORT_URI,{
   useNewUrlparser : true,
});

// 

var todoSchema = new mongoose.Schema({
   item : String
});

var Todo = mongoose.model('Todo', todoSchema);

// var itemone = Todo({
//    item : 'hjgjhg'
// }).save(function(err){
//    if(err) throw err ;
//    console.log('items saved');
// });



// var data =[{item : 'hgh'},{item : 'ghghgf'},{item:'ghgv'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });


module.exports = function(app){

 app.get('/todo', function(req,res){
    Todo.find({}, function(err,data){
      if(err) throw err;
      res.render('todo',{todos: data});
    })
   
 });

 app.post('/todo', urlencodedParser, function (req,res){

   var newTodo = Todo(req.body).save(function(err,data){
      if(err) throw err ;
      res.json(data);
   }); 
}); 
  
 

 app.delete('/todo/:item' , function(req,res){

   Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
      if(err) throw err;
      res.json(data);
   });
 });
}