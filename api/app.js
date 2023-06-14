const express = require('express');
const app = express();

const { mongoose } = require('./database/mongoose');

const bodyParser = require('body-parser');



const { TasksList } = require('./database/models/tasksList.model');
const { Task } = require('./database/models/task.model');


//Middleware - 

app.use(bodyParser.json());


//CORS 
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

//endpointy dla List

//Zwracanie wszystkich list znajdujacych sie w bazie danych
app.get('/taskslists',(req,res)=>{
    TasksList.find({}).then((taskLists)=>{
        res.send(taskLists);
    });
})


//Dodawanie nowej listy do bazy danych
app.post('/taskslists',(req,res)=>{
    let listName = req.body.listName;
    let newTasksList = new TasksList({
        listName
    })
    newTasksList.save().then((tasksListDoc)=>{
        res.send(tasksListDoc);
    }) 
})

//Aktualizacja/edycja wybranej listy zadań.
app.patch('/taskslists/:id',(req,res)=>{
    TasksList.findOneAndUpdate({ _id: req.params.id},{
        $set : req.body
    }).then(()=>{
        res.sendStatus(200);//Do zmiany na jakis komunikat!!!
    })

})

//Usuwanie wybranej listy z bazy danych
app.delete('/taskslists/:id',(req,res)=>{
    TasksList.findOneAndRemove({
        _id: req.params.id
    }).then((removedTaskListsDoc)=>{
        res.send(removedTaskListsDoc);
    })
})


//Pobieranie zadań(tasków) nalezących do danej listy

app.get('/taskslists/:tasklistid/tasks',(req,res)=>{
    Task.find({
        _tasklistId: req.params.tasklistid
    }).then((tasks)=>{
        res.send(tasks)
    })
})



//Pokazywanie konkretnego taska (przydatne przy filtrowaniu)

app.get('/taskslists/:tasklistid/tasks/:taskId',(req,res)=>{
    Task.findOne({
        _id: req.params.taskId,
        _tasklistId: req.params.tasklistid
    }).then((task)=>{
        res.send(task);
    })
})

//Dodawanie taska/zadania do danej listy ( wybranej )

app.post('/taskslists/:tasklistid/tasks',(req,res)=>{
    let newTask = new Task({
        taskName: req.body.taskName,
        _tasklistid: req.params.tasklistid
    });
    newTask.save().then((newTaskDoc)=>{
        res.send(newTaskDoc);
    })
})


//Edycja taska/zadania w danej liscie

app.patch('/taskslists/:tasklistid/tasks/:taskId',(req,res)=>{
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _tasklistId: req.params.tasklistid
    },{
        $set: req.body
    }).then(()=>{
        res.sendStatus(200);//Do zmiany na jakis komunikat!!!
    })
})



//Usuwanie poszczegolnego taska/zadania z danej listy

app.delete('/taskslists/:tasklistid/tasks/:taskId',(req,res)=>{
    Task.findOneAndRemove({
         _id: req.params.taskId,
        _tasklistId: req.params.tasklistid
    }).then((removedTaskDoc)=>{
        res.send(removedTaskDoc);
    })
})


app.listen(3000, () => {
    console.log("Serwer nasłuchuje na porcie 3000!");
})