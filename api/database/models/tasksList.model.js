const mongoose = require('mongoose');

const TasksListSchema = new mongoose.Schema({
        listName : {
            type: String,
            minLength : 5, //Minimum 5 znaków wymagane
            required : true //Podanie nazwy jest wymagane aby utworzyc nową listę
        }
})

const TasksList = mongoose.model('TasksList', TasksListSchema);

module.exports = { TasksList }