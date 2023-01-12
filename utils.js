//Copy generated citation text to the clipboard:
function copyCitation()
{
    /*
        Copying/Pasting is a tricky thing as of Nov. 2022, as
        document.execCommand is deprecated. Instead, we're supposed
        to use navigator.clipboard, but I spent a full day and
        couldn't make it work (text formatting shows as HTML tags).

        I had to look at a few Stackoverflow answers and articles
        to get something that looks like this. It'll have to be
        remade once the new ways become better supported and more
        consistent, and once more info exists on how to use them.
    */
    
    const container = document.createElement('div');
    container.innerHTML = document.querySelector("#citation").innerHTML;
    
    //Don't do visibility or move it off screen, or you might not be able to select it, IIRC.
    container.style.position = 'fixed';
    container.style.opacity = 0;
    document.body.appendChild(container);
    
    var activeSheets = Array.prototype.slice.call(document.styleSheets).filter(function (sheet) {
        return !sheet.disabled;
    });

    window.getSelection().removeAllRanges();
    const range = document.createRange();
    range.selectNode(container);
    window.getSelection().addRange(range);
    
    document.execCommand('copy'); //TODO: This is deprecated, but seemingly irreplaceable.
    for (var i = 0; i < activeSheets.length; i++)
    {
        activeSheets[i].disabled = true;
    }
    document.execCommand('copy');
    for (var i = 0; i < activeSheets.length; i++)
    {
        activeSheets[i].disabled = false;
    }
    
    document.body.removeChild(container);
}

//Set the labels in the correct place:
function checkLabelPlacement()
{
    //First, get a list of all labels on the page
    var allLabels = Array.from(document.getElementsByTagName("label"));

    //Then change the left of each one to the input it is "for":
    allLabels.forEach(element => {
        if(document.getElementById(element.htmlFor).type === "radio")
        {
            element.style.left = (document.getElementById(element.htmlFor).getBoundingClientRect().left + 15) + "px";
            element.style.top = (document.getElementById(element.htmlFor).getBoundingClientRect().top - 10) + "px";
        }
        else
        {
            element.style.left = document.getElementById(element.htmlFor).getBoundingClientRect().left + "px";
        }
    });
}

