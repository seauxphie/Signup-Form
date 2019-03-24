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
    var zipCode = /[0-9][0-9]-[0-9][0-9][0-9]/
    if (zipCode.test(str)) {
        document.getElementById("kod").innerHTML = "OK";
        document.getElementById("kod").className = "green";
        return true;
    }
    else {
        document.getElementById("kod").innerHTML = "Źle";
        document.getElementById("kod").className = "red";
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
    var elems = new Array(form.length);
    elems.fill(true);
    elems[0] = checkStringAndFocus(form.elements["f_imie"], "Podaj imię!");
    elems[1] = checkString(form.elements["f_nazwisko"].value, "Podaj nazwisko!");
    elems[5] = checkEmailRegEx(form.elements["f_email"].value);
    elems[6] = checkZipCodeRegEx(form.elements["f_kod"].value);
    elems[7] = checkString(form.elements["f_ulica"].value, "Podaj ulicę!");
    elems[8] = checkString(form.elements["f_miasto"].value, "Podaj miasto!");
    var validated = elems[0] && elems[1] && elems[5] && elems[6] && elems[7] && elems[8];
    if (!validated) {
        for (var i = 0; i < form.length; i++) {
            if (!elems[i]) form.elements.item(i).className = "wrong";
        }
    }

    return validated;
}

function alterRows(i, e) {
    if (e) {
        if (i % 2 == 1) {
            e.setAttribute("style", "background-color: Aqua;");
        }
        e = e.nextSibling;
        while (e && e.nodeType != 1) {
            e = e.nextSibling;
        }
        alterRows(++i, e);
    }
}

alterRows(1, document.getElementsByTagName("tr")[0])


function nextNode(e) {
    while (e && e.nodeType != 1) {
        e = e.nextSibling;
    }
    return e;
}
function prevNode(e) {
    while (e && e.nodeType != 1) {
        e = e.previousSibling;
    }
    return e;
}
function swapRows(b) {
    var tab = prevNode(b.previousSibling);
    var tBody = nextNode(tab.firstChild);
    var lastNode = prevNode(tBody.lastChild);
    tBody.removeChild(lastNode);
    var firstNode = nextNode(tBody.firstChild);
    tBody.insertBefore(lastNode, firstNode);
}

function cnt(form, msg, maxSize) {
    if (form.value.length > maxSize)
    form.value = form.value.substring(0, maxSize);
    else
    msg.innerHTML = maxSize - form.value.length;
   }