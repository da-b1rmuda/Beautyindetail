const requestOptions = {
  method: "GET",
  redirect: "follow",
};
fetch(`${window.API_URL}/masters/getMasters`, requestOptions)
.then((response) => response.json())
.then((data) => {
  const masterInfo = data[0];
  const fullName = ` ${masterInfo.lastname} ${masterInfo.name} ${masterInfo.patronymic}`;
  document.getElementById("name").textContent = fullName;
  const work = `${masterInfo.work_experience}`;
  document.getElementById("work").textContent = "Опыт работы " + work;
  const description = `${masterInfo.description}`;
  document.getElementById("description").textContent = description;
  const photoUrl = `${masterInfo.photo}`;
  document.getElementById("photo").src = photoUrl;
})
.catch((error) => console.error(error));
document.getElementById("Paric").addEventListener('click', () => {
  fetch(`${window.API_URL}/masters/getMasters`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const masterInfo = data[0]; 
      const fullName = `${masterInfo.lastname} ${masterInfo.name} ${masterInfo.patronymic}`;
      document.getElementById("name").textContent = fullName;
      const work = masterInfo.work_experience;
      document.getElementById("work").textContent = "Опыт работы " + work;
      const description = masterInfo.description;
      document.getElementById("description").textContent = description;
      const photoUrl = masterInfo.photo;
      document.getElementById("photo").src = photoUrl;
    })
    .catch((error) => console.error(error));
});

document.getElementById("MakeUp").addEventListener('click', () => {
  fetch(`${window.API_URL}/masters/getMasters`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const masterInfo = data[1]; 
      const fullName = `${masterInfo.lastname} ${masterInfo.name} ${masterInfo.patronymic}`;
      document.getElementById("name").textContent = fullName;
      const work = masterInfo.work_experience;
      document.getElementById("work").textContent = "Опыт работы " + work;
      const description = masterInfo.description;
      document.getElementById("description").textContent = description;
      const photoUrl = masterInfo.photo;
      document.getElementById("photo").src = photoUrl;
    })
    .catch((error) => console.error(error));
});

document.getElementById("manicure").addEventListener('click', () => {
  fetch(`${window.API_URL}/masters/getMasters`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const masterInfo = data[2]; 
      const fullName = `${masterInfo.lastname} ${masterInfo.name} ${masterInfo.patronymic}`;
      document.getElementById("name").textContent = fullName;
      const work = masterInfo.work_experience;
      document.getElementById("work").textContent = "Опыт работы " + work;
      const description = masterInfo.description;
      document.getElementById("description").textContent = description;
      const photoUrl = masterInfo.photo;
      document.getElementById("photo").src = photoUrl;
    })
    .catch((error) => console.error(error));
});
document.getElementById("epilation").addEventListener('click', () => {
  fetch(`${window.API_URL}/masters/getMasters`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const masterInfo = data[3]; 
      const fullName = `${masterInfo.lastname} ${masterInfo.name} ${masterInfo.patronymic}`;
      document.getElementById("name").textContent = fullName;
      const work = masterInfo.work_experience;
      document.getElementById("work").textContent = "Опыт работы " + work;
      const description = masterInfo.description;
      document.getElementById("description").textContent = description;
      const photoUrl = masterInfo.photo;
      document.getElementById("photo").src = photoUrl;
    })
    .catch((error) => console.error(error));
});
  function openModal() {
    document.getElementById("modal").style.display = "block"; // Открываем модальное окно при нажатии на кнопку
  }
  
  function closeModal() {
    document.getElementById("modal").style.display = "none"; // Закрываем модальное окно при нажатии на кнопку закрытия
  }
  function openRegistrationModal() {
    document.getElementById("registrationModal").style.display = "block";
  }
  
  function closeRegistrationModal() {
    document.getElementById("registrationModal").style.display = "none";
  }
