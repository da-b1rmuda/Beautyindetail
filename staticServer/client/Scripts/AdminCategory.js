window.onload = function () {
	const requestOptions = {
		method: 'GET',
		redirect: 'follow',
	}
	fetch(`${window.API_URL}/category/getCategory`, requestOptions)
		.then(response => response.json())
		.then(data => {
			const table = document.getElementById('client')
			const header = table.createTHead()
			const headerRow = header.insertRow(0)
			headerRow.insertCell(0).textContent = 'ID'
			headerRow.insertCell(1).textContent = 'Наименование'
			headerRow.style.fontWeight = 'bold'

			data.forEach(category => {
				const row = table.insertRow()
				row.insertCell(0).textContent = category.id
				row.insertCell(1).textContent = category.name
			})
			showPage(currentPage)
			renderPaginationButtons(Math.ceil((data.length + 1) / itemsPerPage))
		})
		.catch(error => console.error(error))

	document.getElementById('openModal').onclick = function () {
		document.getElementById('addForm').style.display = 'block'
	}

	document.getElementById('closeModal').onclick = function () {
		document.getElementById('addForm').style.display = 'none'
	}

	document.getElementById('openRedModal').onclick = function () {
		document.getElementById('redForm').style.display = 'block'
	}

	document.getElementById('closeRedModal').onclick = function () {
		document.getElementById('redForm').style.display = 'none'
	}

	document.getElementById('openDelModal').onclick = function () {
		document.getElementById('delForm').style.display = 'block'
	}

	document.getElementById('closeDelModal').onclick = function () {
		document.getElementById('delForm').style.display = 'none'
	}

	document.getElementById('addRecord').onclick = function () {
		const name = document.getElementById('name1').value

		const data = { name }

		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}

		fetch(`${window.API_URL}/category/addCategory`, requestOptions)
			.then(response => {
				if (!response.ok) {
					throw new Error('Ошибка при добавлении данных')
				}
				return response.json()
			})
			.then(result => {
				console.log(result)
				alert('Данные добавлены')
				window.location.reload() // Обновляем страницу
			})
			.catch(error => alert(error))
	}

	document.getElementById('redRecord').onclick = function () {
		const id = document.getElementById('datainput').value
		const name = document.getElementById('name').value

		const data = { name }

		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}

		fetch(`${window.API_URL}/category/updateCategory/${id}`, requestOptions)
			.then(response => {
				if (!response.ok) {
					throw new Error('Ошибка при обновлении данных')
				}
				return response.json()
			})
			.then(result => {
				console.log(result)
				alert('Данные обновлены')
				window.location.reload() // Перезагружаем страницу для отображения изменений
			})
			.catch(error => alert(error))
	}

	document.getElementById('delRecord').onclick = function () {
		const id = document.getElementById('id3').value

		const requestOptions = {
			method: 'DELETE',
			redirect: 'follow',
		}

		fetch(`${window.API_URL}/category/deleteCategory/${id}`, requestOptions)
			.then(response => {
				if (!response.ok) {
					throw new Error('Ошибка при удалении данных')
				}
				alert('Данные успешно удалены')
				window.location.reload() // Перезагружаем страницу для отображения изменений
			})
			.catch(error => alert(error))
	}

	let currentPage = 1
	const itemsPerPage = 6 // Количество элементов на странице

	// Функция для отображения данных на текущей странице
	function showPage(pageNumber) {
		const table = document.getElementById('client');
		const rows = table.rows;
	
		// Определяем границы отображаемых данных
		const start = (pageNumber - 1) * itemsPerPage;
		const end = pageNumber * itemsPerPage;
	
		// Перебираем все строки таблицы (не включая заголовки) и скрываем лишние
		for (let i = 1; i < rows.length; i++) { // Начинаем с 1, пропуская первую строку (заголовок)
			if (i >= start && i < end) {
				rows[i].style.display = '';
			} else {
				rows[i].style.display = 'none';
			}
		}
	}

	// Функция для генерации кнопок пагинации
	function renderPaginationButtons(totalPages) {
		const paginationContainer = document.getElementById('paginationButtons')
		paginationContainer.innerHTML = ''

		for (let i = 1; i <= totalPages; i++) {
			const button = document.createElement('button')
			button.innerText = i
			button.addEventListener('click', () => {
				currentPage = i
				showPage(currentPage)
			})
			paginationContainer.appendChild(button)
		}
	}

	document.getElementById('searchInput').onkeyup = function () {
		var input, filter, table, tr, td, i, txtValue
		input = document.getElementById('searchInput')
		filter = input.value.toUpperCase()
		table = document.getElementById('client')
		tr = table.getElementsByTagName('tr')

		for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName('td')[1]
			if (td) {
				txtValue = td.textContent || td.innerText
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
					tr[i].style.display = ''
				} else {
					tr[i].style.display = 'none'
				}
			}
		}
	}

	document.getElementById('datainput').oninput = function (e) {
		let id = e.target.value
		const visitorId = parseInt(id)
		fetch(`${window.API_URL}/category/getCategory/${visitorId}`, requestOptions)
			.then(response => response.json())
			.then(data => {
				// e.target.value = data.id
				console.log(data)
				document.getElementById('name').value = data.name ?? ''
			})
			.catch(error => {
				console.log('error', error)
			})
	}

	document.getElementById('hamburger-open').onclick = function () {
		const hamburgerContent = document.querySelector('.hamburger-content')
		hamburgerContent.classList.toggle('active')
	}
}
