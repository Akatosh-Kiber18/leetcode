import express from "express";

export const router = express.Router();

const inc = (init = 0) => () => ++init
const genListId = inc();
const genTaskId = inc();

/*const tasks = [
    {
        id: genId(),
        name: 'Get task'
    },
    {
        id: genId(),
        name: 'Create task'
    },
];*/

const lists = [
    {
        id: genListId(),
        listName: 'Tomorrow tasks',
        tasks: [
            {
                index: genTaskId(),
                name: 'Buy some milk',
                done: false
            }
        ]
    }
]

const createTask = data => {
    return {
        index: genTaskId(),
        name: data.name,
        done: false,
    }
}
const createList = data => {
    return {
        id: genListId(),
        listName: data.listName,
        tasks: data.tasks
    }
}
router.get('/lists', (req, res) => res.json(lists));

router.post('/lists', (req, res) => {
    let list = createList(req.body);
    lists.push(list);
    res.json(list);
});

router.patch('/lists/:id', (req, res) => {
    const listId = parseInt(req.params.id);
    const list = lists.find(l => l.id === listId);
    const task = createTask(req.body);

    if (list) {
        list.tasks.push(task);
        res.json(list);
    } else {
        res.status(404).json({error: 'Task not found'});
    }
});

router.patch('/lists/:id/tasks/:index', (req, res) => {
    const listId = parseInt(req.params.id);
    const list = lists.find(l => l.id === listId);

    const taskId = parseInt(req.params.index);
    const task = list.tasks.find(t => t.index === taskId);

    if (task) {
        Object.assign(task, req.body);
        res.json(task);
    } else {
        res.status(404).json({error: 'Task not found'});
    }
});

router.delete('/lists/:id/tasks/:index', (req, res) => {
    const listId = parseInt(req.params.id);
    const list = lists.find(l => l.id === listId);

    const taskId = parseInt(req.params.index);
    const task = list.tasks.find(t => t.index === taskId);
    if (task) {
        list.tasks.splice(taskId - 1, 1)
        res.json(list.tasks);
    } else {
        res.status(404).json({error: 'Task not found'});
    }
})
/*
router.post('/tasks', (req, res) => {
    let task = createTask(req.body);
    tasks.push(task);
    res.json(task);
});



router.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        tasks[taskId-1] = req.body;
        res.json(tasks);
    } else {
        res.status(404).json({error: 'Task not found'});
    }
})*/
