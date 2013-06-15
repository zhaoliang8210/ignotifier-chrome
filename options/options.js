var $ = (function() {
  var cache = [];
  return function(id) {
    if (cache[id]) {
      return cache[id];
    }
    cache[id] = document.getElementById(id);
    return cache[id];
  }
})();
function IsNumeric(input) {
  return (input - 0) == input && (input + '').replace(/^\s+|\s+$/g, "").length > 0;
}

var period;

function load () {
  $("period").value = localStorage['period'];
  $("feeds").value = localStorage['feeds'];
  $("notification").checked = localStorage['notification'] == "true" ? true : false;
  $("alert").checked = localStorage['alert'] == "true" ? true : false;
  $("alphabetic").checked = localStorage['alphabetic'] == "true" ? true : false;
  //$("soundNotification").value = localStorage['soundNotification'];
}


window.addEventListener("load", function () {
  load ();
  
  var period = function (e) {
    e.preventDefault();
    var value = $("period").value;
    console.log(value);
    
    if (!IsNumeric (value) || parseInt(value) < 10) {
      $("period").value = 10;
      localStorage['period'] = 10;
    }
    else {
      localStorage['period'] = parseInt(value);
    }
  }
  $("period").addEventListener("keyup", period, false);
  $("period").addEventListener("change", period, false);
  $("feeds").addEventListener("keyup", function () {
    localStorage['feeds'] = $("feeds").value;
  }, false);
  $("notification").addEventListener("change", function () {
    console.log($("notification").checked);
    localStorage['notification'] = $("notification").checked;
  }, false);
  $("alert").addEventListener("change", function () {
    localStorage['alert'] = $("alert").checked;
  }, false);
  $("alphabetic").addEventListener("change", function () {
    localStorage['alphabetic'] = $("alphabetic").checked;
  }, false);
  /*
  $("soundNotification").addEventListener("change", function () {
    localStorage['soundNotification'] = $("soundNotification").value;
  }, false);
  $("sound").addEventListener("change", function () {
    console.log($("sound").value);
    localStorage['sound'] = $("sound").value;
  }, false);
  */
  $("reset").addEventListener("click", function () {
    chrome.extension.getBackgroundPage().setPreferences();
    load();
  }, false);

}, false);