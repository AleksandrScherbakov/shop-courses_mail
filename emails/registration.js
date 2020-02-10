const keys = require('../keys/index');
module.exports = function(email){
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: "Аккаутн создан",
        html: `
        <h1>Добро пожаловать в магазин курсов</h1>
        <p>Вы успешно создали аккаунт с email адресом ${email}</p>
        <hr/>
        <a href="${keys.BASE_URL}">Магазин курсов</a>
        `
    }
};