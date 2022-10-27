window.addEventListener('load', () => {

	reps = JSON.parse(localStorage.getItem('reps')) || [];
	const newRepForm = document.querySelector('#new-form-rep');
	newRepForm.addEventListener('submit', e => {
		e.preventDefault();
		const rep = {
			name: e.target.elements.pieceName.value,
			composer: e.target.elements.pieceComposer.value,
			opus: e.target.elements.pieceOpus.value,
			date: e.target.elements.pieceDate.value,
		}
		if (rep.name.length > 0 && rep.composer.length > 0 && rep.opus.length > 0 && rep.date.length > 0) {
			reps.push(rep);
			localStorage.setItem('reps', JSON.stringify(reps));
			e.target.reset();
			DisplayReps();
		}
	})

	DisplayReps();
})


function DisplayReps() {
	const repList = document.querySelector('#rep-list');
	repList.innerHTML = "";
	reps.forEach(rep => {
		const repItem = document.createElement('div');
		repItem.classList.add('rep-item');
		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';

		content.classList.add('rep-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');
		content.innerHTML = `<input type="text" value="${rep.name} by ${rep.composer}, Op. ${rep.opus},  ${rep.date}" readonly>`;

		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(deleteButton);
		repItem.appendChild(label);
		repItem.appendChild(content);
		repItem.appendChild(actions);
		repList.appendChild(repItem);
		deleteButton.addEventListener('click', (e) => {
			reps = reps.filter(r => r != rep);
			localStorage.setItem('reps', JSON.stringify(reps));
			DisplayReps()	
		})

	})
}