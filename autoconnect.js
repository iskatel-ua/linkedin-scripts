'use strict';
console.clear();

const connectBtn = '.search-result__action-button';
const approveBtn = 'button.ml1';
const pause = 1000; // pause in ms

let body = document.querySelector('body');
body.scrollIntoView(false);

setTimeout(worker(), 1000);

function worker(){
  let connect = document.querySelectorAll(connectBtn);
  for(let i=0; i < connect.length; i++) {
    addHR(i, approve);
  }

  // get popup with approve and recommendation add message in connect
  function addHR(i, callback){
    setTimeout(()=>{
      connect[i].click();
        console.log(connect[i]);
        console.log('clicked');
      callback();
    }, pause);
  }

  function insertMessage() {
  //  to be continued
  }

  //press button approve
  function approve() {
    const approve = document.querySelector(approveBtn);
    setTimeout(()=>{
      approve.click();
      console.log('closed');
    }, pause);
  }
}
