const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const nothingToDo = document.createElement('li');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {      // if there is items in the todos local storage
    todos.forEach( (todo) => {     // iterate through each item
        addTodo(todo);     // call the function with the text of each item in the list
    });
}

form.addEventListener('keypress', (e) => {     // submit event fires when the user clicks a submit button or presses Enter while editing a field in a form. 
    if (e.key === 'Enter') {
        e.preventDefault();     // prevents page from reloading whjen pressing enter
        addTodo();     // adds list item
    } else {
        return;
    }
});

// form.addEventListener('submit', (e) => {     // submit event fires when the user clicks a submit button or presses Enter while editing a field in a form. 
//     e.preventDefault();     // preventDefault() method cancels the event if it is cancelable | Clicking on a "Submit" button, prevent it from submitting a form
//     addTodo();
// });


function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;     // if there is a previous todo item make todoText equal to the previous todo
    }

    if (todoText) {     // if text is inputted
        const todoEl = document.createElement('li');     // create list element

        if (todo && todo.completed) {
            todoEl.classList.add('completed');
        }

        todoEl.innerText = todoText;     // get inputted text\

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove');
        removeBtn.innerHTML = `<i class="far fa-circle-xmark" ></i>`;

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');     // adds/removes a class called completed
            updateLS();
        });

        removeBtn.addEventListener('click', () => {
            todoEl.remove();    // removes a list item
            updateLS();
        });

        todosUL.appendChild(todoEl);
        todoEl.appendChild(removeBtn);  
        nothingToDo.remove();     // removes the 'nothing to do message'

        input.value = '';     // removes the inputted text at the top after submitted

        updateLS();
    } 
}

function updateLS() {
    const todosEl = document.querySelectorAll('li');     // list items

    const todos = [];     // array of the notes

    todosEl.forEach( (todoEl) => {     // iterate through all list items
        todos.push( {
            text: todoEl.innerText,     // add the items to the array 
            completed: todoEl.classList.contains('completed')     // if completed add to completed object
        })
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}



