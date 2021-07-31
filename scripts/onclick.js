//var SERVER_URL = 'http://dev.cs.smu.ca:8128';
var SERVER_URL = 'http://localhost:8128';


function saveInformation() {
    //check if input information is valid
    debugger;
    if (validateUniversityInfo()) {
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

}


function validateUniversityInfo() {

    //first get the values from the fields 
    var name = $("#name").val();
    var address = $("#address").val();
    var phone = $("#phone").val();

    //check empty fields
    if (name == '') {
        alert("Please enter the name of the university!");
        $("#name").focus();
        return false;
    }

    if (address == '') {
        alert("Please enter the address of the university!");
        $("#address").focus();
        return false;
    }

    if (phone == '') {
        alert("Please enter the phone number of the university!");
        $("#phone").focus();
        return false;
    }

    //check if address start with number
    var firstChar = address.trim().substr(0, 1);
    if (isNaN(firstChar)) {
        alert("Address should start with a number!");
        $("#address").focus();
        return false;
    }
    //check if phone is consists of hyphen and number
    var tokens = phone.split('-');
    for (var i = 0; i < tokens.length; i++) {
        if (isNaN(tokens[i])) {
            alert("Please use only numbers or hyphens!");
            $("#phone").focus();
            return false;
        }//end if
    }//end for

    // check if address contains letters
    var pattern = /[a-z]/i;
    if (!(pattern.test(address))) {
        alert("Address should contain letters!");
        $("#address").focus();
        return false;
    }
    // all validation passed, return true
    return true;


}

function searchInfo() {
    debugger;
    //validate search input
    var search = $("#search").val();

    //check empty fields
    if (search == '') {
        alert("Please enter the name of searching university!");
        $("#search").focus();
        return false;
    }
    debugger;
    var universityName = $("#search").val();
    $.get(SERVER_URL + '/find/' + universityName, function (data) {
        // code when succeeded
        // data can contain the returned data from server
        display([data]);
    })
        .fail(function (error) {
            // code when failed
            alert("Error: " + error.responseText);
        });

}

//delete input university in database
function deleteInformation() {
    debugger;
    if (validateUniversityInfo()) {
        var university = {
            name: $("#name").val(),
            address: $("#address").val(),
            phone: $("#phone").val()
        };
        //first grab the name of the university
        var key = $('#name').val();
        $.post(SERVER_URL + '/delete/' + key, university, function (data) {
            // code when succeeded
            // data can contain the returned data from server
            debugger;
            alert(data);
        })
            .fail(function (error) {
                // code when failed
                alert("Error: " + error.responseText);
            });
    }

}//end function



function displayRecords() {
    var universityName = $("#search").val();
    $.get(SERVER_URL + '/queryuniversitylist', function (data) {
        // code when succeeded
        // data can contain the returned data from server
        display(data);
    })
        .fail(function (error) {
            // code when failed
            alert("Error: " + error.responseText);
        });
}


function display(universities) {
    //Initializing the table
    $("#displayTable").html(
        "   <tr>" +
        "     <th>Name</th>" +
        "     <th>Address</th>" +
        "     <th>Phone</th>" +
        "   </tr>"
    );

    //use a familiar general JS table object from here
    //the expense tracker app uses a different way
    var table = document.getElementById('displayTable');

    //go through each record
    for (var i = 0; i < universities.length; i++) {

        var name = universities[i].name;//Name attribute
        var address = universities[i].address; // Address attribute
        var phone = universities[i].phone; //PhoneNumber attribute

        var r = table.insertRow();
        r.insertCell(-1).innerHTML = name;
        r.insertCell(-1).innerHTML = address;
        r.insertCell(-1).innerHTML = phone;

    }//end for


}

