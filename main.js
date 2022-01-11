'use strict'
const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')
const todoRemove = document.querySelector('.todo-remove')

const todoData = JSON.parse(localStorage.getItem("todoData"));

const render = function(){//будет перебирать todoData 
  todoList.textContent = ''
  todoCompleted.textContent = ''
  headerInput.value = ''

  todoData.forEach(function(item){
    const li = document.createElement('li')
    li.classList.add('todo-item')
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
    '<div class="todo-buttons">' + 
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>'+
    '</div>';
    if (!item.completed) {
      todoList.append(li)
    } else {
      todoCompleted.append(li)
    }
    const btnTodoComplete = li.querySelector('.todo-complete')
    btnTodoComplete.addEventListener('click', function(){
      item.completed = !item.completed
      render();
    })

    const btnTodoRemove = li.querySelector('.todo-remove')
    btnTodoRemove.addEventListener('click', function(){
      todoData.shift(item)
      render();
    })

    localStorage.setItem("todoData", JSON.stringify(todoData));
  })
}

todoControl.addEventListener("submit", function(event){
  event.preventDefault() //чтобы страница при нажатии не перезагружалась 
  const newTodo = {
    value: headerInput.value,
    completed: false
  }
  if(newTodo.value === '') todoControl.disabled = true
  else { todoData.push(newTodo)}
  render()//чтобы обновился весь список дел
})//submit потому что кнопка в форме

render();
console.log(todoRemove)

