const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
        taskName : {
            type: String,
            minLength : 5, //Minimum 5 znaków wymagane
            required : true //Podanie nazwy jest wymagane aby utworzyc nową listę
        },
        //Dzieki temu wiemy, do jakiej listy nalezy dany task
        _taskListId: { 
            type: mongoose.Types.ObjectId,
            required: true

        }
})

const Task = mongoose.model('Task', TaskSchema);

module.exports = { Task }