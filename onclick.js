//var SERVER_URL = 'http://dev.cs.smu.ca:8128';
var SERVER_URL = 'http://localhost:8128';


function saveInformation() {
    //create an university
    var university = {
        name: $("#name").val(),
        address: $("#address").val(),
        phone: $("#phone").val()
    };
    var test = { name: "John", age: 30, city: "New York" };
    var parameter1 = JSON.stringify(test);
    var parameter = JSON.stringify(university);
    debugger;
    //now send the request
    $.post(SERVER_URL + "/saveuniversity",
        university,
        function (data) {
            alert("Result saved successfully!");
        }).fail(function (error) {
            alert("Error: " + error.responseText);
        });


}