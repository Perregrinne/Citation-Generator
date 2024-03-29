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
    document.body.dataset.authors = 0;
    checkFields();
    //TODO: Maybe store all the field data and hide it so that switching back to
    //a previously started tab doesn't force you to reinput all fields again.
}

function updateFormat()
{
    document.body.dataset.format = document.querySelector('input[name="format"]:checked').value;
    document.body.dataset.authors = 0;
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
        <div class="input-group">
            <span class="input-group-text">Author</span>
            <div class="form-floating">
                <input type="text" class="form-control" id="input-first-0">
                <label for="input-first-0" class="my-1 text-nowrap">First Name</label>
            </div>
            <div class="form-floating">
                <input type="text" class="form-control" id="input-middle-0">
                <label for="input-middle-0" class="my-1 text-nowrap">Middle Name</label>
            </div>
            <div class="form-floating">
                <input type="text" class="form-control" id="input-last-0">
                <label for="input-last-0" class="my-1 text-nowrap">Last Name</label>
            </div>
        </div>
    </div>
    <div class="row g-3">
        <div class="col md-12">
            <button class="btn btn-primary" onclick="addAuthor()">+Author</button>
        </div>
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
        <div class="col md-4">
            <label for="input-year" class="my-1 text-nowrap">Year Published</label>
            <input type="number" class="form-control" id="input-year">
        </div>
        <div class="col md-4"></div>
    </div>
    <div class="row g-3 my-1">
        <div class="col md-4">
            <label for="input-doi" class="my-1 text-nowrap">DOI <i class="bi-question-circle link-secondary" id="doi-info" title=""></i></label>
            <input type="text" class="form-control" id="input-doi" placeholder="DOI: ...  OR  https://doi.org/...">
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
        <div class="input-group">
            <span class="input-group-text">Author</span>
            <div class="form-floating">
                <input type="text" class="form-control" id="input-first-0">
                <label for="input-first-0" class="my-1 text-nowrap">First Name</label>
            </div>
            <div class="form-floating">
                <input type="text" class="form-control" id="input-middle-0">
                <label for="input-middle-0" class="my-1 text-nowrap">Middle Name</label>
            </div>
            <div class="form-floating">
                <input type="text" class="form-control" id="input-last-0">
                <label for="input-last-0" class="my-1 text-nowrap">Last Name</label>
            </div>
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
        <div class="col md-4">
            <div class="form-check">
                <label for="input-change" class="my-1 form-check-label">The webpage is unlikely to change.</label>
                <input type="checkbox" class="form-check-input" id="input-change" checked>
            </div>
        </div>
    </div>
    <div class="row g-3 my-1">
        <div class="col md-4">
            <label for="input-site" class="my-1">Site Name</label>
            <input type="text" class="form-control" id="input-site" placeholder="">
        </div>
        <div class="col md-4">
            <label for="input-url" class="my-1">URL</label>
            <input type="text" class="form-control" id="input-url" placeholder="">
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
        fields.innerHTML = `<div class="row g-3 my-1" id="author-0">
        <div class="input-group">
            <span class="input-group-text">Author</span>
            <div class="form-floating">
                <input type="text" class="form-control" id="input-first-0">
                <label for="input-first-0" class="my-1 text-nowrap">First Name</label>
            </div>
            <div class="form-floating">
                <input type="text" class="form-control" id="input-middle-0">
                <label for="input-middle-0" class="my-1 text-nowrap">Middle Name</label>
            </div>
            <div class="form-floating">
                <input type="text" class="form-control" id="input-last-0">
                <label for="input-last-0" class="my-1 text-nowrap">Last Name</label>
            </div>
        </div>
    </div>
    <div class="row g-3">
        <div class="col md-12">
            <button class="btn btn-primary" onclick="addAuthor()">+Author</button>
        </div>
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
            <label for="input-publisher" class="my-1">Publisher</label>
            <input type="text" class="form-control" id="input-publisher">
        </div>
        <div class="col md-4">
            <label for="input-year" class="my-1 text-nowrap">Year Published</label>
            <input type="number" class="form-control" id="input-year">
        </div>
        <div class="col md-4"></div>
    </div>
    <div class="row g-3 my-1">
        <div class="col md-4">
            <label for="input-database" class="my-1 text-nowrap">Database</label>
            <input type="text" class="form-control" id="input-database">
        </div>
        <div class="col md-4"></div>
        <div class="col md-4"></div>
    </div>
    <div class="row g-3 my-1">
        <div class="col md-4">
            <label for="input-doi" class="my-1 text-nowrap">DOI <i class="bi-question-circle link-secondary" id="doi-info" title=""></i></label>
            <input type="text" class="form-control" id="input-doi" placeholder="DOI: ...  OR  https://doi.org/...">
        </div>
        <div class="col md-4">
            <label for="input-url" class="my-1 text-nowrap">URL (If Found Online) <i class="bi-question-circle link-secondary" id="url-info" title=""></i></label>
            <input type="text" class="form-control" id="input-url">
        </div>
        <div class="col md-4"></div>
    </div>`;
    }
    else if(medium == "web" && format === "mla")
    {
        fields.innerHTML = `<div class="row g-3 my-1" id="author-0">
        <div class="input-group">
            <span class="input-group-text">Author</span>
            <div class="form-floating">
                <input type="text" class="form-control" id="input-first-0">
                <label for="input-first-0" class="my-1 text-nowrap">First Name</label>
            </div>
            <div class="form-floating">
                <input type="text" class="form-control" id="input-middle-0">
                <label for="input-middle-0" class="my-1 text-nowrap">Middle Name</label>
            </div>
            <div class="form-floating">
                <input type="text" class="form-control" id="input-last-0">
                <label for="input-last-0" class="my-1 text-nowrap">Last Name</label>
            </div>
        </div>
    </div>
    <div class="row g-3">
        <div class="col md-12">
            <button class="btn btn-primary" onclick="addAuthor()">+Author</button>
        </div>
    </div>
    <div class="row g-3 my-1">
        <div class="col md-4">
            <label for="input-title" class="my-1">Article Title</label>
            <input type="text" class="form-control" id="input-title">
        </div>
        <div class="col md-4">
            <label for="input-site" class="my-1">Site Name</label>
            <input type="text" class="form-control" id="input-site" placeholder="">
        </div>
        <div class="col md-4">
        </div>
    </div>
    <div class="row g-3 my-1">
        <div class="col md-4">
            <label for="input-year" class="my-1">Date Published <i class="bi-question-circle link-secondary" id="web-date-info" title=""></i></label>
            <div class="input-group">
                <input type="number" class="form-control" id="input-year" placeholder="Year">
                <select class="form-control" id="input-month" placeholder="Month">
                    <option value="">- Month -</option>
                    <option value="Jan.">January</option>
                    <option value="Feb.">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="Aug.">August</option>
                    <option value="Sept.">September</option>
                    <option value="Oct.">October</option>
                    <option value="Nov.">November</option>
                    <option value="Dec.">December</option>
                </select>
                <input type="number" class="form-control" id="input-day" min="1" max="31" placeholder="Day">
            </div>
        </div>
        <div class="col md-4">
        <label for="input-access-year" class="my-1">Date Accessed <i class="bi-question-circle link-secondary" id="web-access-info" title=""></i></label>
        <div class="input-group">
            <input type="number" class="form-control" id="input-access-year" placeholder="Year">
            <select class="form-control" id="input-access-month" placeholder="Month">
                <option value="">- Month -</option>
                <option value="Jan.">January</option>
                <option value="Feb.">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="Aug.">August</option>
                <option value="Sept.">September</option>
                <option value="Oct.">October</option>
                <option value="Nov.">November</option>
                <option value="Dec.">December</option>
            </select>
            <input type="number" class="form-control" id="input-access-day" min="1" max="31" placeholder="Day">
        </div>
        <div class="col md-4">
            <div class="form-check">
                <label for="input-today" class="my-1 form-check-label">Use today's date.</label>
                <input type="checkbox" class="form-check-input" id="input-today" checked>
            </div>
        </div>
    </div>
    <div class="row g-3 my-1">
        <div class="col md-4">
            <label for="input-publisher" class="my-1">Website Publisher</label>
            <input type="text" class="form-control" id="input-publisher">
        </div>
        <div class="col md-4">
            <label for="input-url" class="my-1">URL</label>
            <input type="text" class="form-control" id="input-url" placeholder="http://www...">
        </div>
        <div class="col md-4"></div>
    </div>`;
    }
    else if(medium == "video" && format === "mla")
    {
        fields.innerHTML = `<div class="row g-3 my-1" id="author-0">
        <div class="input-group">
            <span class="input-group-text">Author</span>
            <div class="form-floating">
                <input type="text" class="form-control" id="input-first-0">
                <label for="input-first-0" class="my-1 text-nowrap">First Name</label>
            </div>
            <div class="form-floating">
                <input type="text" class="form-control" id="input-middle-0">
                <label for="input-middle-0" class="my-1 text-nowrap">Middle Name</label>
            </div>
            <div class="form-floating">
                <input type="text" class="form-control" id="input-last-0">
                <label for="input-last-0" class="my-1 text-nowrap">Last Name</label>
            </div>
        </div>
    </div>
    <div class="row g-3">
        <div class="col md-12">
            <button class="btn btn-primary" onclick="addAuthor()">+Author</button>
        </div>
    </div>
    <div class="row g-3 my-1">
        <div class="col md-4">
        <label for="input-channel" class="my-1">Channel Name</label>
        <input type="text" class="form-control" id="input-channel">
        </div>
        <div class="col md-4">
            <label for="input-title" class="my-1">Title</label>
            <input type="text" class="form-control" id="input-title">
        </div>
        <div class="col md-4">
        </div>
    </div>
    <div class="row g-3 my-1">
        <div class="col md-4">
            <label for="input-year" class="my-1">Date Published <i class="bi-question-circle link-secondary" id="video-date-info" title=""></i></label>
            <div class="input-group">
                <input type="number" class="form-control" id="input-year" placeholder="Year">
                <select class="form-control" id="input-month" placeholder="Month">
                    <option value="">- Month -</option>
                    <option value="Jan.">January</option>
                    <option value="Feb.">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="Aug.">August</option>
                    <option value="Sept.">September</option>
                    <option value="Oct.">October</option>
                    <option value="Nov.">November</option>
                    <option value="Dec.">December</option>
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
    checkTooltips();
}

function checkFooter()
{
    document.querySelector("footer").innerHTML = "Copyright © 2019 - " + new Date().getFullYear() + " Austin Jacob";
}

//Toggle dark/light theme on the page:
function toggleTheme()
{
    const color = document.body.style;
    color.backgroundColor = (color.backgroundColor === "rgb(241, 241, 241)") ? "rgb(26, 26, 26)" : "rgb(241, 241, 241)";
    checkThemeIcon();
}

//Add a new row for author's name (but only if all last name fields have been filled).
function addAuthor()
{
    //Note: APA 7 supports up to 20 authors and MLA 9 supports 2.
    const format = document.body.dataset.format;

    const authorNum = parseInt(document.body.dataset.authors);
    for(let i = 0; i <= authorNum; i++)
    {
        if(!document.querySelector("#input-last-" + authorNum).value)
        {
            alert("All authors must have at least a last name before you can add another!");
            return;
        }
    }

    //APA 7 supports <= 20 authors. Any more, and we list the first 19, followed by ellipses,
    //then the last. Thus, it's pointless to allow more than 21 rows.
    if(authorNum >= 20 && format === "apa") //Remember: author list starts at "0", so "20" is the 21st author row.
    {
        alert("APA 7 only displays up to 20 names, so don't bother listing any more of them.");
        return;
    }
    else if(authorNum >= 2 && format === "mla")
    {
        alert("MLA 9 only displays up to 2 names, so don't bother listing more than you have.");
        return;
    }

    const authorHTML = `<div class="row g-3 my-1" id="author-${authorNum + 1}">
        <div class="input-group">
            <button class="btn btn-outline-danger" id="remove-${authorNum + 1}" type="button" onclick="removeAuthor(${authorNum + 1})" title="Remove author">&nbsp;&nbsp;&nbsp;&nbsp;<i class="bi-trash3 text-danger"></i>&nbsp;&nbsp;&nbsp;&nbsp;</button>
            <div class="form-floating">
                <input type="text" class="form-control" id="input-first-${authorNum + 1}">
                <label for="input-first-${authorNum + 1}" class="my-1 text-nowrap">First Name</label>
            </div>
            <div class="form-floating">
                <input type="text" class="form-control" id="input-middle-${authorNum + 1}">
                <label for="input-middle-${authorNum + 1}" class="my-1 text-nowrap">Middle Name</label>
            </div>
            <div class="form-floating">
                <input type="text" class="form-control" id="input-last-${authorNum + 1}">
                <label for="input-last-${authorNum + 1}" class="my-1 text-nowrap">Last Name</label>
            </div>
        </div>
    </div>
        `;
    

    document.querySelector("#author-" + authorNum).insertAdjacentHTML("afterend", authorHTML);
    document.body.dataset.authors = authorNum + 1;
}

//Remove Author:
//Triggered by clicking the trash can next to any author row after the first one,
//this function takes in the number of the row and deletes it. It updates the
//number of authors and updates each following row's ID.
function removeAuthor(authNum)
{
    document.querySelector("#author-" + authNum).remove();
    //Now, we have to update the IDs of all rows that come after this one
    //Also update removeAuthor() buttons and label-for
    const dataAuthors = document.body.dataset.authors;
    for(let i = authNum; i <= dataAuthors; i++)
    {
        if(!document.body.querySelector("#author-" + (i + 1))) continue;

        const next = i + 1;
        document.body.querySelector("#author-" + next).id = "author-" + i;
        document.body.querySelector("#remove-" + next).setAttribute("onclick", "removeAuthor(" + i + ")");
        document.body.querySelector("#remove-" + next).id = "remove-" + i;
        document.body.querySelector("#input-first-" + next).id = "input-first-" + i;
        document.body.querySelector("#input-middle-" + next).id = "input-middle-" + i;
        document.body.querySelector("#input-last-" + next).id = "input-last-" + i;
        document.querySelector(`label[for="input-first-${next}"]`).htmlFor = "input-first-" + i;
        document.querySelector(`label[for="input-middle-${next}"]`).htmlFor = "input-middle-" + i;
        document.querySelector(`label[for="input-last-${next}"]`).htmlFor = "input-last-" + i;
    }
    document.body.dataset.authors--;
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
    container.innerHTML = document.querySelector("#citation-output").innerHTML;
    
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