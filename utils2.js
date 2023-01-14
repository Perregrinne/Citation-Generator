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

function updateMedia()
{
    document.dataset.medium = document.querySelector('input[name="medium"]:checked').value;
    checkFields();
}

function updateFormat()
{
    document.dataset.format = document.querySelector('input[name="format"]:checked').value;
    checkFields();
}

//I started having multiple things to update on page load,
//so I like the idea of being able to add things here.
function checkPage() {
    checkFields(); //Run before checkDOIInfo and checkURLInfo or those fields won't exist
    checkThemeIcon();
    checkDOIInfo();
    checkURLInfo();
    checkFooter();
}

//By default, the theme toggle icon is the moon, but if users have "prefers-color-scheme"
//set to "dark", then we need to update the icon:
function checkThemeIcon()
{
    const color = document.body.style.backgroundColor;
    const icon  = document.querySelector("#theme-icon");
    
    if(color === "rgb(241, 241, 241)")
    {
        icon.classList.add("bi-moon-fill");
        icon.classList.remove("bi-sun-fill");
    }
    else
    {
        icon.classList.add("bi-sun-fill");
        icon.classList.remove("bi-moon-fill");
    }
}

function toggleTheme()
{
    const color = document.body.style;
    color.backgroundColor = (color.backgroundColor === "rgb(241, 241, 241)") ? "rgb(26, 26, 26)" : "rgb(241, 241, 241)";
    checkThemeIcon();
}

//Gives the DOI field a tooltip on hover:
function checkDOIInfo() {
    const doiInfo = document.querySelector("#doi-info");
    const title = `DOI stands for "Document Object Identifier."

They are used to identify an article and link it to the web.
You might typically see them in one of two forms:

doi:10.0000/0000000000

- or -

https://dx.doi.org/10.0000/0000000000

Please copy/paste the entire DOI as you find it: with "doi:" or
"https://dx.doi.org/" at the start of it, followed by the numbers!
This app does not format the DOI in any special way, so make sure
you copy and paste it into the text field exactly as it's given!`;
    doiInfo.setAttribute("title", title);
}

//Gives the URL field a tooltip on hover:
function checkURLInfo() {
    const urlInfo = document.querySelector("#url-info");
    const title = `Don't bother with URL if you have the
DOI already!

Also, don't put a DOI URL in this field!`;
    urlInfo.setAttribute("title", title);
}

function checkFields()
{
    const medium = document.body.dataset.medium;
    const format = document.body.dataset.format;
    const fields = document.querySelector("#swap");

    if(medium === "book" && format === "apa")
    {
        fields.innerHTML = `<div class="row g-3 my-1">
        <div class="col md-4">
            <label for="input-first" class="my-1 text-nowrap">First Name</label>
            <input type="text" class="form-control" id="input-first">
        </div>
        <div class="col md-4">
            <label for="input-middle" class="my-1 text-nowrap">Middle Name</label>
            <input type="text" class="form-control" id="input-middle">
        </div>
        <div class="col md-4">
            <label for="input-last" class="my-1 text-nowrap">Last Name</label>
            <input type="text" class="form-control" id="input-last">
        </div>
    </div>
    <div class="row g-3">
        <div class="col md-12">
            <button class="btn btn-primary">+Author</button>
        </div>
    </div>
    <div class="row g-3 my-1">
        <div class="col md-4">
            <label for="input-year" class="my-1 text-nowrap">Year Published</label>
            <input type="number" class="form-control" id="input-year">
        </div>
        <div class="col md-4"></div>
        <div class="col md-4"></div>
    </div>
    <div class="row g-3 my-1">
        <div class="col md-4">
            <label for="input-title" class="my-1">Title</label>
            <input type="text" class="form-control" id="input-title">
        </div>
        <div class="col md-4">
            <label for="input-edition" class="my-1 text-nowrap">Edition Number</label>
            <input type="number" class="form-control" id="input-edition" min="1">
        </div>
        <div class="col md-4"></div>
    </div>
    <div class="row g-3 my-1">
        <div class="col md-4">
            <label for="input-desc" class="my-1 text-nowrap">Description (If No Title)</label>
            <input type="text" class="form-control" id="input-desc">
        </div>
        <div class="col md-4"></div>
        <div class="col md-4"></div>
    </div>
    <div class="row g-3 my-1">
        <div class="col md-4">
            <label for="input-publisher" class="my-1">Publisher</label>
            <input type="text" class="form-control" id="input-publisher">
        </div>
        <div class="col md-4"></div>
        <div class="col md-4"></div>
    </div>
    <div class="row g-3 my-1">
        <div class="col md-4">
            <label for="input-doi" class="my-1 text-nowrap">DOI <i class="bi-question-circle link-secondary" id="doi-info" title=""></i></label>
            <input type="text" class="form-control" id="input-doi">
        </div>
        <div class="col md-4">
            <label for="input-url" class="my-1 text-nowrap">URL (If Found Online) <i class="bi-question-circle link-secondary" id="url-info" title=""></i></label>
            <input type="text" class="form-control" id="input-url">
        </div>
        <div class="col md-4"></div>
    </div>`;
    }
    else if(medium == "web" && format === "apa")
    {
        fields.innerHTML = "";
    }
    else if(medium == "video" && format === "apa")
    {
        fields.innerHTML = "";
    }
    if(medium === "book" && format === "mla")
    {
        fields.innerHTML = "";
    }
    else if(medium == "web" && format === "mla")
    {
        fields.innerHTML = "";
    }
    else if(medium == "video" && format === "mla")
    {
        fields.innerHTML = "";
    }
}