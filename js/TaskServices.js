class TaskServices {
    getListTask() {
        return axios({
            url: "https://6183cac591d76c00172d1b4f.mockapi.io/api/todo_List",
            method: "GET",
        })
    };
    addTask(task) {
        return axios({
            url: "https://6183cac591d76c00172d1b4f.mockapi.io/api/todo_List",
            method: "POST",
            data: task,
        })
    };
    deleteTask(id) {
        return axios({
            url: `https://6183cac591d76c00172d1b4f.mockapi.io/api/todo_List/${id}`,
            method: "DELETE",
        })
    };
    getTaskById(id) {
        return axios({
            url: `https://6183cac591d76c00172d1b4f.mockapi.io/api/todo_List/${id}`,
            method: "GET",
        })
    };
    updateTask(id, task) {
        return axios({
            url: `https://6183cac591d76c00172d1b4f.mockapi.io/api/todo_List/${id}`,
            method: "PUT",
            data: task,
        })
    }
}

export default TaskServices;