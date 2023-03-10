import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = { 
  form: document.querySelector('form'),
};

refs.form.addEventListener(`submit`, onCreatePromise);

function onCreatePromise(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.target;
  let userDelay = Number(delay.value);
  const userStep = Number(step.value);
  const userAmount = amount.value;
   for (let i = 1; i <= userAmount; i++) {
     createPromise(i, userDelay)
       .then(({ position, delay })=> { Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`); })
       .catch(({ position, delay }) => { Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`); });
     
     userDelay += userStep;   
   }
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
     setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
 
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

 