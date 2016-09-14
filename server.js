var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
// var todos = [{
//     id: 1,
//     description: 'Leave to mother land',
//     completed : false
// }, {
//     id: 2,
//     description: 'Call Rachel',
//     completed : false
// }, {
//     id: 3,
//     description: 'Call Selena',
//     completed : true
// }];

var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

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
    var matchedTodo = _.findWhere(todos, {id: todoId});

    // var matchedTodo;
    //
    // // if(typeof todoId === 'number'){
    // //
    // // }
    // console.log(typeof  todoId);
    // todos.forEach(function (todo){
    //     if(todoId === todo.id){
    //         matchedTodo = todo;
    //     }
    // });

    if(matchedTodo){
        res.json(matchedTodo);
    }else{
        res.status(404).send();
    }
});

// POST /todos
app.post('/todos', function (req, res){
    var body = req.body;

    body = _.pick(body, 'description', 'completed');

    if(!_.isString(body.description ) || !_.isBoolean(body.completed) || body.description.trim().length === 0){
        return res.status(400).send();
    }

    body.description = body.description.trim();

    body.id = todoNextId++;

    todos.push(body);
    console.log('description: ' + body.description);

    res.json(body);
});


app.listen(PORT, function (){
   console.log('Listening on Port Number ' + PORT);
});