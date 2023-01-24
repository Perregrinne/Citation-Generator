//I started having multiple things to update on page load,
//so I like the idea of being able to add things here.
function checkPage()
{
    checkFields(); //Run before checkTooltips or you'll get errors.
    checkThemeIcon();
    checkTooltips();
    checkFooter();
}

function updateMedia()
{
    document.body.dataset.medium = document.querySelector('input[name="medium"]:checked').value;
    checkFields();
}

function updateFormat()
{
    document.body.dataset.format = document.querySelector('input[name="format"]:checked').value;
    checkFields();
}

//Books have tooltips for APA DOI and URLs, and videos have a tooltip for date published.
//Whenever the list of input fields changes, we update the title attributes using Javascript.
//The titles could already be set in the HTML, but I dread how that'd make the HTML look.
//I had to switch from template literals because of how bad it made the JS or tooltip look.
function checkTooltips()
{
    if(document.querySelector("#doi-info"))
    {
        //APA book DOI tooltip:
        document.querySelector("#doi-info").title =
            "DOI stands for \"Document Object Identifier.\"                      \n" +
            "                                                                    \n" + 
            "They are used to identify an article and link it to the web.        \n" +
            "You might typically see them in one of two forms:                   \n" +
            "                                                                    \n" +
            "doi:10.0000/0000000000                                              \n" +
            "                                                                    \n" + 
            "- or -                                                              \n" +
            "                                                                    \n" +
            "https://dx.doi.org/10.0000/0000000000                               \n" +
            "                                                                    \n" +
            "Please copy/paste the entire DOI as you find it: with \"doi:\" or   \n" +
            "\"https://dx.doi.org/\" at the start of it, followed by the numbers!\n" +
            "This app does not format the DOI in any special way, so make sure   \n" +
            "you copy and paste it into the text field exactly as it's given!      ";

        //APA book URL tooltip:
        document.querySelector("#url-info").title =
            "Don't bother with URL if you have the\n" +
            "DOI already!                         \n" +
            "                                     \n" +
            "Also, don't put a DOI URL in this field!";
    }
    else if(document.querySelector("#video-date-info"))
    {
        //APA video date published tooltip:
        document.querySelector("#video-date-info").title = 
            "If you are having trouble finding the date the video was published:       \n" +
            "                                                                          \n" +
            "If it's Youtube, open the video on youtube.com and expand the description \n" +
            "using the \"show more\" button.                                           \n" +
            "                                                                          \n" +
            "If it's Vimeo, open the video on vimeo.com and hover your mouse over where\n" +
            "it says how long ago the video was published. Or, click \"More\" next to it.";
    }
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

//At page load or when a radio button is changed, change what fields are shown:
function checkFields()
{
    const medium = document.body.dataset.medium;
    const format = document.body.dataset.format;
    const fields = document.querySelector("#swap");

    if(medium === "book" && format === "apa")
    {
        fields.innerHTML = `<div class="row g-3 my-1" id="author-0">
        <div class="col md-4">
            <label for="input-first-0" class="my-1 text-nowrap">First Name</label>
            <input type="text" class="form-control" id="input-first-0">
        </div>
        <div class="col md-4">
            <label for="input-middle-0" class="my-1 text-nowrap">Middle Name</label>
            <input type="text" class="form-control" id="input-middle-0">
        </div>
        <div class="col md-4">
            <label for="input-last-0" class="my-1 text-nowrap">Last Name</label>
            <input type="text" class="form-control" id="input-last-0">
        </div>
    </div>
    <div class="row g-3">
        <div class="col md-12">
            <button class="btn btn-primary" onclick="addAuthor()">+Author</button>
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
        fields.innerHTML = `<div class="row g-3 my-1" id="author-0">
        <div class="col md-4">
            <label for="input-first-0" class="my-1 text-nowrap">First Name</label>
            <input type="text" class="form-control" id="input-first-0">
        </div>
        <div class="col md-4">
            <label for="input-middle-0" class="my-1 text-nowrap">Middle Name</label>
            <input type="text" class="form-control" id="input-middle-0">
        </div>
        <div class="col md-4">
            <label for="input-last-0" class="my-1 text-nowrap">Last Name</label>
            <input type="text" class="form-control" id="input-last-0">
        </div>
    </div>
    <div class="row g-3">
        <div class="col md-12">
            <button class="btn btn-primary" onclick="addAuthor()">+Author</button>
        </div>
    </div>
    <div class="row g-3 my-1">
        <div class="col md-4">
            <label for="input-title" class="my-1">Page Title</label>
            <input type="text" class="form-control" id="input-title">
        </div>
        <div class="col md-4">
            <label for="input-year" class="my-1">Date Published <i class="bi-question-circle link-secondary" id="video-date-info" title=""></i></label>
            <div class="input-group">
                <input type="number" class="form-control" id="input-year" placeholder="Year">
                <select class="form-control" id="input-month" placeholder="Month">
                    <option value="">- Month -</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                </select>
                <input type="number" class="form-control" id="input-day" min="1" max="31" placeholder="Day">
            </div>
        </div>
        <div class="col md-4"></div>
    </div>
    <div class="row g-3 my-1">
        <div class="col md-4">
            <label for="input-site" class="my-1">Site Name</label>
            <input type="text" class="form-control" id="input-site" placeholder="Youtube, Vimeo, etc...">
        </div>
        <div class="col md-4">
            <label for="input-url" class="my-1">URL</label>
            <input type="text" class="form-control" id="input-url" placeholder="http://www...">
        </div>
        <div class="col md-4"></div>
    </div>`;
    }
    else if(medium == "video" && format === "apa")
    {
        fields.innerHTML = `<div class="row g-3 my-1">
        <div class="col md-4">
            <label for="input-channel" class="my-1">Channel Name</label>
            <input type="text" class="form-control" id="input-channel">
        </div>
        <div class="col md-4">
            <label for="input-title" class="my-1">Title</label>
            <input type="text" class="form-control" id="input-title"></div>
        <div class="col md-4"></div>
    </div>
    <div class="row g-3 my-1">
        <div class="col md-4">
            <label for="input-year" class="my-1">Date Published <i class="bi-question-circle link-secondary" id="video-date-info" title=""></i></label>
            <div class="input-group">
                <input type="number" class="form-control" id="input-year" placeholder="Year">
                <select class="form-control" id="input-month" placeholder="Month">
                    <option value="">- Month -</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                </select>
                <input type="number" class="form-control" id="input-day" min="1" max="31" placeholder="Day">
            </div>
        </div>
        <div class="col md-4"></div>
        <div class="col md-4"></div>
    </div>
    <div class="row g-3 my-1">
        <div class="col md-4">
            <label for="input-site" class="my-1">Site Name</label>
            <input type="text" class="form-control" id="input-site" placeholder="Youtube, Vimeo, etc...">
        </div>
        <div class="col md-4">
            <label for="input-url" class="my-1">Video URL</label>
            <input type="text" class="form-control" id="input-url" placeholder="http://www...">
        </div>
        <div class="col md-4"></div>
    </div>`;
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
    checkTooltips();
}

//Toggle dark/light theme on the page:
function toggleTheme()
{
    const color = document.body.style;
    color.backgroundColor = (color.backgroundColor === "rgb(241, 241, 241)") ? "rgb(26, 26, 26)" : "rgb(241, 241, 241)";
    checkThemeIcon();
}

//Add a new row for author's name (but only if the previous last name field was given).
//TODO Note: APA 7 allows only 20 authors. Include 19, ellipses, then final author.
//If more than 20 are given, truncate all names after 19 but keep the last.
function addAuthor()
{
    const authorNum = parseInt(document.body.dataset.authors);
    //We check if the previous row has something in the "last name" input, but we
    //don't check all previous fields, so when compiling the list of authors, we
    //have to skip any rows where the "last name" field is empty.
    if(!document.querySelector("#input-last-" + authorNum).value)
    {
        alert("The authors must have at least a last name before you can add another!");
        return;
    }
    //APA 7 supports <= 20 authors. Any more, and we list the first 19, followed by ellipses,
    //then the last. Thus, it's pointless to allow more than 21 rows.
    if(authorNum >= 20) //Remember: author list starts at "0", so "20" is the 21st author row.
    {
        alert("APA 7 only supports up to 20 authors!");
        return;
    }

    const authorHTML = `<div class="row g-3 my-1" id="author-${authorNum + 1}">
    <div class="col md-4">
        <label for="input-first-${authorNum + 1}" class="my-1 text-nowrap">First Name</label>
        <input type="text" class="form-control" id="input-first-${authorNum + 1}">
    </div>
    <div class="col md-4">
        <label for="input-middle-${authorNum + 1}" class="my-1 text-nowrap">Middle Name</label>
        <input type="text" class="form-control" id="input-middle-${authorNum + 1}">
    </div>
    <div class="col md-4">
        <label for="input-last-${authorNum + 1}" class="my-1 text-nowrap">Last Name</label>
        <input type="text" class="form-control" id="input-last-${authorNum + 1}">
    </div>
</div>
`;

    document.querySelector("#author-" + authorNum).insertAdjacentHTML("afterend", authorHTML);
    document.body.dataset.authors = parseInt(document.body.dataset.authors) + 1;
    //TODO: Make sure you skip rows where last name is empty when generating citations!
}

//Generate:
//Check which format and medium, and run the corresponding function
//to generate the citation.
function generate()
{
    const medium = document.body.dataset.medium;
    const format = document.body.dataset.format;

    if(format === "apa")
    {
        if(medium === "book") { bookAPA(); }
        else if(medium === "web") { webAPA(); }
        else { videoAPA(); }
    }
    else //if format === "mla"
    {
        if(medium === "book") { bookMLA(); }
        else if(medium === "web") { webMLA(); }
        else { videoMLA(); }
    }
}