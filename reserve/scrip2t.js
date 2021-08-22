/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */



'use strict';

class Todo {
  constructor(form, input, todoLlist, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoLlist = document.querySelector(todoLlist);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDoLlist')));
  }

  addToStorage() {
    localStorage.setItem('toDoLlist', JSON.stringify([...this.todoData]));
  }

  render() {
    this.todoLlist.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }

  createItem(todo) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = todo.key;
    li.insertAdjacentHTML('beforeend', `
      <span class="text-todo">${todo.value}</span>
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
    `);

    if (todo.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoLlist.append(li);
    }
  }

  addTodo(e) {
    e.preventDefault();

    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      this.todoData.set(newTodo.key, newTodo);
      this.render();
    }
  }

  generateKey() {
    return Math.random().toString(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  deleteItem(e) {
    const button = e.target;
    console.log('button: ', button);
    const todoItem = button.closest('.todo-item');

    if (button.matches('.todo-remove')) {
      this.todoData.forEach(el => {
        if (el.key === todoItem.key) {
          this.todoData.delete(el.key);
        }
      });

      this.render();
    }
  }

  completedItem(e) {
    const button = e.target;
    console.log('button: ', button);
    const todoItem = button.closest('.todo-item');

    if (button.matches('.todo-complete') && (button.closest('.todo-completed'))) {
      this.todoLlist.append(todoItem);

      this.todoData.forEach(el => {
        if (el.key === todoItem.key) {
          el.completed = false;
        }
      });
    } else if (button.matches('.todo-complete') && (button.closest('.todo-list'))) {
      this.todoCompleted.append(todoItem);

      this.todoData.forEach(el => {
        if (el.key === todoItem.key) {
          el.completed = true;
        }
      });
    }

    this.render();
  }

  handler() {
    // делегирование
    document.querySelector('.todo-container').addEventListener('click', this.completedItem.bind(this));
    document.querySelector('.todo-container').addEventListener('click', this.deleteItem.bind(this));
  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render();
  }

}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();

todo.handler();




