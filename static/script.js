document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatHistory = document.getElementById('chat-history');

    const sendMessage = async () => {
        const message = userInput.value.trim();
        if (message === '') return;

        appendMessage(message, 'user-message');
        userInput.value = '';

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            appendMessage(data.response, 'bot-message');
        } catch (error) {
            console.error('Error:', error);
            appendMessage('Sorry, something went wrong.', 'bot-message');
        }
    };

    const appendMessage = (message, className) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', className);
        messageElement.textContent = message;
        chatHistory.appendChild(messageElement);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    };

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});
