'use strict';
console.clear();
const connectBtn = '.search-result__action-button';
let msg = 'hi, I a\'m looking for Frontend Developer remote work. Do you have something to offer me now or in the future?';
const msgBlock = '.send-invite__custom-message';
const msgBtn = ['BUTTON', 'mr1'];
const pause = 3000; // pause in ms

function start(callback){
  let scroll = {
    heigthMax: +document.documentElement.scrollHeight.toFixed(),
    screen: +document.documentElement.clientHeight.toFixed(),
    positon: +document.documentElement.scrollTop.toFixed(),
    to: function () {
      if( (this.positon + this.screen) < this.heigthMax ){
        this.positon += 50;
        document.documentElement.scroll(0, this.positon);
      }else{
        clearInterval(go);
        setTimeout(() => callback(), pause);
        return;
      }
    }
  };
  document.documentElement.scroll(0, 0);
  let go = setInterval(() => scroll.to(go), 300);
}

let connect, body = null;

function worker() {
  document.querySelectorAll(connectBtn).forEach((item)=>clearButton(item));
  connect = document.querySelector(connectBtn);
  if(connect === null) {
    document.documentElement.scroll(0, +document.documentElement.scrollHeight.toFixed());
    document.querySelector('button.artdeco-pagination__button--next').click();
    console.log('Next...');
    return setTimeout(()=>start(worker), pause);
  }
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
  connect.remove();
  el.removeEventListener('click', pressApprove);
  setTimeout(() => callback(), pause);
}

// press button approve
function approve(el) {
  el.click();
}

// Add message
function insertMessage() {
  body.removeEventListener('DOMNodeInserted', pressConnect); // delete listener wait popup
  let name = null;
  if(document.querySelector('section.modal strong')){
    name = document.querySelector('section.modal strong').textContent.split(' ')[0];
  }else{
    name = '';
  }
  let popupBtn = document.querySelectorAll('.send-invite__actions button');
  const modal = document.querySelector('section.modal');
  modal.addEventListener('DOMNodeInserted', (event)=>{
    let el = event.target;
    if(el.tagName === 'TEXTAREA'){
      popupBtn = document.querySelectorAll('.send-invite__actions button');
      document.querySelector(msgBlock).value = `${name} ${msg}`;
      popupBtn[1].addEventListener('click', pressApprove(el, worker));
      approve(popupBtn[1]);
    }
  });

  setTimeout(()=>{
    popupBtn[0].click(); // button add note
  }, 1000);
}

// delete buttons already sended connect
function clearButton(el){
  if(el.disabled) el.remove();
}

start(worker);