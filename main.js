window.addEventListener('load', () => {
	var hr = new Date().getHours();
	text = "";
	if (hr < 12) {
		text = "Good Morning!";
	} else if (hr <= 17) {
		text = "Good Afternoon!";
	} else {
		text = "Good Evening";
	}
	document.getElementById("greet").innerHTML = text;

	todos = JSON.parse(localStorage.getItem('todos')) || [];

	const newTodoForm = document.querySelector('#new-form');
	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();
		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
		}
		if (todo.content.length > 0 && todo.category.length > 0) {
			todos.push(todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			e.target.reset();
			DisplayTodos()
		}
	})
	DisplayTodos();
	
})

function DisplayTodos() {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";
	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');
		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'etudes') {
			span.classList.add('etudes');
		} else if (todo.category == 'techniques') {
			span.classList.add('techniques');
		} else {
			span.classList.add('pieces');
		}
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);
		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}

		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}
			DisplayTodos()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
}

