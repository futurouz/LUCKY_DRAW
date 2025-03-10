﻿$(document).ready(function() {
  let data;
  let shuffleData;
  let isRandoming = false;
  let idx_1, idx_2, idx_3, idx_4, idx_5;
  let names;
  let isFirstRoll = true;
  let current;
  let idx_default = 0;

  fetch(
    'https://script.google.com/macros/s/AKfycbw8a_uMecRi7RBLtKTqdM-FCjUKzIZqEPcWQlH80Oo-xgJ8b_mt/exec'
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      data = myJson.user.map(u => {
        return `${u.name} ${u.surname}, ${u.company}`;
      });
      shuffleData = data.sort(() => {
        return 0.5 - Math.random();
      });
      names = shuffleData; 
      $('.spinner-container').fadeOut('fast')
    });


  function startRolling() {
    var start_idx = idx_default;
    if (typeof names !== 'undefined') {
      idx_1 = start_idx % names.length;
      idx_2 = (start_idx + 1) % names.length;
      idx_3 = (start_idx + 2) % names.length;
      idx_4 = (start_idx + 3) % names.length;
      idx_5 = (start_idx + 4) % names.length;
      $('#draw-1 .text').text(names[idx_1]);
      $('#draw-2 .text').text(names[idx_2]);
      $('#draw-3 .text').text(names[idx_3]);
      $('#draw-4 .text').text(names[idx_4]);
      $('#draw-5 .text').text(names[idx_5]);
      idx_default = idx_2;
    }
  }
  $('body').keyup(e => {
    if (e.keyCode == 32) {
      isRandoming = !isRandoming;
      if (isRandoming) {
        $('.draw-c').addClass('active');
        if (isFirstRoll) {
          idx_default = 0;
          isFirstRoll = !isFirstRoll;
        } else {
          idx_default = current - 2;
        }
        intervalID = setInterval(startRolling, 100);
      } else {
        clearInterval(intervalID);
        current = idx_3;
        if (typeof names !== 'undefined') {
          names.splice(idx_3, 1);
        }
        $('.draw-c').removeClass('active');
      }
    }
  });
});
