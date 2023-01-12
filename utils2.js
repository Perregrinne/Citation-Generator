//Generate:
//Check which format and medium, and run the corresponding function
//to generate the citation.
function generate()
{
    const medium = document.body.dataset.medium;
    const format = document.body.dataset.format;

    if(format === "apa")
    {
        if(medium === "book")
        {
            apaBook();
        }
        else if(medium === "web")
        {
            apaWeb();
        }
        else //if medium === "video"
        {
            apaVideo();
        }
    }
    else //if format === "mla"
    {
        if(medium === "book")
        {
            apaBook();
        }
        else if(medium === "web")
        {
            apaWeb();
        }
        else //if medium === "video"
        {
            apaVideo();
        }
    }
}

//Add a new row for author's name (but only if the previous last name field was given).
//TODO Note: APA 7 allows only 20 authors. Include 19, ellipses, then final author.
//If more than 20 are given, truncate all names after 19 but keep the last.
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

//I started having multiple things to update on page load,
//so I like the idea of being able to add things here.
function checkPage() {
    checkFooter();
    checkDOIInfo();
}

function checkDOIInfo() {
    const doiInfo = document.querySelector("#doi-info");
    const title = `DOI stands for "Document Object Identifier."

They are used to identify an article and link it to the web.
You might typically see them in one of two forms:

doi:10.0000/0000000000

- or -

http://dx.doi.org/10.0000/0000000000

Please copy/paste the entire DOI as you find it: with "doi:" or
"http://dx.doi.org/" at the start of it, followed by the numbers!
This app does not format the DOI in any special way, so make sure
you copy and paste it into the text field exactly as it's given!`;
    doiInfo.setAttribute("title", title);
}