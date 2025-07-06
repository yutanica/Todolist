// โค้ดสำหรับ To-Do List
const todoForm = document.querySelector('form');
const todoInput = document.querySelector('#todo-input');
const todoListUL = document.querySelector('#todo-list');
const remainingTodo = document.querySelector('.remaining-todo'); // แก้ไขตรงนี้ให้ตรงกับ class ใน HTML ที่คุณใช้
console.log(remainingTodo);

const getTodos = () => {
    const todos = localStorage.getItem("todos") || "[]";
    console.log(todos);
    return JSON.parse(todos);
}

const createTodoItem = (todoObj, todoIndex) => {
    const todoId = "todo-" + todoIndex;
    const todoList = document.createElement("li");
    const todoText = todoObj.text;
    todoList.className = "todo-item";
    todoList.innerHTML = `
        <input type="checkbox" id="${todoId}" ${todoObj.completed ? 'checked' : ''}/>
        <label for="${todoId}" class="todo-text">${todoText}</label>
        <button class="delete-button">
            <span class="material-symbols-outlined delete-icon"> close_small </span>
        </button>
    `;
    const checkbox = todoList.querySelector("input");
    checkbox.addEventListener("change", () => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos(); // บันทึกการเปลี่ยนแปลงสถานะ completed
        displayRemainingTodo();
    });
    const deleteButton = todoList.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        deleteTodoItem(todoIndex);
        displayRemainingTodo();
    });
    return todoList;
}

let allTodos = getTodos();

// แสดงผลจำนวนรายที่ยังไม่ทำ
const displayRemainingTodo = () => {
    const remaining = allTodos.filter((todoObj) => !todoObj.completed);
    // ตรวจสอบว่า remainingTodo ไม่เป็น null ก่อนเข้าถึง innerHTML
    if (remainingTodo) {
        remainingTodo.innerHTML = `You have ${remaining.length} tasks remaining`; // อัปเดตข้อความให้ชัดเจน
    }
}
displayRemainingTodo();


const updateTodoList = () => {
    todoListUL.innerHTML = "";
    allTodos.forEach((todoObj, todoIndex) => {
        const todoItem = createTodoItem(todoObj, todoIndex); // เปลี่ยนชื่อตัวแปรเป็น const
        todoListUL.append(todoItem);
    });
}
updateTodoList();


// เพิ่ม todo
const addTodo = () => {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        displayRemainingTodo();
        todoInput.value = "";
    }
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});


// ลบรายการ
const deleteTodoItem = (todoIndex) => {
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodos();
    updateTodoList();
}

const saveTodos = () => {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem('todos', todosJson);
}


// --- โค้ดสำหรับเปลี่ยน Wallpaper ---

const body = document.body;
const wallpaperSelector = document.querySelector('.wallpaper-selector');

// ตั้งค่าพื้นหลังเริ่มต้นเมื่อหน้าเว็บโหลด
// ควรตรงกับที่คุณตั้งค่าใน CSS เดิม หรือเลือกรูปเริ่มต้นที่ต้องการ
body.style.backgroundImage = 'url("panda.png")'; // ตรวจสอบชื่อไฟล์รูปของคุณ
body.style.backgroundSize = 'cover';
body.style.backgroundPosition = 'center center';
body.style.backgroundRepeat = 'no-repeat';
body.style.backgroundAttachment = 'fixed';
body.style.backgroundColor = 'transparent'; // ให้โปร่งแสงถ้ามีรูปพื้นหลัง

// เพิ่ม Event Listener สำหรับปุ่มเปลี่ยน Wallpaper
if (wallpaperSelector) { // ตรวจสอบให้แน่ใจว่า wallpaperSelector มีอยู่จริง
    wallpaperSelector.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const wallpaperName = event.target.dataset.wallpaper;

            if (wallpaperName === 'none') {
                body.style.backgroundImage = 'none'; // ไม่มีรูปพื้นหลัง
                body.style.backgroundColor = 'var(--background)'; // กลับไปใช้สีพื้นหลังตาม CSS
            } else {
                body.style.backgroundImage = `url("${wallpaperName}")`; // ตั้งค่ารูปพื้นหลัง
                body.style.backgroundSize = 'cover';
                body.style.backgroundPosition = 'center center';
                body.style.backgroundRepeat = 'no-repeat';
                body.style.backgroundAttachment = 'fixed';
                body.style.backgroundColor = 'transparent'; // ให้โปร่งแสงถ้ามีรูปพื้นหลัง
            }
        }
    });
}