const id = localStorage.getItem('userId');
document.querySelector('.id2').textContent = 'Ваш id '+id;
const categorySelect = document.getElementById('categorySelect');
const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};
const recordsTable = document.getElementById('recordsTable');
fetch(`${window.API_URL}/category/getCategory`, requestOptions)
    .then(response => response.json())
    .then(data => {
        data.forEach(category => {
            const option = document.createElement('option');
            option.textContent = category.name;
            option.value = category.id;
            categorySelect.appendChild(option);
        });
    })
    .catch(error => alert('Ошибка при загрузке категорий:', error));

    categorySelect.addEventListener('change', function() {
      const categoryId = this.value;
  fetch(`${window.API_URL}/record/getRecordbyCategory/${categoryId}`, requestOptions)
    .then(response => response.json())
    .then(data => {
      const tbody = recordsTable.querySelector('tbody');
          tbody.innerHTML = '';
          data.forEach(record => {
              const row = document.createElement('tr');
              const date2 = new Date(record.day);
              const formattedDate2 = `${date2.getFullYear()}-${String(date2.getMonth() + 1).padStart(2, '0')}-${String(date2.getDate()).padStart(2, '0')}`;
              row.innerHTML = `
                  <td>${record.category_name}</td>
                  <td>${record.service_name}</td>
                  <td>${record.master_name}</td>
                  <td>${formattedDate2}</td>
                  <td>${record.time}</td>
              `;
              tbody.appendChild(row);
          });
        })
        .catch(error => alert('Ошибка при загрузке категорий:', error));

      // Очищаем список услуг перед загрузкой новых
      serviceSelect.innerHTML = '<option>--Выберите услугу--</option>';
  
      fetch(`${window.API_URL}/services/getServicesByCategory/${categoryId}`, requestOptions)
          .then(response => response.json())
          .then(data => {
              data.forEach(service => {
                  const option = document.createElement('option');
                  option.textContent = service.name;
                  option.value = service.id;
                  serviceSelect.appendChild(option);
              });
          })
          .catch(error => alert('Ошибка при загрузке услуг:', error));
        });
  const daySelect = document.getElementById('daySelect');
  serviceSelect.addEventListener('change', function() {
      const serviceId = this.value;
  
      // Очищаем список дней перед загрузкой новых
      daySelect.innerHTML = '<option>--Выберите день--</option>';
  
      fetch(`${window.API_URL}/record/getRecordbyService/${serviceId}`, requestOptions)
      .then(response => response.json())
      .then(data => {
          data.forEach(day => {
            const option = document.createElement('option');
            const date = new Date(day.day);
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            option.textContent = formattedDate; 
              option.value = day.date; 
              daySelect.appendChild(option);
          });
          const tbody = recordsTable.querySelector('tbody');
          tbody.innerHTML = ''; // очищаем содержимое tbody перед заполнением новыми записями

          data.forEach(record => {
              const row = document.createElement('tr');
              const date2 = new Date(record.day);
              const formattedDate2 = `${date2.getFullYear()}-${String(date2.getMonth() + 1).padStart(2, '0')}-${String(date2.getDate()).padStart(2, '0')}`;
              row.innerHTML = `
                  <td>${record.category_name}</td>
                  <td>${record.service_name}</td>
                  <td>${record.master_name}</td>
                  <td>${formattedDate2}</td>
                  <td>${record.time}</td>
              `;
              tbody.appendChild(row);
          });
      })
      .catch(error => alert('Ошибка при загрузке дней:', error));
  });
  daySelect.addEventListener('change', function() {
    const selectedDayIndex = this.selectedIndex;
    const selectedDay = this.options[selectedDayIndex].text;
    const timeSelect = document.getElementById('timeSelect');
    timeSelect.innerHTML = '<option>--Выберите время--</option>';
      fetch(`${window.API_URL}/record/getRecordbyDay/${selectedDay}`, requestOptions)
          .then(response => response.json())
          .then(data => {
              data.forEach(record => { 
                data.forEach(day => {
                  const option = document.createElement('option');
                  option.textContent = day.time; 
                    option.value = day.time; 
                    timeSelect.appendChild(option);
                });
                const tbody = recordsTable.querySelector('tbody');
                tbody.innerHTML = ''; // очищаем содержимое tbody перед заполнением новыми записями
                const date2 = new Date(record.day);
                const formattedDate2 = `${date2.getFullYear()}-${String(date2.getMonth() + 1).padStart(2, '0')}-${String(date2.getDate()).padStart(2, '0')}`;
                  const row = document.createElement('tr');
                  row.innerHTML = `
                      <td>${record.category_name}</td>
                      <td>${record.service_name}</td>
                      <td>${record.master_name}</td>
                      <td>${formattedDate2}</td>
                      <td>${record.time}</td>
                  `;
                  tbody.appendChild(row);
              });
          })
          .catch(error => alert('Ошибка при загрузке записей:', error));
  });
  function openModal() {
    var timeSelect = document.getElementById('timeSelect');
var selectedTime = timeSelect.options[timeSelect.selectedIndex].text;
document.querySelector('.services').textContent = "";
document.querySelector('.master').textContent = "";
document.querySelector('.day').textContent = "";
document.querySelector('.time2').textContent = "";
    document.getElementById("modal").style.display = "block";
    if (categorySelect === '--Выберите категорию--' || serviceSelect === '--Выберите услугу--' || daySelect === '--Выберите день--' || timeSelect === '--Выберите время--') {
        document.getElementById('modal').style.display = 'none';
    } else {
    fetch(`${window.API_URL}/record/getRecordbyTime/${selectedTime}`, requestOptions)
          .then(response => response.json())
          .then(data => {
              data.forEach(record => { 
                const date2 = new Date(record.day);
                const formattedDate2 = `${date2.getFullYear()}-${String(date2.getMonth() + 1).padStart(2, '0')}-${String(date2.getDate()).padStart(2, '0')}`;
                document.querySelector('.services').textContent = "Услуга: "+record.service_name;
                document.querySelector('.master').textContent = "Мастер: "+record.master_name;
                document.querySelector('.day').textContent = "Дата: "+formattedDate2;
                document.querySelector('.time2').textContent = "Время: "+record.time;
              });
          })
          .catch(error => alert('Ошибка при загрузке записей:', error));
  }
}
  
  function closeModal() {
    document.getElementById("modal").style.display = "none"; // Закрываем модальное окно при нажатии на кнопку закрытия
  }
  document.getElementById('submitBtn').addEventListener('click', async () => {
    let services, day, time; // Объявляем переменные здесь

    var timeSelect = document.getElementById('timeSelect');
    var selectedTime = timeSelect.options[timeSelect.selectedIndex].text;
    const id = localStorage.getItem('userId');

    fetch(`${window.API_URL}/record/getRecordbyTime/${selectedTime}`, requestOptions)
    .then(response => response.json())
    .then(data => {
        data.forEach(record => { 
            services = record.id_service;
            day = record.day;
            time = record.time;
        });
    })
    .catch(error => alert('Ошибка при загрузке записей:', error));

    const data = {
        id_client: id,
        id_services: services,
        day: day,
        time: time
    };

    try {
        const response = await fetch(`${window.API_URL}/record/createRecord`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Запись успешно создана');
            window.location.reload();
        } else {
            alert('Ошибка при создании записи на сервере.');
        }
    } catch (error) {
        alert('Произошла ошибка:', error);
    }
});
function toggleRecords() {
    const recordElement = document.getElementById('record');

// Получаем все дочерние элементы элемента с id="record"
const recordChildren = recordElement.children;
document.getElementById("id3").style.display = "block";
document.getElementById("button2").style.display = "none";
document.getElementById("button3").style.display = "block";
// Проходим по всем дочерним элементам и скрываем те, которые не нужно показывать
for (let i = 0; i < recordChildren.length; i++) {
    const child = recordChildren[i];
    if (!child.matches('table#recordsTable')) {
        child.style.display = 'none';
    }
}
    fetch(`${window.API_URL}/record/getRecordbyClient/${id}`, requestOptions)
    .then(response => response.json())
    .then(data => {
      const tbody = recordsTable.querySelector('tbody');
          tbody.innerHTML = '';
          data.forEach(record => {
              const row = document.createElement('tr');
              const date2 = new Date(record.day);
              const formattedDate2 = `${date2.getFullYear()}-${String(date2.getMonth() + 1).padStart(2, '0')}-${String(date2.getDate()).padStart(2, '0')}`;
              row.innerHTML = `
                  <td>${record.id}</td>
                  <td>${record.category_name}</td>
                  <td>${record.service_name}</td>
                  <td>${record.master_name}</td>
                  <td>${formattedDate2}</td>
                  <td>${record.time}</td>
              `;
              tbody.appendChild(row);
          });
        })
        .catch(error => alert('Ошибка при загрузке', error));
        document.getElementById("button4").style.display = "block";
}
function Records() {
    window.location.reload();
}
function delrecord(){
    document.getElementById("delForm").style.display = "block";
}
function closeDelModal() {
    document.getElementById("delForm").style.display = "none";
}
function delRecord2() {
    const id2 = document.getElementById('id4').value;
    fetch(`${window.API_URL}/record/delClient/${id2}`, requestOptions)
      .then((response) => {
        if (response.status === 204) {
          alert("Запись успешно удалена");
          location.reload();
        } else {
          throw new Error('Ошибка удаления записи');
        }
      })
      .catch((error) => alert(error.message));
  }