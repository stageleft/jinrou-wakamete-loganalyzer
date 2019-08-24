function updateInputField(arg) {
// functional input  : JSON from Web Storage API
//     'log' key of Web Storage API style
// functional output : -
// Internal state    : inner table of <div id="deduce" />
  var is_initialize = false; // if initialize Input Field
  var no_input_key  = false; // if initialize 'input' key of Web Storage API style

  ////// sanity check (set initialize mode if insane).
  // check 'log' key as input.
  var datearray;
  var base_date;
  [datearray, base_date] = createDateArray(arg);
  if ((datearray == null) || (datearray.length == 0)){
    return;
  }
  if ( base_date == "１日目の朝になりました。" ){
    is_initialize = true;
  }

  // check <div id="deduce" /> as internal state
  if ((document.getElementById("deduce").textContent == '') ||
      (document.getElementById('deducer-title') == null )) {
    is_initialize = true;
  } else {
    var tds_title = document.getElementById('deducer-title').querySelectorAll('td');
    if ((tds_title.length - 1) != datearray.length) {
      // refresh Input Field if change datearray
      is_initialize = true;
    }
  }

  if (is_initialize == true) {
    refreshInputField(arg);
  };

  // add info from 'log'
  var player_list = Object.keys(arg.log[base_date].players);
  player_list.forEach(function(k){

    for (var i = 1 ; i <= datearray.length ; i++) {
      if ((i <= 2) ||
          (arg.log[datearray[i-1]].players[k].stat == "（生存中）")) {
        // if alive : set comment count
        var datekey = datearray[i-1];
        var c = 0;
        arg.log[datekey].comments.forEach(function(h){
          if ( k == h.speaker ) {
            c = c + 1;
          }
        });
        document.getElementById('stat-' + k + '-' + String(i) + '-count').innerText = "発言 "+String(c);
        if (i > 2) {
          document.getElementById('stat-' + k + '-' + String(i) + '-dead_reason').innerText = "";
        }
      } else {
        // if dead
        var target = document.getElementById('stat-' + k + '-' + String(i) + '-target');
        if (target != null) { target.remove(); };

        var result = document.getElementById('stat-' + k + '-' + String(i) + '-result');
        if (result != null) { result.remove(); };

        if (arg.log[datearray[i-2]].players[k].stat == "（生存中）") {
          // if dead in this day
          var datestring   = datearray[i-1];

          // deducer: set background color if Dead
          document.getElementById('villager-' + k).setAttribute('class', 'dead');

          var dead_reason;

          // deducer: result (dead reason)
          if (arg.log[datestring].list_voted.indexOf(k) >= 0) {
            dead_reason = "吊り";
          } else if (arg.log[datestring].list_bitten.indexOf(k) >= 0) {
            dead_reason = "噛み";
          } else if (arg.log[datestring].list_dnoted.indexOf(k) >= 0) {
            dead_reason = "死体";
          } else {
            dead_reason = "突然死";
          }
          document.getElementById('stat-' + k + '-' + String(i) + '-count').innerText       = "";
          document.getElementById('stat-' + k + '-' + String(i) + '-dead_reason').innerText = dead_reason;
        } else {
          // if dead in previous days
          // deducer: nop : target and result is disabled with no value
          document.getElementById('stat-' + k + '-' + String(i) + '-count').innerText       = "";
          document.getElementById('stat-' + k + '-' + String(i) + '-dead_reason').innerText = "";
        }
      }
    }
  });

  return;
}

