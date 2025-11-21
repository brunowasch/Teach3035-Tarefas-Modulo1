let taskName = document.getElementById('task')
let taskDate = document.getElementById('date')
let taskStatus = document.getElementById('status')
let tasksCardContainer = document.getElementById('tasks-cards')
let listStatus = document.getElementById('list-status')

const tasks = []
let currentFilter = 'all'

function createTask(name, date, status) {
    return {
        name: name,
        date: date,
        createdAt: new Date(),
        status: status,
        completed: status === 'Concluída'
    }
}

function addTask() {
    const name = taskName.value
    const date = taskDate.value
    const status = taskStatus.value

    if (!name) return

    const newTask = createTask(name, date, status)
    tasks.push(newTask)

    renderTasks()
}

function markTaskAsCompleted(index) {
    const task = tasks[index]
    if (!task) return

    task.completed = true
    task.status = 'Concluída'

    renderTasks()
}

function listPendingTasks() {
    const pendingTasks = tasks.filter(task => !task.completed)
    console.log("Tarefas pendentes:", pendingTasks)
    return pendingTasks
}

function updateTaskStatus(index, newStatus) {
    const task = tasks[index]
    if (!task) return

    task.status = newStatus
    task.completed = newStatus === 'Concluída'

    renderTasks()
}

function deleteTask(index) {
    tasks.splice(index, 1)
    renderTasks()
}

function renderTasks() {
    tasksCardContainer.innerHTML = ''

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'all') return true
        return task.status === currentFilter
    })

    filteredTasks.forEach((task, index) => {
        const card = document.createElement('div')
        card.classList.add('card')

        const title = document.createElement('h2')
        title.textContent = task.name

        const date = document.createElement('p')
        date.textContent = task.date || 'Sem data definida'

        const statusSelect = document.createElement('select')
        const options = ['Não iniciada', 'Em andamento', 'Concluída']

        options.forEach(option => {
            const opt = document.createElement('option')
            opt.value = option
            opt.textContent = option
            if (task.status === option) opt.selected = true
            statusSelect.appendChild(opt)
        })

        statusSelect.classList.add("status-select")
        statusSelect.addEventListener('change', () => {
            updateTaskStatus(index, statusSelect.value)
        })

        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = "Excluir"
        deleteBtn.classList.add("delete-btn")
        deleteBtn.addEventListener('click', () => deleteTask(index))

        card.appendChild(title)
        card.appendChild(date)
        card.appendChild(statusSelect)
        card.appendChild(deleteBtn)

        if (task.completed) {
            card.classList.add('completed')
        }

        tasksCardContainer.appendChild(card)
    })
}

listStatus.addEventListener('change', () => {
    currentFilter = listStatus.value
    renderTasks()
})