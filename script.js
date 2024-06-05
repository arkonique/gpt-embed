let chat = [{
    role: "system",
    content: "You are a helpful assistant."
}];
// write an async function that sends the chat message to the api endpoint through a POST request and returns the response
async function sendChatMessage(message) {
    // send this data to the api endpoint through a POST request
    const response = await fetch("/api/endpoint.php", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: message }),
    });
    return response.json();
}

// convert the array of chat messages to a JSON string and save it to a variable named chatJSON which will be the input to the sendChatMessage function

// add event listener to #send button to send the chat message to the api endpoint


function clickFunction() {
    
    let currentMessage = document.getElementById("chat-input").value;
    document.getElementById("chat-input").value = "";
    

    let chatOutput = document.getElementById("chat-output");
    const messageDiv = document.createElement('div');
    messageDiv.className = 'user message';
    messageDiv.textContent = currentMessage;

    chatOutput.appendChild(messageDiv);
    chatOutput.scrollTop = chatOutput.scrollHeight;

    chat.push({ role: "user", content: currentMessage });
    
    let chatJSON = JSON.stringify(chat);
    
    sendChatMessage(chatJSON).then((response) => {
        chat.push({ role: "assistant", content: response });
        // display chat messages by appending them to the #chat-output div
        message = chat[chat.length - 1];
        if (message.role === "assistant") {
                var converter = new showdown.Converter()
                var html = converter.makeHtml(message.content)
                chatOutput.innerHTML += `<div class="assistant message">${html}</div>`;
                // add prettyprint class to the code blocks
                hljs.highlightAll();
                chatOutput.scrollTop = chatOutput.scrollHeight;
            }
    });
}


document.getElementById("send").addEventListener("click", clickFunction);
// event listener for pressing enter key
document.getElementById("chat-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        clickFunction();
    }
});