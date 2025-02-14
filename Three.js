```javascript
document.addEventListener('DOMContentLoaded', () => {
    const authSection = document.getElementById('auth-section');
    const mainSection = document.getElementById('main-section');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const registerBtn = document.getElementById('register-btn');
    const loginBtn = document.getElementById('login-btn');
    const authMessage = document.getElementById('auth-message');
    const welcomeUsername = document.getElementById('welcome-username');
    const button1 = document.getElementById('button1');
    const button2 = document.getElementById('button2');
    const textInput = document.getElementById('text-input');
    const button1State = document.getElementById('button1-state');
    const button2State = document.getElementById('button2-state');
    const inputText = document.getElementById('input-text');
    const logoutBtn = document.getElementById('logout-btn');

    // Проверяем, есть ли уже залогиненный пользователь
    checkLoggedInUser();

    // Регистрация
    registerBtn.addEventListener('click', () => {
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (!username || !password) {
            authMessage.textContent = 'Пожалуйста, заполните все поля.';
            return;
        }

        if (localStorage.getItem(username)) {
            authMessage.textContent = 'Пользователь с таким именем уже существует.';
            return;
        }

        localStorage.setItem(username, JSON.stringify({ password, button1: false, button2: false, text: '' }));
        authMessage.textContent = 'Регистрация успешна! Теперь войдите.';
        usernameInput.value = '';
        passwordInput.value = '';
    });

    // Вход
    loginBtn.addEventListener('click', () => {
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (!username || !password) {
            authMessage.textContent = 'Пожалуйста, заполните все поля.';
            return;
        }

        const userData = localStorage.getItem(username);
        if (!userData) {
            authMessage.textContent = 'Пользователь не найден.';
            return;
        }

        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.password !== password) {
            authMessage.textContent = 'Неверный пароль.';
            return;
        }

        // Вход успешен
        authMessage.textContent = '';
        authSection.classList.add('hidden');
        mainSection.classList.remove('hidden');
        welcomeUsername.textContent = username;

        // Загружаем сохраненные данные
        loadSavedData(username);

          // Сохраняем имя пользователя для последующих проверок
        localStorage.setItem('currentUser', username);
    });

    // Обработчики кнопок
    button1.addEventListener('click', () => {
        button1State.textContent = 'Нажата';
        saveData();
    });

    button2.addEventListener('click', () => {
        button2State.textContent = 'Нажата';
        saveData();
    });
     //обработчик поля ввода
    textInput.addEventListener('input', () => {
        inputText.textContent = textInput.value;
        saveData();
    })

    // Выход
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');  // Очищаем данные о текущем пользователе
        authSection.classList.remove('hidden');
        mainSection.classList.add('hidden');
        usernameInput.value = '';
        passwordInput.value = '';
         // Сбрасываем отображаемые значения
        button1State.textContent = 'Не нажата';
        button2State.textContent = 'Не нажата';
        inputText.textContent = '';
        textInput.value = '';

    });

    // Загрузка сохраненных данных
    function loadSavedData(username) {
        const userData = JSON.parse(localStorage.getItem(username));
        if (userData) {
            button1State.textContent = userData.button1 ? 'Нажата' : 'Не нажата';
            button2State.textContent = userData.button2 ? 'Нажата' : 'Не нажата';
            inputText.textContent = userData.text;
            textInput.value = userData.text; // Устанавливаем значение в поле ввода
        }
    }

    // Сохранение данных
    function saveData() {
        const username = welcomeUsername.textContent;
        if (username) {
            const userData = JSON.parse(localStorage.getItem(username));
            if(userData){
                localStorage.setItem(username, JSON.stringify({
                ...userData,
                button1: button1State.textContent === 'Нажата',
                button2: button2State.textContent === 'Нажата',
                text: inputText.textContent
                }));
            }
        }
    }

    // Проверка, залогинен ли пользователь
    function checkLoggedInUser() {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            // Если есть данные о пользователе, скрываем секцию авторизации и показываем основную
            authSection.classList.add('hidden');
            mainSection.classList.remove('hidden');
            welcomeUsername.textContent = currentUser;
            loadSavedData(currentUser); // Загружаем данные
        }
    }
}