//Redraw the UI
function drawUI()
{
    var df = document.getElementById("citation-form").getAttribute("data-format");
    var dm = document.getElementById("citation-form").getAttribute("data-medium");

    switch(dm)
    {
        case "book":
            if(df === "apa")
            {
                //All that included indentation seems to make a difference in placement:
                document.getElementById("citation-form").innerHTML = "" +
                    "                <label for=\"f-initial0\" id=\"lfi\">First Name (or initial)</label><label for=\"m-initial0\" id=\"lmi\">Middle Name (or initial)</label><label for=\"last-name0\" id=\"lln\">Last Name</label>" +
                    "                <br>" +
                    "                <div id=\"author-list\" data-auths=\"1\">" +
                    "                    <input type=\"text\" id=\"f-initial0\" name=\"finit\"/>" +
                    "                    <input type=\"text\" id=\"m-initial0\" name=\"minit\"/>" +
                    "                    <input type=\"text\" id=\"last-name0\" name=\"lname\"/>" +
                    "                    <br>" +
                    "                </div>" +
                    "                <input type=\"button\" value=\"+ Author\" onclick=\"addAuthor()\">" +
                    "                <br>" +
                    "                <label for=\"date-pub\" id=\"ldp\">Year Published</label>" +
                    "                <br>" +
                    "                <input type=\"number\" id=\"date-pub\" name=\"datepub\"/>" +
                    "                <br>" +
                    "                <label for=\"source-title\" id=\"lt\">Title</label><label for=\"edition\">Edition Number</label>" +
                    "                <br>" +
                    "                <input type=\"text\" id=\"source-title\" name=\"sourcetitle\"/>" +
                    "                <input type=\"number\" id=\"edition\" name=\"edition\"/>" +
                    "                <br>" +
                    "                <label for=\"pub-name\" id=\"lpn\">Publisher</label><label for=\"pub-city\" id=\"lpc\">City of Publisher</label><label for=\"pub-loc\" id=\"lpl\">State or Country of Publisher</label>" +
                    "                <br>" +
                    "                <input type=\"text\" id=\"pub-name\" name=\"pubname\"/>" +
                    "                <input type=\"text\" id=\"pub-city\" name=\"pubcity\"/>" +
                    "                <input type=\"text\" id=\"pub-loc\" name=\"publoc\"/>" +
                    "                <br>" +
                    "                <label for=\"source-url\" id=\"lsu\">URL (If Found Online)</label>" +
                    "                <br>" +
                    "                <input type=\"text\" id=\"source-url\" name=\"sourceurl\"/>" +
                    "                <br>" +
                    "                <input type=\"submit\" id=\"submit-button\" value=\"Generate!\" onclick=\"bookAPA()\"/>";
                    checkLabelPlacement();
            }
            else
            {
                alert("Not implemented yet.");
            }
            break;

        case "web":
            if(df === "apa")
            {
                //All of that included indentation seems to make a difference in placement.
                //I think it keeps at least 1 space and it seems to make a huge difference when adding authors.
                document.getElementById("citation-form").innerHTML = "" +
                    "                <label for=\"f-initial0\" id=\"lfi\">First Name (or initial)</label><label for=\"m-initial0\" id=\"lmi\">Middle Name (or initial)</label><label for=\"last-name0\" id=\"lln\">Last Name</label>" +
                    "                <br>" +
                    "                <div id=\"author-list\" data-auths=\"1\">" +
                    "                    <input type=\"text\" id=\"f-initial0\" name=\"finit\"/>" +
                    "                    <input type=\"text\" id=\"m-initial0\" name=\"minit\"/>" +
                    "                    <input type=\"text\" id=\"last-name0\" name=\"lname\"/>" +
                    "                    <br>" +
                    "                </div>" +
                    "                <input type=\"button\" value=\"+ Author\" onclick=\"addAuthor()\">" +
                    "                <br>" +
                    "                <label for=\"date-pub\" id=\"ldp\">Year Published</label>" +
                    "                <br>" +
                    "                <input type=\"number\" id=\"date-pub\" name=\"datepub\"/>" +
                    "                <br>" +
                    "                <label for=\"source-title\" id=\"lt\">Title</label><label for=\"edition\">Edition Number</label>" +
                    "                <br>" +
                    "                <input type=\"text\" id=\"source-title\" name=\"sourcetitle\"/>" +
                    "                <input type=\"number\" id=\"edition\" name=\"edition\"/>" +
                    "                <br>" +
                    "                <label for=\"pub-name\" id=\"lpn\">Publisher</label><label for=\"pub-city\" id=\"lpc\">City of Publisher</label><label for=\"pub-loc\" id=\"lpl\">State or Country of Publisher</label>" +
                    "                <br>" +
                    "                <input type=\"text\" id=\"pub-name\" name=\"pubname\"/>" +
                    "                <input type=\"text\" id=\"pub-city\" name=\"pubcity\"/>" +
                    "                <input type=\"text\" id=\"pub-loc\" name=\"publoc\"/>" +
                    "                <br>" +
                    "                <label for=\"source-url\" id=\"lsu\">URL (If Found Online)</label>" +
                    "                <br>" +
                    "                <input type=\"text\" id=\"source-url\" name=\"sourceurl\"/>" +
                    "                <br>" +
                    "                <input type=\"submit\" id=\"submit-button\" value=\"Generate!\" onclick=\"bookAPA()\"/>";
                    checkLabelPlacement();
            }
            else
            {
                alert("Not implemented yet.");
            }
            break;
    }
}

//Add a new row for author's name (but only if the previous last name field was given):
function addAuthor()
{
    //Find the final last name box and determine if it's been filled yet:
    var finalfield = Number.parseInt(document.getElementById("author-list").getAttribute("data-auths")) - 1;
    //If it hasn't been filled yet, don't add a new row.
    if(!document.getElementById("last-name" + finalfield).value)
    {
        alert("The authors must have at least a last name before you can add another!");
        return;
    }

    //Append the first, middle, and last name inputs:
    var fname = document.createElement("input");
    fname.type = "text";
    fname.id = "f-initial" + document.getElementById("author-list").getAttribute("data-auths");
    document.getElementById("author-list").appendChild(fname);
    document.getElementById(fname.id).style.margin = "4px 15px 4px 0";
    document.getElementById(fname.id).style.left = document.getElementById("lfi").getBoundingClientRect().left + "px";

    var mname = document.createElement("input");
    mname.type = "text";
    mname.id = "m-initial" + document.getElementById("author-list").getAttribute("data-auths");
    document.getElementById("author-list").appendChild(mname);
    document.getElementById(mname.id).style.margin = "4px 15px 4px 0";
    document.getElementById(mname.id).style.left = document.getElementById("lmi").getBoundingClientRect().left + "px";

    var lname = document.createElement("input");
    lname.type = "text";
    lname.id = "last-name" + document.getElementById("author-list").getAttribute("data-auths");
    document.getElementById("author-list").appendChild(lname);
    document.getElementById(lname.id).style.margin = "4px 15px 4px 0";
    document.getElementById(lname.id).style.left = document.getElementById("lfi").getBoundingClientRect().left + "px";

    //Increment the data-auths value so we can keep track of the number of authors given:
    document.getElementById("author-list").setAttribute("data-auths", (Number.parseInt(document.getElementById("author-list").getAttribute("data-auths")) + 1).toString());
    document.getElementById("author-list").appendChild(document.createElement("br"));
}

function checkFooter()
{
    document.querySelector("footer").innerHTML = "Copyright © 2019 - " + new Date().getFullYear() + " Austin Jacob";
}