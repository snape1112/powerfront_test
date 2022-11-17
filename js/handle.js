var meTemplate = Handlebars.compile($("#me-template").html());
var youTemplate = Handlebars.compile($("#you-template").html());

chat.getChatHistory(function(data) {
    var out = "";
    for (var msg of data) {
        msg.datetime = moment(msg.datetime).format('h:mm A');
        if (msg.from === 'Visitor') {
            out += meTemplate(msg);
        } else {
            out += youTemplate(msg);
        }
    }

    $('#chatHistory ul').html(out);
    $('#chatHolder').animate({
        scrollTop: $('#chatHistory ul').height()
    }, 1000);
});

chat.addListener('chatreceived', function(msg) {
    msg.chat.datetime = moment(msg.chat.datetime).format('h:mm A');
    var out = "";
    if (msg.chat.from === 'Visitor') {
        out += meTemplate(msg.chat);
    } else {
        out += youTemplate(msg.chat);
    }
    $('#liveChat ul').append(out);

    $('#chatHolder').animate({
        scrollTop: $('#liveChat ul').height() + $('#chatHistory ul').height()
    }, 1000);
})

$('#chatInput').keyup(function(e) {
    if (e.keyCode == 13) {
        const text = $('#chatInput').val();
        if (text && text.length) {
            chat.sendChat($('#chatInput').val());
            $('#chatInput').val('');
        }
    }
});
