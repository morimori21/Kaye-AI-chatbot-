var chatBox = document.getElementById('chat');
var messageInput = document.getElementById('message');
var sendButton = document.getElementById('send-btn');


function addMessage(text, who) {
    var newMessage = document.createElement('div');
    newMessage.className = 'message ' + who;
    newMessage.innerText = text;
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    var text = messageInput.value;

    if (text === "") {
        return
    }

    addMessage(text, 'user');
    messageInput.value = '';

    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        addMessage(data.reply, 'bot');
    })
}

sendButton.onclick = sendMessage;

messageInput.onkeydown = function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }  
};