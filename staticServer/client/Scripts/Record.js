document.addEventListener('DOMContentLoaded', async () => {
	const id = localStorage.getItem('userId')
	document.querySelector('.id2').textContent = 'Ваш id ' + id

	const categorySelect = document.getElementById('categorySelect')
	const serviceSelect = document.getElementById('serviceSelect')
	const daySelect = document.getElementById('daySelect')
	const timeSelect = document.getElementById('timeSelect')
	const recordsTable = document.getElementById('recordsTable')

	if (
		!categorySelect ||
		!serviceSelect ||
		!daySelect ||
		!timeSelect ||
		!recordsTable
	) {
		console.error(
			'Не удалось найти один или несколько необходимых элементов на странице'
		)
		return
	}

	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	// Функция для заполнения select элемента
	const fillSelectElement = (selectElement, data, defaultOptionText) => {
		selectElement.innerHTML = `<option>--${defaultOptionText}--</option>`
		data.forEach(item => {
			if (item && item.id && item.name) {
				const option = document.createElement('option')
				option.textContent = item.name
				option.value = item.id
				selectElement.appendChild(option)
			} else {
				console.warn('Некорректный формат данных:', item)
			}
		})
	}

	try {
		// Заполнение категорий
		let response = await fetch(
			`${window.API_URL}/category/getCategory`,
			requestOptions
		)
		let data = await response.json()
		fillSelectElement(categorySelect, data, 'Выберите категорию')

		categorySelect.addEventListener('change', async function () {
			const categoryId = this.value

			// Обновление записей таблицы по категории
			response = await fetch(
				`${window.API_URL}/record/getRecordbyCategory/${categoryId}`,
				requestOptions
			)
			data = await response.json()
			updateRecordsTable(data)

			// Обновление услуг по категории
			serviceSelect.innerHTML = '<option>--Выберите услугу--</option>'
			response = await fetch(
				`${window.API_URL}/services/getServicesByCategory/${categoryId}`,
				requestOptions
			)
			data = await response.json()
			console.log(data)
			fillSelectElement(serviceSelect, data, 'Выберите услугу')
		})

		serviceSelect.addEventListener('change', async function () {
			const serviceId = this.value

			// Обновление дней по услуге
			daySelect.innerHTML = '<option>--Выберите день--</option>'
			response = await fetch(
				`${window.API_URL}/record/getRecordbyService/${serviceId}`,
				requestOptions
			)
			data = await response.json()
			console.log(data)
			fillSelectElement(
				daySelect,
				data.map(day => ({
					id: day.day,
					name: new Date(day.day).toISOString().split('T')[0],
				})),
				'Выберите день'
			)

			// Обновление записей таблицы по услуге
			updateRecordsTable(data)
		})

		daySelect.addEventListener('change', async function () {
			const selectedDay = this.value
			console.log(selectedDay)

			// Обновление времени по дню
			timeSelect.innerHTML = '<option>--Выберите время--</option>'
			response = await fetch(
				`${window.API_URL}/record/getRecordbyDay/${selectedDay}`,
				requestOptions
			)
			data = await response.json()
			console.log('Данные для времени:', data) // Добавляем логирование данных для отладки
			fillSelectElement(
				timeSelect,
				data.map(record => ({
					id: record.time,
					name: record.time,
				})),
				'Выберите время'
			)

			// Обновление записей таблицы по дню
			updateRecordsTable(data)
		})

		timeSelect.addEventListener('change', async function () {
			const selectedTime = this.value

			// Обновление записей таблицы по времени
			response = await fetch(
				`${window.API_URL}/record/getRecordbyTime/${selectedTime}`,
				requestOptions
			)
			data = await response.json()
			updateRecordsTable(data)
		})
	} catch (error) {
		alert('Произошла ошибка при загрузке данных: ' + error.message)
	}

	function updateRecordsTable(records) {
		const tbody = recordsTable.querySelector('tbody')
		tbody.innerHTML = '' // очищаем содержимое tbody перед заполнением новыми записями

		records.forEach(record => {
			const row = document.createElement('tr')
			const formattedDate = new Date(record.day).toISOString().split('T')[0]
			row.innerHTML = `
                <td>${record.category_name}</td>
                <td>${record.service_name}</td>
                <td>${record.master_name}</td>
                <td>${formattedDate}</td>
                <td>${record.time}</td>
            `
			tbody.appendChild(row)
		})
	}

	document.getElementById('submitBtn').addEventListener('click', async () => {
		let services, day, time
		const selectedTime = timeSelect.value

		try {
			const response = await fetch(
				`${window.API_URL}/record/getRecordbyTime/${selectedTime}`,
				requestOptions
			)
			const data = await response.json()
			data.forEach(record => {
				services = record.id_service
				day = record.day
				time = record.time
			})

			const postData = {
				id_client: id,
				id_services: services,
				day: day,
				time: time,
			}

			const postResponse = await fetch(
				`${window.API_URL}/record/createRecord`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(postData),
				}
			)

			if (postResponse.ok) {
				alert('Запись успешно создана')
				window.location.reload()
			} else {
				alert('Ошибка при создании записи на сервере.')
			}
		} catch (error) {
			alert('Произошла ошибка при создании записи: ' + error.message)
		}
	})

	// Открытие и закрытие модального окна
	window.openModal = async function () {
		const selectedTime = timeSelect.value
		if (selectedTime === '--Выберите время--') {
			document.getElementById('modal').style.display = 'none'
			return
		}

		try {
			const response = await fetch(
				`${window.API_URL}/record/getRecordbyTime/${selectedTime}`,
				requestOptions
			)
			const data = await response.json()
			data.forEach(record => {
				const formattedDate = new Date(record.day).toISOString().split('T')[0]
				document.querySelector('.services').textContent =
					'Услуга: ' + record.service_name
				document.querySelector('.master').textContent =
					'Мастер: ' + record.master_name
				document.querySelector('.day').textContent = 'Дата: ' + formattedDate
				document.querySelector('.time2').textContent = 'Время: ' + record.time
			})

			document.getElementById('modal').style.display = 'block'
		} catch (error) {
			alert('Ошибка при загрузке записи: ' + error.message)
		}
	}

	window.closeModal = function () {
		document.getElementById('modal').style.display = 'none'
	}

	// Функции для удаления записи
	window.delrecord = function () {
		document.getElementById('delForm').style.display = 'block'
	}

	window.closeDelModal = function () {
		document.getElementById('delForm').style.display = 'none'
	}

	window.delRecord2 = async function () {
		const id2 = document.getElementById('id4').value
		try {
			const response = await fetch(
				`${window.API_URL}/record/delClient/${id2}`,
				requestOptions
			)
			if (response.status === 204) {
				alert('Запись успешно удалена')
				location.reload()
			} else {
				throw new Error('Ошибка удаления записи')
			}
		} catch (error) {
			alert('Произошла ошибка при удалении записи: ' + error.message)
		}
	}

	// Функция для переключения отображения записей
	window.ToggleRecords = async function () {
		const recordElement = document.getElementById('record')
		const recordChildren = recordElement.children
		document.getElementById('id3').style.display = 'block'
		document.getElementById('button2').style.display = 'none'
		document.getElementById('button3').style.display = 'block'

		for (let i = 0; i < recordChildren.length; i++) {
			const child = recordChildren[i]
			if (!child.matches('table#recordsTable')) {
				child.style.display = 'none'
			}
		}

		// Удаление всех предыдущих обработчиков событий перед добавлением новых
		const newButton4 = document.getElementById('button4').cloneNode(true)
		document.getElementById('button4').replaceWith(newButton4)

		try {
			const response = await fetch(
				`${window.API_URL}/record/getRecordbyClient/${id}`,
				requestOptions
			)
			const data = await response.json()
			updateRecordsTable(data)
			document.getElementById('button4').style.display = 'block'
		} catch (error) {
			alert('Ошибка при загрузке записей: ' + error.message)
		}
	}

	window.Records = function () {
		window.location.reload()
	}
})

