/*$(function () {

$.getJSON('http://localhost:9001/query/Paris', function(data){
console.log(data);
//var template = '<h1> <%= tech %> </h1>';
//var template = '<img src="http://www.culture.gouv.fr/Wave/image/joconde<%= relative_url %>" />';

_.each(data, function(notice){
    //console.log(notice.relative_url);
var html = _.template(template, notice);
$('body').append(html);
});
});

})*/

var query;
var typingTimer;                //timer identifier
var doneTypingInterval = 400;  //time in ms, 5 second for example
//on keyup, start the countdown
$('#query').keyup(function(){
    query = $(this).val();
    clearTimeout(typingTimer);
    if ($('#query').val()) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
});
//user is "finished typing," do something
function doneTyping () {
    console.log('GET http://localhost:9001/query/'+query);
    $.getJSON('http://localhost:9001/query/'+query, function (data) {
        console.log(data);
    });
}