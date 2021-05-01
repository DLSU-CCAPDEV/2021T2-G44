const TodoModel = require('../models/ToDo');

/**
 * This controller method gets the list of all todos
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.getAllTodo = async (req, res) => {
    const userID = req.session.uid;

    try {
        const todos = await TodoModel.find({ userID: userID });
        res.status(200).json({
            success: true,
            todos: todos
        });
        return;
    } catch(ex) {
        console.error(ex);
        res.status(500).json({
            success: false,
            errors: [{
                msg: ex
            }]
        });
    }
};

/**
 * This controller method creates a new instance of a to-do list item.
 * @param {*} req 
 * @param {*} res 
 */
module.exports.addTodo = async (req, res) => {
    const userID = req.session.uid;
    const title = req.body.title;

    try {
        const todoInstance = new TodoModel({
            userID: userID,
            title: title,
            completed: false
        });
        await todoInstance.save();
        res.status(201).json({
            success: true,
            todo: todoInstance
        });
    } catch(ex) {
        console.error(ex);
        res.status(500).json({
            success: false,
            errors: [{
                msg: ex
            }]
        });
    }
};

/**
 * This controller method toggles if the todo list item has been completed or not.
 * @param {*} req 
 * @param {*} res 
 */
module.exports.toggleCompleted = async (req, res) => {
    const userID = req.session.uid;
    const todoID = req.body.todoID;

    try {
        const todo = await TodoModel.findOne( { _id: todoID } );

        if(todo.userID !== userID) {
            res.status(403).json({
                success: false,
                errors: [{
                    msg: "This todo does not belong to your account."
                }]
            });
            return;
        }

        await TodoModel.updateOne({ _id: todoID }, { completed: !todo.completed });
        res.status(200).json({
            success: true
        });
    } catch(ex) {
        res.status(500).json({
            success: false,
            errors: [{
                msg: ex
            }]
        });
    }
};

module.exports.deleteTodo = async (req, res) => {
    const userID = req.session.uid;
    const todoID = req.body.todoID;

    try {
        const todo = await TodoModel.findOne( { _id: todoID } );

        if(todo.userID !== userID) {
            res.status(403).json({
                success: false,
                errors: [{
                    msg: "This todo does not belong to your account."
                }]
            });
            return;
        }

        await TodoModel.deleteOne({ _id: todoID });
        res.status(200).json({
            success: true
        });
    } catch(ex) {
        res.status(500).json({
            success: false,
            errors: [{
                msg: ex
            }]
        });
    }
};