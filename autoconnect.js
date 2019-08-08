'use strict';
console.clear();

let connect, body = null;
let msg = 'hi, I a\'m expanding the network of my contacts))'; // Here your text message
/*
* Little config app
* */
const connectBtn = '.search-result__action-button';
const modalBlock = 'section.modal';
const modalNameRecipient = 'section.modal strong';
const msgBlock = '.send-invite__custom-message';
const msgBtn = ['BUTTON', 'mr1'];
const actionsBtn = '.send-invite__actions button';
const nextPage = 'button.artdeco-pagination__button--next';
const limitOut = 'ip-fuse-limit-alert';
const pause = 3000; // pause in ms

function start(callback){
  let scroll = {
    heigthMax: +document.documentElement.scrollHeight.toFixed(),
    screen: +document.documentElement.clientHeight.toFixed(),
    positon: +document.documentElement.scrollTop.toFixed(),
    to: function (go) {
      if( (this.positon + this.screen) < this.heigthMax ){
        this.positon += 5;
        document.documentElement.scroll(0, this.positon);
      }else{
        clearInterval(go);
        setTimeout(() => callback(), pause);
        return 0;
      }
    }
  };
  document.documentElement.scroll(0, 0);
  let go = setInterval(() => scroll.to(go), 50);
}

function worker() {
  document.querySelectorAll(connectBtn).forEach((item)=>clearButton(item));
  connect = document.querySelector(connectBtn);
  if(connect === null) {
    document.documentElement.scroll(0, +document.documentElement.scrollHeight.toFixed());
    if (document.querySelector(nextPage)){
      document.querySelector(nextPage).click();
      console.clear();
      console.log('Next...');
      return setTimeout(()=>start(worker), pause);
    }else{
     return console.log('Finish');
    }
  }
  body = document;
  body.addEventListener('DOMNodeInserted', pressConnect);
  connect.click();
}

function pressConnect(event) {
  let el = event.target;
  if (el.tagName === 'DIV' && el.classList.contains(limitOut)) {
    console.clear();
    return console.log('Limitited connection stopped');
  }
  if(document.querySelector('.'+limitOut)) {
    console.clear();
    return console.log('Limitited connection stopped');
  }
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
  let name = '';
  if(document.querySelector(modalNameRecipient)){
    name = document.querySelector(modalNameRecipient).textContent.split(' ')[0];
  }
  let popupBtn = document.querySelectorAll(actionsBtn);
  const modal = document.querySelector(modalBlock);
  modal.addEventListener('DOMNodeInserted', (event)=>{
    let el = event.target;
    if(el.tagName === 'TEXTAREA'){
      popupBtn = document.querySelectorAll(actionsBtn);
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