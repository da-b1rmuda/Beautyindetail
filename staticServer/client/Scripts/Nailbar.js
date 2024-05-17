const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  fetch(`${window.API_URL}/nailbar/getNailbar`, requestOptions)
  .then((response) => response.json())
  .then((data) => {
    const priceListData = document.getElementById('priceListData');

    data.forEach(item => {
      const serviceDiv = document.createElement('div');
      serviceDiv.classList.add('tab2');

      serviceDiv.innerHTML = `
        <div id="nameservice" class="nameservice">${item.name}</div>
        <div id="timeservice" class="timeservice">${item.time}</div>
        <div id="priceservice" class="priceservice">${item.price}</div>
      `;

      priceListData.appendChild(serviceDiv);
    });
  })
  .catch((error) => console.error(error));
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
