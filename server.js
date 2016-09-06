var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
    id: 1,
    description: 'Leave to mother land',
    completed : false
}, {
    id: 2,
    description: 'Call Rachel',
    completed : false
}, {
    id: 3,
    description: 'Call Selena',
    completed : true
}];

app.get('/', function(req, res){
    res.send('Todo API root');
});

// GET / todos
app.get('/todos', function (req, res) {
    res.json(todos);
});

// GET / todos/:id
app.get('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo;

    // if(typeof todoId === 'number'){
    //
    // }
    console.log(typeof  todoId);
    todos.forEach(function (todo){
        if(todoId === todo.id){
            matchedTodo = todo;
        }
    });

    if(matchedTodo){
        res.json(matchedTodo);
    }else{
        res.status(404).send();
    }
});

app.listen(PORT, function (){
   console.log('Listening on Port Number ' + PORT);
});