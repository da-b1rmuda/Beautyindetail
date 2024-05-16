import client from "../db.js";
import ApiError from "../exceptions/api-error.js";
import nodemailer from 'nodemailer';
class UserService {
  async loginuser(login, password) {
    const response = await client.query(
      `
        select id, login, password from users where login = $1 and password = $2
        `,
      [login, password]
    );
    //Опцианально (необязательно)
    //Проверяет есть ли такой пользователь в бд, если нет ничего не отправляет на клиент
    if (response.rows[0] === null || response.rows[0] === undefined) {
      throw ApiError.BadRequest("Неправильный логин или пароль");
    }
    return response;
  }

  async getUsers() {
    const response = await client.query(
      `
        select * from users
        `
    );
    return response;
  }
  async emailUsers(email) {
    const response = await client.query(
      `
      SELECT * FROM clients
      WHERE email = $1
        `,
        [email]
    );
    if (response.rows.length === 0) {
      const error = new Error('Пользователя с такой почтой не существует');
      error.status = 500;
      throw error;
  }
    return response.rows[0];
  }
  async sendRecoveryCodeByEmail(email) {
    const recoveryCode = Math.floor(100000 + Math.random() * 900000);
    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: 'beauty.in.detail.dd@mail.ru',
            pass: 'Ahe9qKJTjcymEkwbhEdM'
        }
    });

    const mailOptions = {
        from: 'beauty.in.detail.dd@mail.ru',
        to: email,
        subject: 'Код восстановления пароля',
        text: `Ваш код восстановления: ${recoveryCode}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return { recoveryCode };
    } catch (error) {
        console.error('Ошибка при отправке кода восстановления на почту:', error);
        return { success: false };
    }
}
}

export default UserService;
