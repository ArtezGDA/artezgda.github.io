// Support TLS-specific URLs, when appropriate.
if (window.location.protocol == "https:") {
  var ws_scheme = "wss://";
} else {
  var ws_scheme = "ws://"
};

var chatServerHost = "wss://fast-mountain-78260.herokuapp.com";
var inbox = new ReconnectingWebSocket(chatServerHost + "/receive");
var outbox = new ReconnectingWebSocket(chatServerHost + "/submit");

inbox.onmessage = function(message) {
  var data = JSON.parse(message.data);
  if (data.handle == "bot") {
    var chatDiv = "<div class='chatmsg mine'>"
  } else {
    var chatDiv = "<div class='chatmsg their'>"
  }
  $("#conversation").append(chatDiv + $('<span/>').text(data.text).html() + "</div>");
  $("#conversation").stop().animate({
    scrollTop: $('#conversation')[0].scrollHeight
  }, 800);
};

inbox.onclose = function(){
    console.log('inbox closed');
    this.inbox = new WebSocket(inbox.url);

};

outbox.onclose = function(){
    console.log('outbox closed');
    this.outbox = new WebSocket(outbox.url);
};

function sendMessage(text) {
  outbox.send(JSON.stringify({ handle: "bot", text: text }));
  $("#textInput")[0].value = "";
}

$("#inputForm").on("submit", function(event) {
  event.preventDefault();
  var text = $("#textInput")[0].value;
  sendMessage(text);
});

$(".chatButton").click(function(event) {
  event.preventDefault(); 
  var text = $(event.target).text();
  sendMessage(text);
});