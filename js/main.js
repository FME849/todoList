import Task from "./Task.js";
import TaskServices from "./TaskServices.js";
import { checkEmpty } from "./Validation.js";

const taskApi = new TaskServices();

const getEleId = (id) => {
    return document.getElementById(id);
}

const checkLoading = (isLoading) => {
    isLoading == true ? getEleId("loader").style.display = "block" : getEleId("loader").style.display = "none";
}

const loadingTrue = () => {
    let isLoading = true;
    checkLoading(isLoading);
}

const loadingFalse = () => {
    let isLoading = false;
    checkLoading(isLoading);
}

const showTask = (taskList, _status) => {
    return taskList?.reduce((taskType, task) => {
        if (task.statusTask == _status) {
            return (taskType += `
                <li>
                    <span>${task.textTask}</span>
                    <div class="buttons">
                    <button class="remove" onclick="deleteTaskApi('${task.id}')">
                        <i class="fa fa-trash-alt"></i>
                    </button>
                    <button class="complete" onclick="updateTaskApi('${task.id}')">
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-check-circle"></i>
                    </button>
                    </div>
                </li>
            `);
        } else {
            return taskType;
        }
    }, "");
}

const showTaskList = taskList => {
    // Cách 2
    const todoHTML = showTask(taskList, "todo");
    const completedHTML = showTask(taskList, "completed");
    getEleId("todo").innerHTML = todoHTML;
    getEleId("completed").innerHTML = completedHTML;

    // Cách 1 (Cách 1 hay cách 2 tối ưu hơn?)
    // let todoTask = "";
    // let completedTask = "";
    // taskList.forEach(task => {
    //     if (task.statusTask == "todo") {
    //         todoTask += `
    //             <li>
    //                 <span>${task.textTask}</span>
    //                 <div class="buttons">
    //                 <button class="remove" onclick="deleteTaskApi('${task.id}')">
    //                     <i class="fa fa-trash-alt"></i>
    //                 </button>
    //                 <button class="complete" onclick="updateTaskApi('${task.id}')">
    //                     <i class="far fa-check-circle"></i>
    //                     <i class="fas fa-check-circle"></i>
    //                 </button>
    //                 </div>
    //             </li>
    //         `
    //     } else {
    //         completedTask += `
    //             <li>
    //                 <span>${task.textTask}</span>
    //                 <div class="buttons">
    //                 <button class="remove" onclick="deleteTaskApi('${task.id}')">
    //                     <i class="fa fa-trash-alt"></i>
    //                 </button>
    //                 <button class="complete" onclick="updateTaskApi('${task.id}')">
    //                     <i class="far fa-check-circle"></i>
    //                     <i class="fas fa-check-circle"></i>
    //                 </button>
    //                 </div>
    //             </li>
    //         `
    //     }
    //     getEleId("todo").innerHTML = todoHTML;
    //     getEleId("completed").innerHTML = completedHTML;
    // });
}

const getListTaskApi = () => {
    loadingTrue();
    taskApi.getListTask()
        .then(taskListObj => {
            showTaskList(taskListObj.data);
            loadingFalse();
        })
        .catch(err => {
            console.log(err);
            loadingFalse();
        })
}
getListTaskApi();

const getTaskInfo = () => {
    let task = new Task();
    task.textTask = getEleId("newTask").value;
    task.id = "";
    return task;
}

const validate = (task) => {
    return checkEmpty(task.textTask, "Empty task!");
}

const addTaskApi = () => {
    let task = getTaskInfo();
    task.statusTask = "todo";
    let isValid = validate(task);
    if(isValid) {
        loadingTrue();
        taskApi.addTask(task)
            .then(() => {
                getListTaskApi();
                loadingFalse();
                getEleId("newTask").value = "";
            })
            .catch(err => {
                console.log(err);
                loadingFalse();
            })
    }
}
getEleId("addItem").onclick = addTaskApi;

const deleteTaskApi = (id) => {
    loadingTrue();
    taskApi.deleteTask(id)
        .then(taskListObj => {
            getListTaskApi();
            loadingFalse();
        })
        .catch(err => {
            console.log(err);
            loadingFalse();
        })
}
window.deleteTaskApi = deleteTaskApi;

const updateTaskApi = (id) => {
    loadingTrue();
    taskApi.getTaskById(id)
        .then(taskObj => {
            if(taskObj.data.statusTask == "todo") {
                taskObj.data.statusTask = "completed";
                taskApi.updateTask(id, taskObj.data)
                    .then(taskObj => {
                        getListTaskApi();
                        loadingFalse();
                    })
                    .catch(err => {
                        console.log(err);
                        loadingFalse();
                    })
            } else {
                taskObj.data.statusTask = "todo";
                    taskApi.updateTask(taskObj.data.id, taskObj.data)
                        .then(taskObj => {
                            getListTaskApi();
                            loadingFalse();
                        })
                        .catch(err => {
                            console.log(err);
                            loadingFalse();
                        })
            }
        })
        .catch(err => {
            console.log(err);
            loadingFalse();
        })
}
window.updateTaskApi = updateTaskApi;

