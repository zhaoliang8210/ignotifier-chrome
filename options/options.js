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
  $("resetPeriod").value = localStorage['resetPeriod'] || "0";
  $("initialPeriod").value = localStorage['initialPeriod'] || "1";
  $("feeds").value = localStorage['feeds'];
  $("notification").checked = localStorage['notification'] == "true" ? true : false;
  $("alert").checked = localStorage['alert'] == "true" ? true : false;
  $("alphabetic").checked = localStorage['alphabetic'] == "true" ? true : false;
  $("soundNotification").value = localStorage['soundNotification'];
}

window.addEventListener("load", function () {
  load ();
  
  var period = function (id, min, e, checkFor) {
    e.preventDefault();
    var value = $(id).value;

    if (!IsNumeric (value) || parseInt(value) < min) {
      $(id).value = min;
      localStorage[id] = min;
    }
    else {
      localStorage[id] = parseInt(value);
    }
  }
  $("period").addEventListener("keyup", function (e) {period("period", 10, e)}, false);
  $("period").addEventListener("change", function (e) {period("period", 10, e)}, false);
  $("initialPeriod").addEventListener("keyup", function (e) {period("initialPeriod", 1, e)}, false);
  $("initialPeriod").addEventListener("change", function (e) {period("initialPeriod", 1, e)}, false);
  $("resetPeriod").addEventListener("keyup", function (e) {
    period("resetPeriod", 0, e);
    chrome.extension.getBackgroundPage().onResetPeriod();
  }, false);
  $("resetPeriod").addEventListener("change", function (e) {
    period("resetPeriod", 0, e);
    chrome.extension.getBackgroundPage().onResetPeriod();
  }, false);
  
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
  $("soundNotification").addEventListener("change", function () {
    var value = $("soundNotification").value;
    localStorage['soundNotification'] = value;
    chrome.extension.getBackgroundPage().play.reset();
  }, false);
  $("sound").addEventListener("change", function () {
    var file = $("sound").files[0];
    var reader = new FileReader()
    reader.onload = function(e) {
      localStorage['soundMime'] = file.type;
      localStorage['sound'] = e.target.result;
      chrome.extension.getBackgroundPage().play.reset();
    }
    reader.readAsDataURL(file);
  }, false);
  $("reset").addEventListener("click", function () {
    localStorage['alphabetic']         = false;
    localStorage['alert']            = true;
    localStorage['notification']       = true;
    localStorage['period']             = 15;
    localStorage['soundNotification']  = 1;
    localStorage['resetPeriod']        = 0;
    localStorage['initialPeriod']      = 1;
    localStorage['feeds']              = "https://mail.google.com/mail/u/0/feed/atom, https://mail.google.com/mail/u/1/feed/atom, https://mail.google.com/mail/u/2/feed/atom, https://mail.google.com/mail/u/3/feed/atom";

    chrome.extension.getBackgroundPage().play.reset();
    load();
  }, false);

}, false);