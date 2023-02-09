/*
Create an APA7 citation for a book.
*/
function bookAPA()
{
    const citation   = document.querySelector("#citation-output");

    const author0    = document.querySelector("#input-last-0").value;
    const title      = document.querySelector("#input-title").value;
    const edition    = parseInt(document.querySelector("#input-edition").value); //parseInt because we have math up ahead and cannot risk using strings.
    const desc       = document.querySelector("#input-desc").value;
    const year       = document.querySelector("#input-year").value;
    const publisher  = document.querySelector("#input-publisher").value;
    const doi        = document.querySelector("#input-doi").value;
    const url        = document.querySelector("#input-url").value;
 
    let citationStr  = "";

    //Error checking:
    let error = "";
    if(!publisher)      error += "APA 7 requires a publisher name. ";
    if(!title && !desc) error += "You must provide either a title or a description of the work. ";
    if(error)
    {
        citation.innerHTML = error;
        return;
    }

    const authorList = (author0) ? getAuthorList() : "";
    const date       = (year) ? year : "n.d.";

    //Yes, fullTitle can be a description instead of a title/edition, but we only keep ONE of the two (preferably title)
    let fullTitle = "";
    if(title)
    {
        fullTitle += "<i>" + title + "</i>"; //Titles must be italicized, but not edition numbers!
        if(edition && edition > 0)
        {
            //We can't simply say if edition is 1, then use 1st, because we say 21st, 31st, etc.
            //So, we need to check the last digit (and check for special cases like 11, 12, and 13)
            const ones = edition % 10;
            const tens = edition % 100; //For handling cases where edition is or ends in 11, 12, or 13
            if     (ones === 1 && tens !== 11) fullTitle += " (" + edition + "st ed.).";
            else if(ones === 2 && tens !== 12) fullTitle += " (" + edition + "nd ed.).";
            else if(ones === 3 && tens !== 13) fullTitle += " (" + edition + "rd ed.).";
            else                               fullTitle += " (" + edition + "th ed.).";
            //It should handle odd edge cases like where the edition number is 1,108,812!
        }
    }
    else fullTitle += "[" + desc + "]."; //Descriptions go within square brackets and are NOT italicized.

    let locate = "";
    //Prefer DOI over URL:
    if(doi)      locate = doi;
    else if(url) locate = url;

    //If we have 1 or more authors, authors go first. Otherwise, the title or description goes first:
    if(!authorList) citationStr = `${fullTitle} (${date}). ${publisher}. ${locate}`;
    else            citationStr = `${authorList}(${date}). ${fullTitle} ${publisher}. ${locate}`;

    citation.innerHTML = citationStr;
}

function webAPA()
{
    const citation   = document.querySelector("#citation-output");

    const author0    = document.querySelector("#input-last-0").value;
    const title      = document.querySelector("#input-title").value;
    const site       = document.querySelector("#input-site").value;
    const change     = document.querySelector("#input-change").checked;
    const url        = document.querySelector("#input-url").value;
    
    let citeStr      = "";

    const authorList = (author0) ? getAuthorList() : "";
    const date       = getDate();

    //If the content is not likely to change, we won't include a retrieval date:
    const dateObj = new Date();
    const monthString = ["January",   "February", "March",    "April", "May", "June", "July", "August",
                        "September", "October",  "November", "December"];
    const retrieval = (!change) ? `Retrieved ${monthString[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}, from ` : "";

    if(!author0) citeStr = `${site}. (${date}). <i>${title}</i>. ${site}. ${retrieval}${url}`;
    else citeStr = `${authorList}(${date}). <i>${title}</i>. ${site}. ${retrieval}${url}`;

    citation.innerHTML = citeStr;
}

function videoAPA() {
    const citation = document.querySelector("#citation-output");

    const channel  = document.querySelector("#input-channel").value || "Anonymous";
    const title    = document.querySelector("#input-title").value;
    const site     = document.querySelector("#input-site").value;
    const url      = document.querySelector("#input-url").value;

    const date = getDate();

    //Error checking:
    let error = "";
    if(!title || !site || !url)
    {
        error += (!title) ? "A title is required. " : "";
        error += (!site) ? "The site is required. " : "";
        error += (!url) ? "The URL is needed, as this cites online videos." : "";
        citation.innerHTML = error;
        return;
    }
    
    let citationStr = `${channel}. (${date}). <i>${title}</i> [Video]. ${site}. Retrieved from ${url}`;
    citation.innerHTML = citationStr;
}


/*
Guide:
(Source URL: https://apastyle.apa.org/style-grammar-guidelines/references/missing-information)
Nothing missing:
    Author. (Date). Title. Source.
No author:
    Title. (Date). Source.
No date:
    Author. (n.d.). Title. Source.
No title:
    Author. (date). [Description of work]. Source   //Use the square brackets!
No author/date:
    Title. (n.d.). Source
No author/title:
    [Description of work]. (date). Source.
No date/title:
    Author. (n.d.). [Description of work]. Source.
No author, date, title:
    [Description of work]. (n.d.). Source.
WE NEED A SOURCE (Publisher), AT A MINIMUM!
We now need a field for DOI (Digital Object Identifier)
*/