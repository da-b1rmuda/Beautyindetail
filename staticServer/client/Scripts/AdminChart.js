window.onload = function () {
	fetch(`${window.API_URL}/record/revenueByMonth`)
		.then(response => {
			if (!response.ok) {
				throw new Error('Ошибка при получении данных о прибыли')
			}
			return response.json()
		})
		.then(data => {
			if (!Array.isArray(data)) {
				throw new Error('Данные о прибыли не являются массивом')
			}

			const months = data.map(entry => getMonthName(entry.month))
			const revenues = data.map(entry => entry.total_revenue)

			const ctxRevenue = document
				.getElementById('revenue-chart')
				.getContext('2d')
			new Chart(ctxRevenue, {
				type: 'bar',
				data: {
					labels: months,
					datasets: [
						{
							label: 'Прибыль',
							data: revenues,
							backgroundColor: 'rgba(54, 162, 235, 0.6)',
							borderColor: 'rgba(54, 162, 235, 1)',
							borderWidth: 1,
						},
					],
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				},
			})

			// После успешной загрузки прибыли, загрузим данные о посещаемости
			loadVisitsChartData()
		})
		.catch(error => console.error(error))

	function loadVisitsChartData() {
		fetch(`${window.API_URL}/record/recordCompleteness`)
			.then(response => {
				if (!response.ok) {
					throw new Error('Ошибка при получении данных о посещаемости')
				}
				return response.json()
			})
			.then(data => {
				if (!Array.isArray(data)) {
					data = [data] 
				}

				const completenessData = data.map(entry => {
					const filledRecords = parseInt(entry.filled_records)
					const emptyRecords = parseInt(entry.empty_records)
					const totalRecords = filledRecords + emptyRecords
					const filledPercentage = (filledRecords / totalRecords) * 100
					const emptyPercentage = (emptyRecords / totalRecords) * 100
					return [filledPercentage, emptyPercentage]
				})

				const ctxVisits = document
					.getElementById('visits-chart')
					.getContext('2d')
				new Chart(ctxVisits, {
					type: 'doughnut',
					data: {
						labels: ['Заполненные окна', 'Пустые окна'],
						datasets: [
							{
								label: 'Процент посещаемости',
								data: completenessData[0], 
								backgroundColor: [
									'rgba(75, 192, 192, 0.6)',
									'rgba(255, 99, 132, 0.6)',
								],
								borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
								borderWidth: 1,
							},
						],
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						cutout: 80,
						plugins: {
							legend: {
								display: true,
								position: 'bottom',
							},
							title: {
								display: true,
								text: 'Процент посещаемости',
							},
						},
					},
				})
			})
			.catch(error => console.error(error))
	}

	function getMonthName(monthNumber) {
		const monthNames = [
			'Январь',
			'Февраль',
			'Март',
			'Апрель',
			'Май',
			'Июнь',
			'Июль',
			'Август',
			'Сентябрь',
			'Октябрь',
			'Ноябрь',
			'Декабрь',
		]
		return monthNames[monthNumber - 1]
	}

	document.getElementById('hamburger-open').onclick = function () {
		const hamburgerContent = document.querySelector('.hamburger-content')
		hamburgerContent.classList.toggle('active')
	}
}

function getMonthName(monthNumber) {
	const monthNames = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь',
	]
	return monthNames[monthNumber - 1]
}

const init = async () => {
	try {
		const { jsPDF } = await import('https://cdn.skypack.dev/jspdf');
		const { autoTable } = await import('https://cdn.skypack.dev/jspdf-autotable');


		document.getElementById('download-report-btn').addEventListener('click', async () => {
			try {
				const response = await fetch(`${window.API_URL}/record/revenueByMonth`);
				const data = await response.json();

				const doc = new jsPDF();

				doc.addFileToVFS('times-new-roman-cyr.ttf', window.timesFont);
				doc.addFont('times-new-roman-cyr.ttf', 'times-new-roman-cyr', 'normal');

				doc.setFont('times-new-roman-cyr');
				doc.setFontSize(16);

				doc.text('Салон красоты Beauty in detail', 120, 10);
				doc.text('Отчет прибыли', 85, 20);

				const tableData = [];
				data.forEach((item) => {
					tableData.push([getMonthName(item.month), item.total_revenue]);
				});

				doc.autoTable({
					startY: 25, 
					head: [['Месяц', 'Прибыль']],
					body: tableData,
					didParseCell: function (data) {
						if (data.section === 'head') {
							data.cell.styles.halign = 'center';
						}
						data.cell.styles.font = 'times-new-roman-cyr';
					}
				});

				doc.save('отчет.pdf');
			} catch (error) {
				console.error('Произошла ошибка:', error);
			}
		});
	} catch (error) {
		console.error('Ошибка при импорте jsPDF:', error);
	}
};

init();