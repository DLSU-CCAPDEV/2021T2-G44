import request from '../utils/AxiosConfig';

export const getTodo = async () => {
    try {
        const response = await request.get('api/todo');
        return response.data;
    } catch(ex) {
        console.error(ex);
        return {
            success: false,
            errors: [{
                msg: ex
            }]
        };
    }
};

export const addTodo = async (title) => {
    try {
        const response = await request.put('api/todo', {
            title: title
        });
        return response.data;
    } catch(ex) {
        console.error(ex);
        return {
            success: false,
            errors: [{
                msg: ex
            }]
        };
    }
};

export const toggleTodo = async (todoID) => {
    try {
        const response = await request.post('api/todo', {
            todoID: todoID
        });
        return response.data;
    } catch(ex) {
        console.error(ex);
        return {
            success: false,
            errors: [{
                msg: ex
            }]
        };
    }
}

export const deleteTodo = async (todoID) => {
    try {
        const response = await request.delete('api/todo', {
            data: {
                todoID: todoID
            }
        });
        return response.data;
    } catch(ex) {
        console.error(ex);
        return {
            success: false,
            errors: [{
                msg: ex
            }]
        };
    }
};