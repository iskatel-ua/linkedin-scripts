'use strict';
console.clear();
const connectBtn = '.search-result__action-button';
let msg = 'hi, I a\'m looking for Frontend Developer remote work. Do you have something to offer me now or in the future?';
const msgBlock = '.send-invite__custom-message';
const msgBtn = ['BUTTON', 'mr1'];
const approveBtn = ['BUTTON', 'ml1'];
let pause = 3000; // pause in ms

function start(callback){
  let body = document.querySelector('body');
  body.scrollIntoView(false);
  setTimeout(() => callback(), pause);
}

let connect, body = null;

function worker() {
  document.querySelectorAll(connectBtn).forEach((item)=>clearButton(item));
  connect = document.querySelector(connectBtn);
  if(connect === null) return console.log('Finished');
  body = document;
  body.addEventListener('DOMNodeInserted', pressConnect);
  connect.click();
}

function pressConnect(event) {
  let el = event.target;
  if (el.tagName === 'DIV' && el.classList.contains('ip-fuse-limit-alert')) return console.log('Limitited connection stopped');
  if (el.tagName === msgBtn[0] && el.classList.contains(msgBtn[1])){
    insertMessage();
  }

}

function pressApprove (el, callback){
  console.log('Approved');
  connect.remove();

  el.removeEventListener('click', pressApprove);
  setTimeout(() => callback(), pause);
}

// press button approve
function approve(el) {
  setTimeout(()=>{
    el.removeAttribute('disabled');
    console.log(el);
    el.disabled = false;
    el.click();
    console.log('closed');
  }, pause);
}


// Add message

function insertMessage() {
  body.removeEventListener('DOMNodeInserted', pressConnect); // delete listener wait popup

  const name = document.querySelector('section.modal strong').textContent.split(' ')[0];
  let popupBtn = document.querySelectorAll('.send-invite__actions button');
  const modal = document.querySelector('section.modal');
  modal.addEventListener('DOMNodeInserted', (event)=>{
    let el = event.target;
    if(el.tagName === 'TEXTAREA'){
      popupBtn = document.querySelectorAll('.send-invite__actions button');
      document.querySelector(msgBlock).value = `${name} ${msg}`;
      document.querySelector('.modal-wormhole-overlay');
      document.querySelector('.overlay-actions-are-disabled');
      // popupBtn[1].addEventListener('click', pressApprove(el, worker));
      // popupBtn[1].remove();
      // approve(cl);
    }
  });

  setTimeout(()=>{
    popupBtn[0].click(); // button add note
      console.log('Add listener approve');
  }, 1000);


}

// delete buttons already sended connect
function clearButton(el){
  if(el.disabled) el.remove();
}

start(worker);