import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
const numberEl = document.querySelectorAll('.value');

let startTime = null;
let endTime = null;

startBtnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    endTime = selectedDates[0].getTime();
    startTime = new Date().getTime();

    if (endTime > startTime) {
      startBtnEl.disabled = false;
    } else {
      Notiflix.Notify.warning('Please choose a date in the future');
      return;
    }
  },
};

flatpickr('#datetime-picker', options);
startBtnEl.disabled = true;
startBtnEl.addEventListener('click', startTimer);

let timerId = null;

function startTimer() {
  startBtnEl.disabled = true;
  inputEl.disabled = true;
  timerId = setInterval(onTimer, 1000);
}

function onTimer() {
  startTime = new Date().getTime();
  if (endTime <= startTime) {
    clearInterval(timerId);
    inputEl.disabled = false;
    return;
  }
  const time = endTime - startTime;
  const timeObj = addResultTimer(convertMs(time));
  numberHandler(timeObj);
}

function addResultTimer(value) {
  const result = {};
  for (const key in value) {
    result[key] = value[key];
  }
  return result;
}

function numberHandler(timeObj) {
  let i = 0;
  for (const key in timeObj) {
    numberEl[i].textContent = timeObj[key];
    i += 1;
  }
}

function pad(prop) {
  return String(prop).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
