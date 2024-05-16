window.onload = function () {
	const requestOptions = {
		method: 'GET',
		redirect: 'follow',
	}
	fetch(`${window.API_URL}/visitor/getVisitor`, requestOptions)
		.then(response => response.json())
		.then(data => {
			const table = document.getElementById('client')
			const header = table.createTHead()
			const headerRow = header.insertRow(0)
			headerRow.insertCell(0).textContent = 'ID'
			headerRow.insertCell(1).textContent = 'Фамилия'
			headerRow.insertCell(2).textContent = 'Имя'
			headerRow.insertCell(3).textContent = 'Отчество'
			headerRow.insertCell(4).textContent = 'Телефон'
			headerRow.insertCell(5).textContent = 'Дата рождения'
			headerRow.insertCell(6).textContent = 'Логин'
			headerRow.insertCell(7).textContent = 'Пароль'
			headerRow.insertCell(8).textContent = 'Почта'
			headerRow.style.fontWeight = 'bold'

			data.forEach(client => {
				const date = new Date(client.dateofbirth)
				const formattedDate = date.toISOString().split('T')[0]
				const row = table.insertRow()
				row.insertCell(0).textContent = client.id
				row.insertCell(1).textContent = client.lastname
				row.insertCell(2).textContent = client.name
				row.insertCell(3).textContent = client.patronymic
				row.insertCell(4).textContent = client.phone
				row.insertCell(5).textContent = formattedDate
				row.insertCell(6).textContent = client.login
				row.insertCell(7).textContent = client.password
				row.insertCell(8).textContent = client.email
			})
			showPage(currentPage)
			renderPaginationButtons(Math.ceil((data.length + 1) / itemsPerPage))
		})
		.catch(error => console.error(error))

	function openModal() {
		document.getElementById('addForm').style.display = 'block'
	}

	function closeModal() {
		document.getElementById('addForm').style.display = 'none' // Закрываем модальное окно при нажатии на кнопку закрытия
	}

	function openRedModal() {
		document.getElementById('redForm').style.display = 'block'
	}

	function closeRedModal() {
		document.getElementById('redForm').style.display = 'none'
	}
	function openDelModal() {
		document.getElementById('delForm').style.display = 'block'
	}

	function closeDelModal() {
		document.getElementById('delForm').style.display = 'none'
	}
	let currentPage = 1
	const itemsPerPage = 10 // Количество элементов на странице

	// Функция для отображения данных на текущей странице
	function showPage(pageNumber) {
		const rows = document.getElementById('client').rows

		// Определяем границы отображаемых данных
		const start = (pageNumber - 1) * itemsPerPage
		const end = pageNumber * itemsPerPage

		// Перебираем все строки таблицы и скрываем лишние
		for (let i = 0; i < rows.length; i++) {
			if (i >= start && i < end) {
				rows[i].style.display = ''
			} else {
				rows[i].style.display = 'none'
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
	function searchTable() {
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
	function addRecord() {
		const lastname = document.getElementById('lastname1').value
		const name = document.getElementById('name1').value
		const patronymic = document.getElementById('patronymic1').value
		const phone = document.getElementById('phone1').value
		const dob = document.getElementById('dob1').value
		const login = document.getElementById('login1').value
		const password = document.getElementById('password1').value
		const email = document.getElementById('email1').value

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				lastname,
				name,
				patronymic,
				phone,
				dateofbirth: dob,
				login,
				password,
				email,
			}),
		}

		fetch(`${window.API_URL}/visitor/createVisitor`, requestOptions)
			.then(response => {
				if (!response.ok) {
					throw new Error('Ошибка при обновлении данных')
				}
				return response.json() // Parse the response JSON
			})
			.then(data => {
				alert(data.message) // Display the success message
				window.location.reload()
			})
			.catch(error => alert(error))
	}
	function redRecord() {
		const id = document.getElementById('id').value
		const lastname = document.getElementById('lastname').value
		const name = document.getElementById('name').value
		const patronymic = document.getElementById('patronymic').value
		const phone = document.getElementById('phone').value
		const dob = document.getElementById('dob').value
		const login = document.getElementById('login').value
		const password = document.getElementById('password').value
		const email = document.getElementById('email').value

		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id,
				lastname,
				name,
				patronymic,
				phone,
				dateofbirth: dob,
				login,
				password,
				email,
			}),
		}

		fetch(`${window.API_URL}/visitor/updateVisitor`, requestOptions)
			.then(response => {
				if (!response.ok) {
					throw new Error('Ошибка при обновлении данных')
				}
				return response.json()
			})
			.then(data => {
				alert(data.message)
				window.location.reload()
			})
			.catch(error => {
				alert(error)
			})
	}
	function delRecord() {
		const id = document.getElementById('id3').value

		const requestOptions = {
			method: 'DELETE',
			redirect: 'follow',
		}

		fetch(`${window.API_URL}/visitor/deleteVisitor/${id}`, requestOptions)
			.then(response => {
				if (!response.ok) {
					throw new Error('Ошибка при удалении данных')
				}
				alert('Данные успешно удалены')
				window.location.reload() // Перезагружаем страницу для отображения изменений
			})
			.catch(error => alert(error))
	}
	document.getElementById('id').addEventListener('input', function () {
		const id = this.value
		const visitorId = parseInt(id)
		if (id) {
			fetch(`${window.API_URL}/visitor/getVisitor/${visitorId}`, requestOptions)
				.then(response => response.json())
				.then(data => {
					const date = new Date(data.dateofbirth)
					const formattedDate = date.toISOString().split('T')[0]
					document.getElementById('id').value = data.id
					document.getElementById('lastname').value = data.lastname
					document.getElementById('name').value = data.name
					document.getElementById('patronymic').value = data.patronymic
					document.getElementById('phone').value = data.phone
					document.getElementById('dob').value = formattedDate
					document.getElementById('login').value = data.login
					document.getElementById('password').value = data.password
					document.getElementById('email').value = data.email
				})
				.catch(error => {
					console.log('error', error)
				})
		}
	})
	document.getElementById('hamburger-open').onclick = function () {
		const hamburgerContent = document.querySelector('.hamburger-content')
		hamburgerContent.classList.toggle('active')
	}
}
