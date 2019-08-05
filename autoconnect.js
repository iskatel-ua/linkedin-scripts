'use strict';
console.clear();
const connectBtn = '.search-result__action-button';
const approveBtn = ['BUTTON', 'ml1'];
let pause = 3000; // pause in ms

function start(callback){
  let body = document.querySelector('body');
  body.scrollIntoView(false);
  setTimeout(() => callback(), pause);
}

function worker() {
  document.querySelectorAll(connectBtn).forEach((item)=>clearButton(item));
  let connect = document.querySelector(connectBtn);
  if(connect === null) return console.log('Finished');
  let a = document.addEventListener('DOMNodeInserted', function (event) {
    let el = event.target;
    if (el.tagName === 'DIV' && el.classList.contains('ip-fuse-limit-alert')) return console.log('Limitited connection stopped');
    if (el.tagName === approveBtn[0] && el.classList.contains(approveBtn[1])){
      console.log('Add listener');
      let b = el.addEventListener('click', function () {
        console.log('Approved');
        connect.remove();
        // a.removeEventListener('DOMNodeInserted');
        // b.removeEventListener('click');
        setTimeout(() => worker(), 1000);
      });
      approve(el);
    }
  });
  connect.click();
}

// press button approve
function approve(el) {
  setTimeout(function () {
    el.click();
    console.log('closed');
  }, pause);
}
// delete buttons already sended connect
function clearButton(el){
  if(el.disabled) el.remove();
}

start(worker);