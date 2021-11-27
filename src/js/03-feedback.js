


















import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const formInputMail = document.querySelector('.feedback-form input');
const formInputText = document.querySelector('.feedback-form textarea')


const FORM_KEY = 'feedback-form-state';
const formData = {};


const onFormSubmit = evt => {
    evt.preventDefault();
    evt.target.reset();
    console.log(FORM_KEY, JSON.parse(localStorage.getItem(FORM_KEY)));
    localStorage.removeItem(FORM_KEY);
}

const onFormInput = evt => {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(FORM_KEY, JSON.stringify(formData));
}

const savingValue = () => {
        const savedMessage = JSON.parse(localStorage.getItem(FORM_KEY));
    
        if (savedMessage && savedMessage.message) {
            formInputText.value = savedMessage.message;
        };
        
        if (savedMessage && savedMessage.email) {
            formInputMail.value = savedMessage.email;
        };
    };

savingValue();
    
feedbackForm.addEventListener('submit', onFormSubmit);
feedbackForm.addEventListener('input', throttle(onFormInput, 500));


