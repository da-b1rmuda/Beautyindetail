window.onload = function () {
	const requestOptions = {
		method: 'GET',
		redirect: 'follow',
	}

	fetch(`${window.API_URL}/masters/getMasters`, requestOptions)
		.then(response => response.json())
		.then(data => {
			const table = document.getElementById('client')

			// Добавление заголовков
			const header = table.createTHead()
			const headerRow = header.insertRow(0)
			headerRow.insertCell(0).textContent = 'ID'
			headerRow.insertCell(1).textContent = 'Фамилия'
			headerRow.insertCell(2).textContent = 'Имя'
			headerRow.insertCell(3).textContent = 'Отчество'
			headerRow.insertCell(4).textContent = 'Телефон'
			headerRow.insertCell(5).textContent = 'Адрес'
			headerRow.insertCell(6).textContent = 'Опыт работы'
			headerRow.insertCell(7).textContent = 'Дата рождения'
			headerRow.insertCell(8).textContent = 'Описание'
			headerRow.insertCell(9).textContent = 'Категория услуг'
			headerRow.style.fontWeight = 'bold'

			// Добавление данных о мастерах
			data.forEach(master => {
				const row = table.insertRow()
				const date = new Date(master.date_of_birth)
				const formattedDate = date.toISOString().split('T')[0]
				row.insertCell(0).textContent = master.id
				row.insertCell(1).textContent = master.lastname
				row.insertCell(2).textContent = master.name
				row.insertCell(3).textContent = master.patronymic
				row.insertCell(4).textContent = master.phone
				row.insertCell(5).textContent = master.address
				row.insertCell(6).textContent = master.work_experience
				row.insertCell(7).textContent = formattedDate
				row.insertCell(8).textContent = master.description
				row.insertCell(9).textContent = master.category_name
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
		const lastname = document.getElementById('lastname1').value
		const patronymic = document.getElementById('patronymic1').value
		const idcategoryservice = document.getElementById('services1').value
		const phone = document.getElementById('phone1').value
		const address = document.getElementById('adress1').value
		const work_experience = document.getElementById('text1').value
		const description = document.getElementById('text2').value
		const date_of_birth = document.getElementById('dob1').value

		const masterData = {
			name: name,
			lastname: lastname,
			patronymic: patronymic,
			idcategoryservice: idcategoryservice,
			phone: phone,
			address: address,
			work_experience: work_experience,
			description: description,
			date_of_birth: date_of_birth,
		}

		fetch(`${window.API_URL}/masters/addMaster`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(masterData),
		})
			.then(response => response.json())
			.then(data => {
				console.log(data)
				alert('Данные успешно добавлены')
				window.location.reload()
			})
			.catch(error => {
				console.error('Error:', error)
			})
	}

	let currentPage = 1
	const itemsPerPage = 2 // Количество элементов на странице

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

	document.getElementById('redRecord').onclick = function () {
		const id = document.getElementById('id').value
		const name = document.getElementById('name').value
		const lastname = document.getElementById('lastname').value
		const patronymic = document.getElementById('patronymic').value
		const idcategoryservice = document.getElementById('services').value
		const phone = document.getElementById('phone').value
		const address = document.getElementById('adress').value
		const work_experience = document.getElementById('text3').value
		const description = document.getElementById('text4').value
		const date_of_birth = document.getElementById('dob').value

		const masterData = {
			name: name,
			lastname: lastname,
			patronymic: patronymic,
			idcategoryservice: idcategoryservice,
			phone: phone,
			address: address,
			work_experience: work_experience,
			description: description,
			date_of_birth: date_of_birth,
		}

		fetch(`${window.API_URL}/masters/updateMaster/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(masterData),
		})
			.then(response => response.json())
			.then(data => {
				console.log(data)
				alert('Данные успешно обновлены')
				window.location.reload()
			})
			.catch(error => {
				console.error('Error:', error)
			})
	}

	document.getElementById('delRecord').onclick = function () {
		const id = document.getElementById('id3').value

		const requestOptions = {
			method: 'DELETE',
			redirect: 'follow',
		}

		fetch(`${window.API_URL}/masters/deleteMaster/${id}`, requestOptions)
			.then(response => {
				if (!response.ok) {
					throw new Error('Ошибка при удалении данных')
				}
				alert('Данные успешно удалены')
				window.location.reload() // Reload the page to reflect changes
			})
			.catch(error => alert(error))
	}

	fetch(`${window.API_URL}/category/getCategory`, requestOptions)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return response.json()
		})
		.then(data => {
			const selectElement1 = document.getElementById('services1')
			const selectElement = document.getElementById('services')
			data.forEach(category => {
				const option1 = document.createElement('option')
				option1.value = category.id // Установите значение опции на id категории
				option1.text = category.name // Установите текст опции на имя категории

				const option2 = document.createElement('option')
				option2.value = category.id // Установите значение опции на id категории
				option2.text = category.name // Установите текст опции на имя категории

				selectElement.appendChild(option1)
				selectElement1.appendChild(option2)
			})
		})
		.catch(error => {
			console.log('error', error)
		})
	document.getElementById('id').addEventListener('input', function () {
		const id = this.value
		const masterId = parseInt(id)
		if (id) {
			fetch(`${window.API_URL}/masters/getMasters/${masterId}`, requestOptions)
				.then(response => response.json())
				.then(data => {
					const date = new Date(data.date_of_birth)
					const formattedDate = date.toISOString().split('T')[0]
					document.getElementById('id').value = data.id
					document.getElementById('lastname').value = data.lastname
					document.getElementById('name').value = data.name
					document.getElementById('patronymic').value = data.patronymic
					document.getElementById('phone').value = data.phone
					document.getElementById('adress').value = data.address
					document.getElementById('text3').value = data.work_experience
					document.getElementById('dob').value = formattedDate
					document.getElementById('text4').value = data.description
					const selectElement = document.getElementById('services')
					const categoryId = data.idcategoryservice
					selectElement.value = categoryId
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