function refreshInputField(arg) {
// 表そのものを初期化する場合の処理（変更を含む）。
// 保証するものは、タグ、IDまで。中身の保持はコール元で実施する。
// functional input  : JSON from Web Storage API (input key must be refreshed)
// functional output : -
// Another output    : inner table of <div id="deduce" />
//     it must not include any <div /> tag.
  var ret = document.createElement('table');

  var datearray;
  var base_date;
  [datearray, base_date] = createDateArray(arg);
  var player_list = Object.keys(arg.log[base_date].players);

  // create Villager List
  // <table>
  //  <thead>
  //    <tr id="deducer-title">
  //      <td><a id="vote">投票</a></td>
  //      <td id="deducer-title-1"><a id="date-log-1">１日目</a></td>
  //      <td id="deducer-title-2"><a id="date-log-2">2日目</a></td>
  //      <td>...</td>
  //      <td id="deducer-title-X"><a id="date-log-X">X日目</a></td>
  //    </tr>
  //  </thead>
  var ret_head     = document.createElement('thead');
  var tr_title     = document.createElement('tr');
  tr_title.setAttribute('id', 'deducer-title');

  td_day0title = document.createElement('td');
  td_day0title.innerText = '';

  a_linktovote = document.createElement('a');
  a_linktovote.setAttribute('id', 'vote');
  a_linktovote.setAttribute('href', '#');
  a_linktovote.innerText = "投票";
  td_day0title.insertAdjacentElement('beforeend', a_linktovote);

  tr_title.insertAdjacentElement('beforeend', td_day0title);

  for (var i = 1 ; i <= datearray.length; i++) {
    var td = document.createElement('td');
    td.setAttribute('id', 'deducer-title-' + String(i));

    var a  = document.createElement('a');
    a.setAttribute('id', 'date-log-' + String(i));
    a.setAttribute('href', '#');
    a.innerText = String(i) + "日目";
    td.insertAdjacentElement('afterbegin', a);

    tr_title.insertAdjacentElement('beforeend', td);
  }

  ret_head.insertAdjacentElement('beforeend', tr_title);

  //  <tbody>
  //    <tr id='villager-list-villagerA'>
  //      <td id='villager-villagerA'><img src=[icon] /><a id="all-day-log-villagerA">villagerA</a></td>
  //      <td id='stat-villagerA-1-count'>comment_count_date1</td></td>
  //      <td>
  //        <p id='stat-villagerA-2-count'>comment_count_date2</p>
  //        <p id='stat-villagerA-2-dead_reason'>dead_reason_date2</p>
  //      </td>
  //    </tr>
  //    <tr id='villager-list-villagerB'>...</tr>
  //    ...
  //    <tr id='villager-list-villagerX'>...</tr>
  //  </tbody>
  var ret_body  = document.createElement('tbody');
  player_list.forEach(function(k){
    var tr          = document.createElement('tr');
    tr.setAttribute('id', 'villager-list-' + k);

    //// process 1: add villager_list into 1st col
    var td_villager = document.createElement('td');
    td_villager.setAttribute('id', 'villager-' + k);

    // villager_list: add character-name in mid.
    var a_villager  = document.createElement('a');
    a_villager.setAttribute('id', 'all-day-log-' + k);
    a_villager.setAttribute('href', '#');
    a_villager.innerText = k; // key: 
    td_villager.insertAdjacentElement('afterbegin', a_villager);

    // villager_list: add icon image to left side.
    var img = document.createElement('img');
    img.setAttribute("src", arg.log[base_date].players[k].icon);
    td_villager.insertAdjacentElement('afterbegin', img);

    // villager_list: count comments in forEach loop
    var comments = 0;
    var stat = "（生存中）";

    tr.insertAdjacentElement('beforeend', td_villager);

    //// process 2: add job and mob deducer field into 2nd to 4th col

    // deducer: Comments
    var td_a = document.createElement('td');
    var comment_count_day1 = document.createElement('p');
    comment_count_day1.setAttribute('id', 'stat-' + k + '-1-count');
    td_a.insertAdjacentElement('beforeend', comment_count_day1);
    tr.insertAdjacentElement('beforeend', td_a);

    //// process 3 : add <td> cell for day 2..N
    for (var i = 2 ; i <= datearray.length ; i++) {
      var td_a = document.createElement('td');
      var count = document.createElement('p');
      var dead_reason = document.createElement('p');
      count.setAttribute('id', 'stat-' + k + '-' + String(i) + '-count');
      dead_reason.setAttribute('id', 'stat-' + k + '-' + String(i) + '-dead_reason');
      td_a.insertAdjacentElement('beforeend', count);
      td_a.insertAdjacentElement('beforeend', dead_reason);
      tr.insertAdjacentElement('beforeend', td_a);
    }

    ret_body.insertAdjacentElement('beforeend', tr);
  });

  ret.insertAdjacentElement('beforeend', ret_head);
  ret.insertAdjacentElement('beforeend', ret_body);
  document.getElementById("deduce").textContent = '';
  document.getElementById("deduce").insertAdjacentElement('afterbegin', ret);

  return;
};
