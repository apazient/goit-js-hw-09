// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_blue.css');

let SELECTED_DATE = null;
const refs = {
  counterBtn: document.querySelector(`[data-start]`),
  dataInput: document.querySelector(`#datetime-picker`),
  day: document.querySelector(`[data-days]`),
  hour: document.querySelector(`[data-hours]`),
  min: document.querySelector(`[data-minutes]`),
  sec: document.querySelector(`[data-seconds]`),
};

const flat = flatpickr(refs.dataInput, {
  require: true,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: 'Y-m-d H:i',
  position: 'auto end',
  onClose([selectedDates]) {
      console.dir(selectedDates);
      console.log(selectedDates.getFullYear())
      console.log(selectedDates.getDate())
        console.log(selectedDates.getMonth())
      console.log(selectedDates.getHours())
    
      console.log(selectedDates.getSeconds())
    if (selectedDates > Date.now()) {
      refs.counterBtn.disabled = false;
      return;
    }
    refs.counterBtn.disabled = true;
    alert('Please choose a date in the future');
  },
});
SELECTED_DATE = flat.days;
console.log('selDAtes', SELECTED_DATE);
// console.log(se)
// console.log(flat)
// console.dir(flatpickr)

/*приймає число, переводить в рядок і добавляє 0 на початок якщо число менше 2 знаків*/
function pad(value) {
  return String(value).padStart(2, 0);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
