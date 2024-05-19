window.onload = function () {
	const requestOptions = {
		method: 'GET',
		redirect: 'follow',
	}

	fetch(`${window.API_URL}/record//getRecord2`, requestOptions)
		.then(response => response.json()) // Изменили метод на response.json()
		.then(data => {
			const table = document.getElementById('client')
			const header = table.createTHead()
			const headerRow = header.insertRow(0)
			headerRow.insertCell(0).textContent = 'ID'
			headerRow.insertCell(1).textContent = 'Дата'
			headerRow.insertCell(2).textContent = 'Время'
			headerRow.insertCell(3).textContent = 'Категория услуги'
			headerRow.insertCell(4).textContent = 'Наименование услуги'
			headerRow.insertCell(5).textContent = 'Мастер'
			headerRow.insertCell(6).textContent = 'Id клиента'
			headerRow.insertCell(7).textContent = 'Клиент'
			headerRow.insertCell(8).textContent = 'Номер телефона клиента'
			headerRow.style.fontWeight = 'bold'

			data.forEach(record => {
				const row = table.insertRow()
				const date = new Date(record.day)
				const formattedDate = date.toISOString().split('T')[0]

				row.insertCell(0).textContent = record.id
				row.insertCell(1).textContent = formattedDate
				row.insertCell(2).textContent = record.time
				row.insertCell(3).textContent = record.category_name
				row.insertCell(4).textContent = record.service_name
				row.insertCell(5).textContent = record.master_name
				row.insertCell(6).textContent = record.id_client
				row.insertCell(7).textContent = record.client_name
				row.insertCell(8).textContent = record.client_phone
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

	let currentPage = 1
	const itemsPerPage = 7 // Количество элементов на странице

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

	document.getElementById('addRecord').onclick = function () {
		const recordData = {
			day: document.getElementById('data1').value,
			time: document.getElementById('time1').value,
			id_services: document.getElementById('name1').value,
			id_client: document.getElementById('idvisitor1').value,
			id_masters: document.getElementById('master1').value,
		}

		fetch(`${window.API_URL}/record/addRecord`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(recordData),
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Ошибка! Запись не добавлена')
				}
				return response.json()
			})
			.then(data => {
				alert('Запись добавлена', data)
				window.location.reload()
			})
			.catch(error => {
				alert('Ошибка! Запись не добавлена', error)
			})
	}

	document.getElementById('redRecord').onclick = function () {
		const id = document.getElementById('id').value;
		const idVisitorInput = document.getElementById('idvisitor').value;
		
		// Check if idVisitorInput is empty and set id_client accordingly
		const idClient = idVisitorInput.trim() ? idVisitorInput : null;
	
		const recordData = {
			day: document.getElementById('data').value,
			time: document.getElementById('time').value,
			id_services: document.getElementById('name').value,
			id_client: idClient, 
			id_masters: document.getElementById('master').value,
			id: id,
		}
	
		fetch(`${window.API_URL}/record/updateRecord/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(recordData),
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			alert('Данные успешно обновлены');
			window.location.reload();
		})
		.catch(error => {
			console.error('Error:', error);
		});
	}

	document.getElementById('searchInput').onkeyup = function () {
		var input, filter, table, tr, td, i, txtValue
		input = document.getElementById('searchInput')
		filter = input.value.toUpperCase()
		table = document.getElementById('client')
		tr = table.getElementsByTagName('tr')

		for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName('td')[4]
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

	document.getElementById('dellRecord').onclick = function () {
		const id = document.getElementById('id3').value

		const requestOptions = {
			method: 'DELETE',
			redirect: 'follow',
		}

		fetch(`${window.API_URL}/record/deleteRecord/${id}`, requestOptions)
			.then(response => {
				if (!response.ok) {
					throw new Error('Ошибка при удалении данных')
				}
				alert('Данные успешно удалены')
				window.location.reload()
			})
			.catch(error => alert(error))
	}

	//РЕДАКТИРОВАНИЕ
	fetch(`${window.API_URL}/category/getCategory`, requestOptions)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return response.json()
		})
		.then(data => {
			const selectElement = document.getElementById('category')
			data.forEach(category => {
				const option = document.createElement('option')
				option.value = category.id
				option.text = category.name
				selectElement.appendChild(option)
			})
		})
		.catch(error => {
			console.log('error', error)
		})

	// Получение списка мастеров
	fetch(`${window.API_URL}/masters/getMasters`, requestOptions)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return response.json()
		})
		.then(data => {
			const selectElementMaster = document.getElementById('master')
			data.forEach(master => {
				const option = document.createElement('option')
				option.value = master.id
				option.text = master.master_name
				selectElementMaster.appendChild(option)
			})
		})
		.catch(error => {
			console.log('error', error)
		})

	// Получение списка услуг
	fetch(`${window.API_URL}/services/getServices`, requestOptions)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return response.json()
		})
		.then(data => {
			const selectElementService = document.getElementById('name')
			data.forEach(service => {
				const option = document.createElement('option')
				option.value = service.id
				option.text = service.name
				selectElementService.appendChild(option)
			})
		})
		.catch(error => {
			console.log('error', error)
		})

	// Получение мастеров определенной категории
	const selectElement1 = document.getElementById('category')
	selectElement1.addEventListener('change', () => {
		const categoryId = selectElement1.value
		fetch(
			`${window.API_URL}/masters/getMasterByCategory/${categoryId}`,
			requestOptions
		)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				return response.json()
			})
			.then(data => {
				const selectElement = document.getElementById('master')
				selectElement.innerHTML = '' // Очистить предыдущие опции
				data.forEach(master => {
					const option = document.createElement('option')
					option.value = master.id
					option.text = master.master_name
					selectElement.appendChild(option)
				})
			})
			.catch(error => {
				console.log('error', error)
			})
	})

	// Получение услуг определенной категории
	selectElement1.addEventListener('change', () => {
		const categoryId = selectElement1.value
		fetch(
			`${window.API_URL}/services/getServicesByCategory/${categoryId}`,
			requestOptions
		)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				return response.json()
			})
			.then(data => {
				const selectElement = document.getElementById('name')
				selectElement.innerHTML = '' // Очистить предыдущие опции
				data.forEach(service => {
					const option = document.createElement('option')
					option.value = service.id
					option.text = service.name
					selectElement.appendChild(option)
				})
			})
			.catch(error => {
				console.log('error', error)
			})
	})

	//ДОБАВЛЕНИЕ
	fetch(`${window.API_URL}/category/getCategory`, requestOptions)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return response.json()
		})
		.then(data => {
			const selectElement = document.getElementById('category1')
			data.forEach(category => {
				const option = document.createElement('option')
				option.value = category.id
				option.text = category.name
				selectElement.appendChild(option)
			})
		})
		.catch(error => {
			console.log('error', error)
		})

	// Получение списка мастеров
	fetch(`${window.API_URL}/masters/getMasters`, requestOptions)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return response.json()
		})
		.then(data => {
			const selectElementMaster = document.getElementById('master1')
			data.forEach(master => {
				const option = document.createElement('option')
				option.value = master.id
				option.text = master.master_name
				selectElementMaster.appendChild(option)
			})
		})
		.catch(error => {
			console.log('error', error)
		})

	// Получение списка услуг
	fetch(`${window.API_URL}/services/getServices`, requestOptions)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return response.json()
		})
		.then(data => {
			const selectElementService = document.getElementById('name1')
			data.forEach(service => {
				const option = document.createElement('option')
				option.value = service.id
				option.text = service.name
				selectElementService.appendChild(option)
			})
		})
		.catch(error => {
			console.log('error', error)
		})

	// Получение мастеров определенной категории
	const selectElement3 = document.getElementById('category1')
	selectElement3.addEventListener('change', () => {
		const categoryId = selectElement3.value
		fetch(
			`${window.API_URL}/masters/getMasterByCategory/${categoryId}`,
			requestOptions
		)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				return response.json()
			})
			.then(data => {
				const selectElement = document.getElementById('master1')
				selectElement.innerHTML = '' // Очистить предыдущие опции
				data.forEach(master => {
					const option = document.createElement('option')
					option.value = master.id
					option.text = master.master_name
					selectElement.appendChild(option)
				})
			})
			.catch(error => {
				console.log('error', error)
			})
	})

	// Получение услуг определенной категории
	selectElement3.addEventListener('change', () => {
		const categoryId = selectElement3.value
		fetch(
			`${window.API_URL}/services/getServicesByCategory/${categoryId}`,
			requestOptions
		)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				return response.json()
			})
			.then(data => {
				const selectElement = document.getElementById('name1')
				selectElement.innerHTML = '' // Очистить предыдущие опции
				data.forEach(service => {
					const option = document.createElement('option')
					option.value = service.id
					option.text = service.name
					selectElement.appendChild(option)
				})
			})
			.catch(error => {
				console.log('error', error)
			})
	})

	document.getElementById('id').addEventListener('input', function () {
		const id = this.value
		const recordId = parseInt(id)
		if (id) {
			fetch(`${window.API_URL}/record/getRecord/${recordId}`, requestOptions)
				.then(response => response.json())
				.then(data => {
					const date = new Date(data.day)
					const formattedDate = date.toISOString().split('T')[0]
					document.getElementById('id').value = data.id
					document.getElementById('data').value = formattedDate
					document.getElementById('time').value = data.time
					const selectElementCategory = document.getElementById('category')
					const categoryId = data.id_category_service
					selectElementCategory.value = categoryId
					const selectElementService = document.getElementById('name')
					const serviceId = data.id_services
					selectElementService.value = serviceId
					const selectElementmaster = document.getElementById('master')
					const masterId = data.id_masters
					selectElementmaster.value = masterId
					document.getElementById('idvisitor').value = data.id_client
					document.getElementById('visitor').value = data.client_name
					document.getElementById('phone').value = data.client_phone
				})
				.catch(error => {
					console.log('error', error)
				})
		}
	})
	document.getElementById('idvisitor1').addEventListener('input', function () {
		const id = this.value
		const clientId = parseInt(id)
		if (id) {
			fetch(`${window.API_URL}/visitor/getVisitor/${clientId}`, requestOptions)
				.then(response => response.json())
				.then(data => {
					document.getElementById('idvisitor1').value = data.id
					document.getElementById('visitor1').value = data.client_name
					document.getElementById('phone1').value = data.phone
				})
				.catch(error => console.log('error', error))
		}
	})
	document.getElementById('idvisitor').addEventListener('input', function () {
		const id = this.value
		const clientId = parseInt(id)
		if (id) {
			fetch(`${window.API_URL}/visitor/getVisitor/${clientId}`, requestOptions)
				.then(response => response.json())
				.then(data => {
					document.getElementById('idvisitor').value = data.id
					document.getElementById('visitor').value = data.client_name
					document.getElementById('phone').value = data.phone
				})
				.catch(error => console.log('error', error))
		}
	})

	document.getElementById('hamburger-open').onclick = function () {
		const hamburgerContent = document.querySelector('.hamburger-content')
		hamburgerContent.classList.toggle('active')
	}
}
