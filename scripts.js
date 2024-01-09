const socket = io();

socket.on('number', (msg) => {
    console.log('Random Number: ' + msg);
});

socket.on('message', (msg) => {
    console.log('Chat Message: ' + msg);
    // Handle the chat message display in your HTML, for example:
    $('#chatMessages').append($('<li>').text(msg));
});

socket.on('randomNumber', (randomNumber) => {
    console.log('Random Number Received: ' + randomNumber);
    // Handle the random number display in your HTML, for example:
    $('#randomNumberDisplay').text('Random Number: ' + randomNumber);
});

$(document).ready(function () {
    $('.materialboxed').materialbox();

    $('#formSubmit').click(() => {
        formSubmitted();
    });

    $('#formDelete').click(() => {
        deleteLastCat();
    });

    $('.modal').modal();
    getAllCats();
    console.log('Ready');
});

// Additional functions and event handlers go here
