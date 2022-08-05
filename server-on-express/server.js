import {app} from './app.js';

const port = 3000;
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});

//check task
//curl localhost:3000/tasks
//add task
//curl localhost:3000/tasks -d '{ "name": "new task", "done": false }' -H "Content-Type: application/json"
//change task
//curl -X PATCH localhost:3000/tasks/3 -d '{ "done": true, "ololo": "ololol" }' -H 'Content-type: application/json'
/////////////////HTTPie//////////////////
//http localhost:3000/tasks
//http :3000/tasks name="Get by id again"
//http PATCH :3000/tasks/1 name="Get by id again"
//http DELETE localhost:3000/tasks/2