function isEmpty(content) {
    if (content.length == 0) return true;
    return false;
}

function isWhiteSpace(str) {
    var ws = "\t\n\r ";
    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (ws.indexOf(c) == -1) {
            return false;
        }
    }
    return true;
}

function checkString(str, msg) {
    if (isEmpty(str) || isWhiteSpace(str)) {
        alert(msg);
        return false;
    }
    return true;
}

function checkEmail(str) {
    if (isWhiteSpace(str)) {
        alert("Podaj właściwy e-mail");
        return false;
    }
    else {
        var at = str.indexOf("@");
        if (at < 1) {
            alert("Nieprawidłowy e-mail");
            return false;
        }
        else {
            var l = -1;
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                if (c == ".") {
                    l = i;
                }
            }
            if ((l < (at + 2)) || (l == str.length - 1)) {
                alert("Nieprawidłowy e-mail");
                return false;
            }
        }
        return true;
    }
}

function checkStringAndFocus(obj, msg) {

    var str = obj.value;
    var errorFieldName = "e_" + obj.name.substr(2, obj.name.length);
    if (isWhiteSpace(str) || isEmpty(str)) {
        document.getElementById(errorFieldName).innerHTML = msg;
        obj.focus();
        startTimer(errorFieldName);
        return false;
    }
    else {
        return true;
    }
}

function checkEmailRegEx(str) {
    var email = /[a-zA-Z_0-9\.]+@[a-zA-Z_0-9\.]+\.[a-zA-Z][a-zA-Z]+/;
    if (email.test(str))
        return true;
    else {
        alert("Podaj właściwy e-mail");
        return false;
    }
}

function checkZipCodeRegEx(str) {
    var zipCode=/[0-9][0-9]-[0-9][0-9][0-9]/
    if (zipCode.test(str)) {
        document.getElementById("kod").innerHTML="OK";
        document.getElementById("kod").className="green";
        return true;
    }
    else {
        document.getElementById("kod").innerHTML="Źle";
        document.getElementById("kod").className="red";
        return false;

    }
    
}


var errorField = "";
function startTimer(fName) {
    errorField = fName;
    window.setTimeout("clearError(errorField)", 5000);
}
function clearError(objName) {
    document.getElementById(objName).innerHTML = "";
}

function showElement(e) {
    document.getElementById(e).style.visibility = 'visible';
}
function hideElement(e) {
    document.getElementById(e).style.visibility = 'hidden';
}



function validate(form) {
    
    return checkStringAndFocus(form.elements["f_imie"], "Podaj imię!")
        && checkString(form.elements["f_nazwisko"].value, "Podaj nazwisko!")
        && checkEmailRegEx(form.elements["f_email"].value)
        && checkZipCodeRegEx(form.elements["f_kod"].value)
        && checkString(form.elements["f_ulica"].value, "Podaj ulicę!")
        && checkString(form.elements["f_miasto"].value, "Podaj miasto!")
        
}