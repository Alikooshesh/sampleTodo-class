let isEdit = null

const todoApp = {
    getData : function(){
        return JSON.parse(localStorage.getItem("todoData")) ?? []
    },
    setData : function(data){
        const todoData = [...this.getData() , data]
        localStorage.setItem("todoData",JSON.stringify(todoData))
        render()
    },
    genId : function(){
        return Date.now().toString(36)
    },
    addTodo : function(todoText){
        const todo = {
            id : this.genId(),
            text : todoText
        }

        this.setData(todo)
    },
    removeTodo : function(id){
        const todoData = this.getData()
        const newTodoData = todoData && todoData.filter(item => item.id !== id)
        localStorage.setItem("todoData",JSON.stringify(newTodoData))
        render()
    },
    editTodo : function(id , newText){
        const todoData = this.getData()
        const newTodoData = todoData.map(item =>{
            if(item.id === id){
                return {...item , text : newText}
            }else{
                return {...item}
            }
        })

        localStorage.setItem("todoData",JSON.stringify(newTodoData))
        render()
    }
}

const render = ()=>{
    const todoListContainer = document.getElementById("todoList-container")
    const addBoxContainer = document.getElementById("addBox-container")

    todoListContainer.innerHTML = ""
    const todoData = todoApp.getData()

    if(todoData.length === 0){
        todoListContainer.innerText = "no data"
    }else{
        todoData.forEach(todo => {
            todoListContainer.innerHTML += `
            <div class="w-full h-64px p-8px bg-green rounded-16px">
            <div class="w-full h-full flex items-center justify-between">
                <p class="text-white">${todo.text}</p>
                <div class="flex items-center gap-16px">
                    <button onclick="editButtonClickHandler('${todo.id}' , '${todo.text}')">edit</button>
                    <button onclick="todoApp.removeTodo('${todo.id}')">delete</button>
                </div>
            </div>
        </div>
            `
        });
    }

    addBoxContainer.innerHTML = isEdit ?
        `<input id="add-input">
        <button id="add-btn" onclick="submitButtonHandler()">submit</button>`
    : `<input id="add-input">
    <button id="add-btn" onclick="addButtonClickHandler()">add</button>`
}

const editButtonClickHandler = (id , preText)=>{
    isEdit = id
    render()
}

const submitButtonHandler = ()=>{
    const addInput = document.getElementById("add-input")
    todoApp.editTodo(isEdit , addInput.value)
    isEdit = null
    render()
}

const addButtonClickHandler = ()=>{
    const addInput = document.getElementById("add-input")
    todoApp.addTodo(addInput.value)
}

render()