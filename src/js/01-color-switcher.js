function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalId = null;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true; //блокуємо кнопку
  stopBtn.disabled = false;

  intervalId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  startBtn.disabled = false; //зняття блоку з кнопки
  stopBtn.disabled = true;
});
