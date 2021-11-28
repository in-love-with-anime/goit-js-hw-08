import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector(".feedback-form");
const FORM_KEY = "feedback-form-state";
let formData = {};

// Вешаем слушателя на форму и обновляем хранилище не чаще чем раз в 500 миллисекунд
const onFormInput = evt => {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(FORM_KEY, JSON.stringify(formData));
};

feedbackForm.addEventListener("input", throttle(onFormInput, 500));


// Получение данных из локального хранилище
const initForm = () => {
    let persistedFilters = localStorage.getItem(FORM_KEY);
    if (persistedFilters) {
        persistedFilters = JSON.parse(persistedFilters);
        Object.entries(persistedFilters).forEach(([name, value]) => {
            feedbackForm.elements[name].value = value;
        });
    }
};

initForm();

// Сабмит формы и очистка локального хранилища
const savingValue = evt => {
    evt.preventDefault();

    const inputEmail = feedbackForm.elements.email.value;
    const inputMessage = feedbackForm.elements.message.value;
    if (inputEmail && inputMessage !== "") {
        let userForm = localStorage.getItem(FORM_KEY);
        userForm = JSON.parse(localStorage.getItem(FORM_KEY));
        console.log(userForm);
        localStorage.removeItem(FORM_KEY);
        evt.currentTarget.reset();
    };
};
  
feedbackForm.addEventListener("submit", savingValue);