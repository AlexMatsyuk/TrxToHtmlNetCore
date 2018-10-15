
var myColor = ["#c0eec0", "#fed9d9", "#FBE87E"];//green,red,yellow
var myStrokeColor = ["#7CCD7C", "#d42945", "#ffcc00"];

function GetShortDateTime(time)
{
    return time;
}

function ToExactTimeDefinition(start,finish)
{
    return finish;
}

function ParseDuration(duration)
{
    return "01:23:45";
}

function ExtractImageUrl(text)
{
    return "d:\\image.jpg";
}

function ShowHide(id1, id2, textOnHide, textOnShow) {
    if (document.getElementById(id1).className == 'visibleRow') {
        document.getElementById(id2).innerHTML = textOnHide;
        document.getElementById(id1).className = 'hiddenRow';
    }
    else {
        document.getElementById(id2).innerHTML = textOnShow;
        document.getElementById(id1).className = 'visibleRow';
    }
}

function FilterRows() {
    xpath = "//tr[contains(@id,'testRow')]";
    for (i = 0; i < arguments.length; i++) {
        filterText = GetElementsByXpath("//input[@id='filter" + arguments[i] + "']")[0].value;
        xpath = xpath + "[./td[@id='row"+arguments[i]+"' and .//*[contains(text(),'"+filterText+"')]]]";
    }
    ReplaceClass(xpath, "hiddenRow", "visibleRow");
}