// const id = localStorage.getItem('userId')
// document.querySelector('.id2').textContent = 'Ваш id ' + id
// const categorySelect = document.getElementById('categorySelect')
// const requestOptions = {
// 	method: 'GET',
// 	headers: {
// 		'Content-Type': 'application/json',
// 	},
// }
// const recordsTable = document.getElementById('recordsTable')
// fetch(`${window.API_URL}/category/getCategory`, requestOptions)
// 	.then(response => response.json())
// 	.then(data => {
// 		console.log(data)
// 		data.forEach(category => {
// 			const option = document.createElement('option')
// 			option.textContent = category.name
// 			option.value = category.id
// 			categorySelect.appendChild(option)
// 		})
// 	})
// 	.catch(error => alert('Ошибка при загрузке категорий:', error))

// categorySelect.addEventListener('change', function () {
// 	const categoryId = this.value
// 	fetch(
// 		`${window.API_URL}/record/getRecordbyCategory/${categoryId}`,
// 		requestOptions
// 	)
// 		.then(response => response.json())
// 		.then(data => {
// 			const tbody = recordsTable.querySelector('tbody')
// 			tbody.innerHTML = ''
// 			data.forEach(record => {
// 				const row = document.createElement('tr')
// 				const date2 = new Date(record.day)
// 				const formattedDate2 = `${date2.getFullYear()}-${String(
// 					date2.getMonth() + 1
// 				).padStart(2, '0')}-${String(date2.getDate()).padStart(2, '0')}`
// 				row.innerHTML = `
//                   <td>${record.category_name}</td>
//                   <td>${record.service_name}</td>
//                   <td>${record.master_name}</td>
//                   <td>${formattedDate2}</td>
//                   <td>${record.time}</td>
//               `
// 				tbody.appendChild(row)
// 			})
// 		})
// 		.catch(error => alert('Ошибка при загрузке категорий:', error))

