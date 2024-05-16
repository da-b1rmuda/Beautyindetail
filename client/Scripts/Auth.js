let id;
const authForm = document.querySelector("#FormAvtoriz");
authForm.addEventListener('submit', async function (event) {
    event.preventDefault(); 
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const login = document.querySelector("#login");
    const password = document.querySelector("#password");
    const data = JSON.stringify({"login": login.value, "password": password.value});
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data,
        redirect: "follow"
    };

    fetch(`${window.API_URL}/users/login`, requestOptions)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Неправильный логин или пароль'); 
        }
    })
    .then((data) => {
        if (login.value === "admin" && password.value === "adminuser") {
            localStorage.setItem('userId', data[0].id);
            window.location.href = "Admin_categoryservice.html";
        } else {
            localStorage.setItem('userId', data[0].id);
        window.location.href = "Record.html"; 
        }
    })
    .catch((error) => alert(error.message)); 
}); 
function openRecoveryModal() {
    document.getElementById("modal-recovery").style.display = "block";
  }
  
  function closemodalrecovery() {
    document.getElementById("modal-recovery").style.display = "none";
  }
document.getElementById('FormRecovery').addEventListener('submit', function(e) {
    e.preventDefault();
    let email = document.getElementById('email').value;
   
    fetch(`${window.API_URL}/users/emailUsers/${email}`, requestOptions)
    .then(response => {
        if (!response.ok) {
            if (response.status === 500) {
                throw new Error('Пользователь с такой почтой не зарегистрирован');
            }
            else
            {
                throw new Error('Произошла ошибка при запросе к серверу');
            }
        }
        return response.json();
    })
        .then(data => {
            id=data.id;
            if (data && data.id) {
                fetch(`${window.API_URL}/users/emailSending/${email}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.recoveryCode !== null) { 
                        alert('Код восстановления отправлен на указанную почту');
                        document.getElementById('ButtonRecovery').style.display = 'none';

                        // Отображаем поле для ввода кода
                        document.getElementById('recoveryCode').style.display = 'block';
                        document.getElementById('recoveryCode').addEventListener('input', function() {
                            const enteredCode = this.value.trim();
                            if (enteredCode.length === 6) { // Проверяем длину введенного кода
                                if (enteredCode === data.recoveryCode.toString()) {
                                    document.getElementById("modal-recovery").style.display = "none";
                                    document.getElementById("modalpassword").style.display = "block";
                                } else {
                                    alert('Неверный код восстановления. Попробуйте еще раз.');
                                }
                            }
                        });
                    } 
                })
                .catch(error => console.error(error));
                
                document.getElementById('email').style.display = 'none';
            } else {
                alert('Пользователь с такой почтой не зарегистрирован');
            }
        })
        .catch(error => {
            alert(error);
            document.getElementById('email').value="";
        });
});
function closemodalpassword() {
    document.getElementById("modalpassword").style.display = "none";
  }
  const formPassword = document.getElementById('FormPassword');
  const newPasswordInput = document.getElementById('newPassword');
  const confirmNewPasswordInput = document.getElementById('confirmNewPassword');
  const passwordButton = document.getElementById('passwordbutton');
  
  // Добавляем обработчик события на кнопку
  passwordButton.addEventListener('click', function(e) {
      e.preventDefault();
  
      const newPassword = newPasswordInput.value;
      const confirmNewPassword = confirmNewPasswordInput.value;
  
      // Проверяем, что поля нового пароля не пустые и совпадают
      if (newPassword === '' || confirmNewPassword === '') {
          alert('Пожалуйста, заполните все поля');
          return;
      }

      if (newPassword.length < 6) {
        alert('Пароль должен содержать как минимум 6 символов');
        return;
    }
      if (newPassword !== confirmNewPassword) {
          alert('Пароли не совпадают');
          return;
      }
  
      const requestOptions = {
          method: "PUT",
          redirect: "follow",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({  id: id, password: newPassword }) 
      };
  
      fetch(`${window.API_URL}/visitor/updatepasswordVisitor/${id}`, requestOptions)
          .then(response => response.text())
          .then(result => {
              console.log(result);
              alert('Пароль успешно изменен');
              document.getElementById("modalpassword").style.display = "none";
          })
          .catch(error => alert(error));
  });
  document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.querySelector('.nav-container1 .checkbox');
    const hamburgerLines = document.querySelector('.nav-container1 .hamburger-lines');
    const menuItems = document.querySelector('.nav-container1 .menu-items');
  
    // Обработчик для ссылки "Услуги"
    document.querySelector('.nav-container1 .menu-items li:nth-child(2) a').addEventListener('click', function(event) {
      event.preventDefault();
      handleMenuItemClick();
      window.scrollTo(0, 550);
    });
  
    // Обработчик для ссылки "Контакты"
    document.querySelector('.nav-container1 .menu-items li:nth-child(3) a').addEventListener('click', function(event) {
      event.preventDefault();
      handleMenuItemClick();
      window.scrollTo(0, 2450);
    });
  
    function handleMenuItemClick() {
      checkbox.checked = false;
      hamburgerLines.querySelector('.line1').style.transform = '';
      hamburgerLines.querySelector('.line2').style.transform = '';
      hamburgerLines.querySelector('.line3').style.transform = '';
    }
  });