function SortRows(column) {
    var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = GetElementsByXpath("//table[@id='ReportsTable']//tr[contains(@id,'testRow') and contains(@class,'visibleRow')]");
        for (i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].querySelector('[id="row'+column+'"]').textContent;
            y = rows[i+1].querySelector('[id="row'+column+'"]').textContent;
            if (dir == "asc") {
                if (x.toLowerCase() > y.toLowerCase()) {
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.toLowerCase() < y.toLowerCase()) {
                    shouldSwitch= true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }

    rows = GetElementsByXpath("//table[@id='ReportsTable']//tr[contains(@id,'testRow') and contains(@class,'visibleRow')]");
    for (i = 0; i < (rows.length - 1); i++) {
        testId = rows[i].id.replace("testRow ", "");
        detailsRow = GetElementsByXpath("//table[@id='ReportsTable']//tr[@id='" + testId + "TestsContainer']")[0];
        detailsRow.parentNode.insertBefore(detailsRow, rows[i].nextSibling)
    }
}

function ReplaceClass(xpath, oldClassPart, newClassPart) {
    elements = GetElementsByXpath(xpath);
    for (i = 0, n = elements.length; i < n; ++i) {
        node = elements[ i ];
        node.className = node.className.replace(oldClassPart, newClassPart);
    }
}

function ReplaceText(xpath, oldTextPart, newTextPart) {
    elements = GetElementsByXpath(xpath);
    for (i = 0, n = elements.length; i < n; ++i) {
        node = elements[ i ];
        node.textContent = node.textContent.replace(oldTextPart, newTextPart);
    }
}

function SetText(xpath, newText) {
    elements = GetElementsByXpath(xpath);
    for (i = 0, n = elements.length; i < n; ++i) {
        node = elements[ i ];
        node.textContent = newText;
    }
}

function ClearValue(xpath) {
    elements = GetElementsByXpath(xpath);
    for (i = 0, n = elements.length; i < n; ++i) {
        elements[i].value = "";
    }
}

function CheckUncheck(checkboxXpath, xpath) {
    selected = GetElementsByXpath(checkboxXpath)[0].checked;
    elements = GetElementsByXpath(xpath);
    for (i = 0, n = elements.length; i < n; ++i) {
        node = elements[ i ];
        if (selected && !node.className.includes(" selected")){
            node.className = node.className + " selected";
        } else if (!selected && node.className.includes(" selected")) {
            node.className = node.className.replace(" selected", "");
        }
    }
}

function CheckUncheckAll(checkboxAllXpath, testCheckboxesXpath) {
    checked = GetElementsByXpath(checkboxAllXpath)[0].checked;
    elements = GetElementsByXpath(testCheckboxesXpath);
    for (i = 0, n = elements.length; i < n; ++i) {
        elements[ i ].checked = checked;
    }
}

function UncheckAll(xpath) {
    elements = GetElementsByXpath(xpath);
    for (i = 0, n = elements.length; i < n; ++i) {
        elements[ i ].checked = false;
    }
}

function SetTfsTestFilterCriteria(testsXpath, resultFieldXpath) {
    elements = GetElementsByXpath(testsXpath);
    x = "";
    for (i = 0, n = elements.length; i < n; ++i) {
        x = x + "Name=" + elements[i].textContent + "|";
    }
    x = x.substring(0, x.length - 1);
    GetElementsByXpath(resultFieldXpath)[0].textContent = x;
}

function SetLocalTestFilterCriteria(testsXpath, resultFieldXpath) {
    elements = GetElementsByXpath(testsXpath);
    x = "/Tests:";
    for (i = 0, n = elements.length; i < n; ++i) {
        x = x + elements[i].textContent + ",";
    }
    x = x.substring(0, x.length - 1);
    GetElementsByXpath(resultFieldXpath)[0].textContent = x;
}

function GetElementsByXpath(xpath) {
    var result = document.evaluate(xpath, document.documentElement, null,
        XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    elements = [];
    if (result){
        while ((node = result.iterateNext())) {
            elements.push(node);
        }
    }
    return elements;
}

function AddEventListener() {
    var button = document.getElementById('btn-download');
    button.addEventListener('click', function () {
        button.href = canvas.toDataURL('image/png');
    });
}

function show(id) {
    document.getElementById(id).style.visibility = "visible";
    document.getElementById(id).style.display = "block";
}
function hide(id) {

    document.getElementById(id).style.visibility = "hidden";
    document.getElementById(id).style.display = "none";
}

function OpenInNewWindow(){
    var largeImage = document.getElementById('floatingImage');
    var url=largeImage.getAttribute('src');
    window.open(url,'Image');
}

function updateFloatingImage(url) {
    document.getElementById('floatingImage').src = url;
}

function download(filename, text) {
    console.log("download method");
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function downloadCurrentHtml() {
    currentUrl = window.location.href;
    currentName = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
    updatedName = currentName.substring(0, currentName.lastIndexOf(".")) + ".with_comments.html";
    download(updatedName, document.documentElement.innerHTML);
}

function saveComment(xpath){
    console.log("saveComment mehtod");
    elements = GetElementsByXpath(xpath);
    for (i = 0, n = elements.length; i < n; ++i){
        elements[i].setAttribute("value", elements[i].value);
    }
}

function extractComment(xpath) {
    elements = GetElementsByXpath(xpath);
    for (i = 0, n = elements.length; i < n; ++i){
        //elements[i].value = localStorage.getItem(elements[i].id);
        elements[i].value = elements[i].getAttribute("value");
    }
}

/**
 * @return {number}
 */
function GetTotal() {
    var myTotal = 0;
    for (var j = 0; j < myData.length; j++) {
        myTotal += (typeof myData[j] == 'number') ? myData[j] : 0;
    }
    return myTotal;
}

function CreateHorizontalBars(id, totalPass, totalFailed, totalWarn) {

    if (isNaN(totalPass) || isNaN(totalFailed) || isNaN(totalWarn)) {
        drawLine(30, 4.5, 3, 30.5, id);
    }
    var canvas;
    var ctx;
    var myArray = new Array(3);
    myArray[0] = totalPass;
    myArray[1] = totalFailed;
    myArray[2] = totalWarn;

    canvas = document.getElementById(id);
    ctx = canvas.getContext("2d");

    var cw = canvas.width;
    var ch = canvas.height;

    var width = 6;
    var currX = -12;

    ctx.translate(cw / 2, ch / 2);

    ctx.rotate(Math.PI / 2);

    ctx.restore();

    for (var i = 0 ; i < myArray.length; i++) {
        ctx.moveTo(100, 0);
        ctx.fillStyle = myColor[i];
        var h = myArray[i];
        ctx.fillRect(currX, (canvas.height - h) + 25, width, h);
        currX += width + 1;
    }
}



function CreatePie() {
    var canvas;
    var ctx;
    var lastend = 0;
    var myTotal = GetTotal();

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    CreateText();

    for (var i = 0; i < myData.length; i++) {
        ctx.fillStyle = myColor[i];
        ctx.beginPath();
        ctx.moveTo(160, 75);
        ctx.arc(160, 75, 75, lastend, lastend +
            (Math.PI * 2 * (myData[i] / myTotal)), false);
        ctx.lineTo(160, 75);
        ctx.fill();
        lastend += Math.PI * 2 * (myData[i] / myTotal);
        ctx.arc(160, 75, 40, 0, Math.PI * 2);
    }

    // either change this to the background color, or use the global composition
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.moveTo(160, 35);
    ctx.arc(160, 75, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    // if using the global composition method, make sure to change it back to default.
    ctx.globalCompositeOperation = "source-over";
}

function drawLine(x1, y1, x2, y2, id) {
    var canvas = document.getElementById(id);
    var context = canvas.getContext("2d");

    for (var i = 0; i < 8; i++) {
        context.fillStyle = '#000';
        context.strokeStyle = '#B0B0B0';

        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineWidth = 1;
        context.stroke();
        context.closePath();
        x1 += 10;
        y2 += 10;
    }
}

function CreateText() {
    var canvas;
    var ctx;
    var textPosY = 50;
    var textPosX = 0;

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < myData.length; i++) {
        ctx.fillStyle = myStrokeColor[i];
        ctx.font = "15px arial";
        ctx.fillText(myParsedData[i], textPosX, textPosY);
        textPosY += 35;
    }
}

var allPassed = 0;
var allFailed = 0;
var allWarns = 0;

var myData = [];

var myParsedData = [];

function CalculateTotalPrecents() {

    var totalTests = allPassed + allFailed + allWarns;
    var passedPrec = (allPassed / totalTests) * 100;
    var failedPrec = (allFailed / totalTests) * 100;
    var warnPrec = (allWarns / totalTests) * 100;

    myData.push(passedPrec);
    myData.push(failedPrec);
    myData.push(warnPrec);

    myParsedData.push(allPassed + " (" + Math.round(passedPrec).toFixed(2) + "%)");
    myParsedData.push(allFailed + " (" + Math.round(failedPrec).toFixed(2) + "%)");
    myParsedData.push(allWarns + " (" + Math.round(warnPrec).toFixed(2) + "%)");

    document.getElementById('dataViewer').innerHTML = "<tr class='odd'><td><canvas id='canvas' width='240' height='150'>This text is displayed if your browser does not support HTML5 Canvas.</canvas></td></tr>";
    CreatePie();
    AddEventListener();
}

function CalculateTestsStatuses(testContaineId, canvasId) {
    var totalPassed = 0;
    var totalFailed = 0;
    var totalInconclusive = 0;
    var e = document.getElementById(testContaineId);
    var tests = e.getElementsByClassName('Test');
    for (var i = 0; i < tests.length; i++) {
        var test = tests[i];
        if (test.getElementsByClassName('warn').length > 0) {
            totalInconclusive++;
            allWarns++;
        }
        else if (test.getElementsByClassName('failed').length > 0) {
            totalFailed++;
            allFailed++;
        }
        else if (test.getElementsByClassName('passed').length > 0) {
            totalPassed++;
            allPassed++;
        }
    }

    var totalTests = totalFailed + totalInconclusive + totalPassed;
    var passedPrec = (totalPassed / totalTests) * 100;
    var failedPrec = (totalFailed / totalTests) * 100;
    var warnPrec = (totalInconclusive / totalTests) * 100;


    CreateHorizontalBars(canvasId, passedPrec, failedPrec, warnPrec);
}



