//W tym pliku jest cała logika połączenia z bazą danych MongoDB
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TasksManagmentDB', { useNewUrlParser: true }).then(() => {
    console.log("Połączenie z bazą danych udane!");
}).catch((e) => {
    console.log("Problem z połączeniem z bazą danych!");
    console.log(e);
});

// To prevent deprectation warnings (from MongoDB native driver)
//mongoose.set('useCreateIndex', true);
//mongoose.set('useFindAndModify', false);


module.exports = { mongoose };