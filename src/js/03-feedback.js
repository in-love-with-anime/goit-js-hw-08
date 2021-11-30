import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector(".feedback-form");
const FORM_KEY = "feedback-form-state";

// Получение значений полей и сохранение их в хранилище
// Добавление слушателя на форму и обновление хранилища не чаще, чем раз в 500 миллисекунд
const onFormInput = () => {
    const formData = new FormData(feedbackForm);
    let userForm = {};
    formData.forEach((value, name) => userForm[name] = value.trim());
    localStorage.setItem(FORM_KEY, JSON.stringify(userForm));
};

feedbackForm.addEventListener("input", throttle(onFormInput, 500));


// Получение данных из локального хранилище при перезагрузке страницы
const onPopulateForm = () => {
    if (localStorage.getItem(FORM_KEY)) {
        Object.entries(JSON.parse(localStorage.getItem(FORM_KEY))).forEach(([name, value]) => feedbackForm.elements[name].value = value); // `${name}: ${value}`; `${name}: value`; `${name} = value`
    }
};

onPopulateForm();

/*
Сабмит формы:
- Останавливаем поведение по умолчанию
- Очищаем интерфейс(форму от значений)
- Убираем отправленные данные из локального хранилища
*/
const onFormSubmit = event => {
    event.preventDefault();
    if (feedbackForm.elements.email.value && feedbackForm.elements.message.value !== "") {
        console.log('Отправляем форму с данными: ', JSON.parse(localStorage.getItem(FORM_KEY)));
        event.currentTarget.reset();
        localStorage.removeItem(FORM_KEY);
    };
};
  
feedbackForm.addEventListener("submit", onFormSubmit);