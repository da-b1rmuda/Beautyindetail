const regForm = document.querySelector("#FormReg");
regForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  const lastname = document.getElementById("lastname").value;
  const name = document.getElementById("name2").value;
  const patronymic = document.getElementById("patronymic").value;
  const phone = document.getElementById("phone3").value;
  const email = document.getElementById("email3").value;
  const dateofbirth = document.getElementById("dateofbirth").value;
  const login = document.getElementById("login2").value;
  const password = document.getElementById("password2").value;
  const data = JSON.stringify( {"lastname" : lastname,"name" : name, "patronymic" : patronymic, "phone" : phone, "email" : email,"dateofbirth" : dateofbirth, "login": login, "password": password} );
  const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow"
  };

  fetch(`${window.API_URL}/visitor/createVisitor`, requestOptions)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка при отправке данных. Возможно логин уже существует или пароль менее 6 символов.");
    } 
    else{
      return response.json();
    }
  })
  .then((result) => {
    alert("Регистрация прошла успешно");
    document.getElementById("registrationModal").style.display = "none";
  })
  .catch((error) => alert(error.message)); // Вывод сообщения об ошибке
});