// 	// Очищаем список услуг перед загрузкой новых
// 	serviceSelect.innerHTML = '<option>--Выберите услугу--</option>'

// 	fetch(
// 		`${window.API_URL}/services/getServicesByCategory/${categoryId}`,
// 		requestOptions
// 	)
// 		.then(response => response.json())
// 		.then(data => {
// 			data.forEach(service => {
// 				const option = document.createElement('option')
// 				option.textContent = service.name
// 				option.value = service.id
// 				serviceSelect.appendChild(option)
// 			})
// 		})
// 		.catch(error => alert('Ошибка при загрузке услуг:', error))
// })
// const daySelect = document.getElementById('daySelect')
// serviceSelect.addEventListener('change', function () {
// 	const serviceId = this.value

// 	// Очищаем список дней перед загрузкой новых
// 	daySelect.innerHTML = '<option>--Выберите день--</option>'

// 	fetch(
// 		`${window.API_URL}/record/getRecordbyService/${serviceId}`,
// 		requestOptions
// 	)
// 		.then(response => response.json())
// 		.then(data => {
// 			data.forEach(day => {
// 				const option = document.createElement('option')
// 				const date = new Date(day.day)
// 				const formattedDate = `${date.getFullYear()}-${String(
// 					date.getMonth() + 1
// 				).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
// 				option.textContent = formattedDate
// 				option.value = day.date
// 				daySelect.appendChild(option)
// 			})
// 			const tbody = recordsTable.querySelector('tbody')
// 			tbody.innerHTML = '' // очищаем содержимое tbody перед заполнением новыми записями

// 			data.forEach(record => {
// 				const row = document.createElement('tr')
// 				const date2 = new Date(record.day)
// 				const formattedDate2 = `${date2.getFullYear()}-${String(
// 					date2.getMonth() + 1
// 				).padStart(2, '0')}-${String(date2.getDate()).padStart(2, '0')}`
// 				row.innerHTML = `
//                   <td>${record.category_name}</td>
//                   <td>${record.service_name}</td>
//                   <td>${record.master_name}</td>
//                   <td>${formattedDate2}</td>
//                   <td>${record.time}</td>
//               `
// 				tbody.appendChild(row)
// 			})
// 		})
// 		.catch(error => alert('Ошибка при загрузке дней:', error))
// })
// daySelect.addEventListener('change', function () {
// 	const selectedDayIndex = this.selectedIndex
// 	const selectedDay = this.options[selectedDayIndex].text
// 	const timeSelect = document.getElementById('timeSelect')
// 	timeSelect.innerHTML = '<option>--Выберите время--</option>'
// 	fetch(
// 		`${window.API_URL}/record/getRecordbyDay/${selectedDay}`,
// 		requestOptions
// 	)
// 		.then(response => response.json())
// 		.then(data => {
// 			data.forEach(record => {
// 				data.forEach(day => {
// 					const option = document.createElement('option')
// 					option.textContent = day.time
// 					option.value = day.time
// 					timeSelect.appendChild(option)
// 				})
// 				const tbody = recordsTable.querySelector('tbody')
// 				tbody.innerHTML = '' // очищаем содержимое tbody перед заполнением новыми записями
// 				const date2 = new Date(record.day)
// 				const formattedDate2 = `${date2.getFullYear()}-${String(
// 					date2.getMonth() + 1
// 				).padStart(2, '0')}-${String(date2.getDate()).padStart(2, '0')}`
// 				const row = document.createElement('tr')
// 				row.innerHTML = `
//                       <td>${record.category_name}</td>
//                       <td>${record.service_name}</td>
//                       <td>${record.master_name}</td>
//                       <td>${formattedDate2}</td>
//                       <td>${record.time}</td>
//                   `
// 				tbody.appendChild(row)
// 			})
// 		})
// 		.catch(error => alert('Ошибка при загрузке записей:', error))
// })
// function openModal() {
// 	var timeSelect = document.getElementById('timeSelect')
// 	var selectedTime = timeSelect.options[timeSelect.selectedIndex].text
// 	document.querySelector('.services').textContent = ''
// 	document.querySelector('.master').textContent = ''
// 	document.querySelector('.day').textContent = ''
// 	document.querySelector('.time2').textContent = ''
// 	document.getElementById('modal').style.display = 'block'
// 	if (
// 		categorySelect === '--Выберите категорию--' ||
// 		serviceSelect === '--Выберите услугу--' ||
// 		daySelect === '--Выберите день--' ||
// 		timeSelect === '--Выберите время--'
// 	) {
// 		document.getElementById('modal').style.display = 'none'
// 	} else {
// 		fetch(
// 			`${window.API_URL}/record/getRecordbyTime/${selectedTime}`,
// 			requestOptions
// 		)
// 			.then(response => response.json())
// 			.then(data => {
// 				data.forEach(record => {
// 					const date2 = new Date(record.day)
// 					const formattedDate2 = `${date2.getFullYear()}-${String(
// 						date2.getMonth() + 1
// 					).padStart(2, '0')}-${String(date2.getDate()).padStart(2, '0')}`
// 					document.querySelector('.services').textContent =
// 						'Услуга: ' + record.service_name
// 					document.querySelector('.master').textContent =
// 						'Мастер: ' + record.master_name
// 					document.querySelector('.day').textContent = 'Дата: ' + formattedDate2
// 					document.querySelector('.time2').textContent = 'Время: ' + record.time
// 				})
// 			})
// 			.catch(error => alert('Ошибка при загрузке записей:', error))
// 	}
// }

