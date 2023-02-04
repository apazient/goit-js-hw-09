// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_blue.css');

const refs = {
  counterBtn: document.querySelector(`[data-start]`),
  dataInput: document.querySelector(`#datetime-picker`),
  timer: document.querySelector((".timer")),
  

  day: document.querySelector(`[data-days]`),
  hour: document.querySelector(`[data-hours]`),
  min: document.querySelector(`[data-minutes]`),
  sec: document.querySelector(`[data-seconds]`),

};

refs.counterBtn.disabled = true;
let userDate = null;




refs.counterBtn.addEventListener(`click`, () => {
  runTimer.startTimer();
});



const options = {
  require: true,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: 'Y-m-d H:i',
  position: 'auto end',
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      refs.counterBtn.disabled = false;
      userDate = selectedDates[0];
      const counterDate = userDate - Date.now();
      const outputDate = convertMs(counterDate);

      refs.day.textContent = pad(outputDate.days);
      refs.hour.textContent = pad(outputDate.hours);
      refs.min.textContent = pad(outputDate.minutes);
      refs.sec.textContent = pad(outputDate.seconds);

      return;
    }
    refs.counterBtn.disabled = true;
    alert('Please choose a date in the future');
  },
};

flatpickr(refs.dataInput, options);
class Timer {
  constructor() {
    this.isActive = false;
    this.intervalId = null;
  }
  startTimer() {
    if (this.isActive) {
      if (!refs.counterBtn.disabled) {
        refs.counterBtn.disabled = true;
      }
      return;
    }

    this.isActive = true;
    refs.counterBtn.disabled = true;
    console.log(this.isActive);
    this.intervalId = setInterval(() => {
      const difTime = userDate - Date.now();
      const convertTime = convertMs(difTime);
      refs.day.textContent = pad(convertTime.days);
      refs.hour.textContent = pad(convertTime.hours);
      refs.min.textContent = pad(convertTime.minutes);
      refs.sec.textContent = pad(convertTime.seconds);
      console.log(difTime);
      if (difTime <= 0) {
        this.stopTimer();
      }
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.intervalId);
  }
}

const runTimer = new Timer();

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
