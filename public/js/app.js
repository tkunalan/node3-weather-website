//console.log('client site js')
/*
fetch('http://puzzle.mead.io/puzzle').then((response) => {
  response.json().then((data) => {
    console.log(data)
  })
})
*/



const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const labelOne = document.querySelector('#label-1')
const labelTwo = document.querySelector('#label-2')
const labelThree = document.querySelector('#label-3')






weatherForm.addEventListener('submit', (e) => {
  // prevent auto reload the page
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  messageThree.textContent = '';
  messageFour.textContent = '';
  messageFive.textContent = '';
  labelOne.textContent = '';
  labelTwo.textContent = '';
  labelThree.textContent = '';



  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if(data.error){
        messageOne.textContent = data.error;

        //console.log(data.error)
      }else{
        messageOne.textContent = data.location;
        messageTwo.textContent = data.summary;

        labelOne.textContent = 'Temperature'
        messageThree.textContent = data.temperature;
        labelTwo.textContent = 'High temperature'
        messageFour.textContent = data.temperatureHigh;
        labelThree.textContent = 'Low temperature'
        messageFive.textContent = data.temperatureLow;

        console.log(data)
      }
    })
  })
})