// function closeModal() {
// 	document.getElementById('modal').style.display = 'none' // Закрываем модальное окно при нажатии на кнопку закрытия
// }
// document.getElementById('submitBtn').addEventListener('click', async () => {
// 	let services, day, time // Объявляем переменные здесь

// 	var timeSelect = document.getElementById('timeSelect')
// 	var selectedTime = timeSelect.options[timeSelect.selectedIndex].text
// 	const id = localStorage.getItem('userId')

// 	fetch(
// 		`${window.API_URL}/record/getRecordbyTime/${selectedTime}`,
// 		requestOptions
// 	)
// 		.then(response => response.json())
// 		.then(data => {
// 			data.forEach(record => {
// 				services = record.id_service
// 				day = record.day
// 				time = record.time
// 			})
// 		})
// 		.catch(error => alert('Ошибка при загрузке записей:', error))

// 	const data = {
// 		id_client: id,
// 		id_services: services,
// 		day: day,
// 		time: time,
// 	}

// 	try {
// 		const response = await fetch(`${window.API_URL}/record/createRecord`, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify(data),
// 		})

// 		if (response.ok) {
// 			alert('Запись успешно создана')
// 			window.location.reload()
// 		} else {
// 			alert('Ошибка при создании записи на сервере.')
// 		}
// 	} catch (error) {
// 		alert('Произошла ошибка:', error)
// 	}
// })
// function toggleRecords() {
// 	const recordElement = document.getElementById('record')

// 	// Получаем все дочерние элементы элемента с id="record"
// 	const recordChildren = recordElement.children
// 	document.getElementById('id3').style.display = 'block'
// 	document.getElementById('button2').style.display = 'none'
// 	document.getElementById('button3').style.display = 'block'
// 	// Проходим по всем дочерним элементам и скрываем те, которые не нужно показывать
// 	for (let i = 0; i < recordChildren.length; i++) {
// 		const child = recordChildren[i]
// 		if (!child.matches('table#recordsTable')) {
// 			child.style.display = 'none'
// 		}
// 	}
// 	fetch(`${window.API_URL}/record/getRecordbyClient/${id}`, requestOptions)
// 		.then(response => response.json())
// 		.then(data => {
// 			const tbody = recordsTable.querySelector('tbody')
// 			tbody.innerHTML = ''
// 			data.forEach(record => {
// 				const row = document.createElement('tr')
// 				const date2 = new Date(record.day)
// 				const formattedDate2 = `${date2.getFullYear()}-${String(
// 					date2.getMonth() + 1
// 				).padStart(2, '0')}-${String(date2.getDate()).padStart(2, '0')}`
// 				row.innerHTML = `
//                   <td>${record.id}</td>
//                   <td>${record.category_name}</td>
//                   <td>${record.service_name}</td>
//                   <td>${record.master_name}</td>
//                   <td>${formattedDate2}</td>
//                   <td>${record.time}</td>
//               `
// 				tbody.appendChild(row)
// 			})
// 		})
// 		.catch(error => alert('Ошибка при загрузке', error))
// 	document.getElementById('button4').style.display = 'block'
// }
// function Records() {
// 	window.location.reload()
// }
// function delrecord() {
// 	document.getElementById('delForm').style.display = 'block'
// }
// function closeDelModal() {
// 	document.getElementById('delForm').style.display = 'none'
// }
// function delRecord2() {
// 	const id2 = document.getElementById('id4').value
// 	fetch(`${window.API_URL}/record/delClient/${id2}`, requestOptions)
// 		.then(response => {
// 			if (response.status === 204) {
// 				alert('Запись успешно удалена')
// 				location.reload()
// 			} else {
// 				throw new Error('Ошибка удаления записи')
// 			}
// 		})
// 		.catch(error => alert(error.message))
// }
