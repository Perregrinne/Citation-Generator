//Get APA Author List:
//This function is used by the web and book APA generators
//to read in all valid authors and return a string used by
//the citation function to output the authors.
function getAPAAuthorList()
{
    let authorList = "";

    //List the authors (skip this if there aren't any)
    //=========== Rules: ===========
    //If we only have a last name, and no first or middle, we have this: Doe, ...next author.
    //But if this is the last (or only) listed author, don't append a comma, append a period: Doe.
    //---
    //If we have all three names, last name is first, followed by first and middle initials: Doe, J. B. 
    //---
    //If we have a first name and last, the first name follows the last and is an initial: Doe, J.
    //---
    //If we have a middle and last name only, we only keep the last name: Doe.
    //---
    //Remember: we always require at least a last name.
    //---
    //Before the last author of multiple, use an ampersand: Doe, & Johns.
    //---
    //If we have OVER 20 authors, only list 20. Put an ellipses between the 19th and last authors: Doe, ...Johns.
    //When using ellipses, you DON'T also use an ampersand, as shown in the previous line.
    //==============================
    const authNum = parseInt(document.body.dataset.authors);
    for(let i = 0; i <= authNum; i++)
    {
        //We're not dealing with a dumb edge case where someone leaves an empty row and we ignore it.
        //It messes up the author counts and adds too much unnecessary complexity to this app. I already tried this.
        //If someone screws up, we just won't finish building the citation, plain and simple.
        let last = document.querySelector("#input-last-" + i).value;
        if(!last)
        {
            alert("You're missing an author in row number " + parseInt(authNum + 1) + "! You need at least a last name!");
            return;
        }
        else last = last.substring(0, 1).toUpperCase() + last.substring(1);

        //Skip authors twenty through n - 1 (skip to the last one).
        if(i > 18 && i < authNum && authNum >= 20) continue;
        //If we're at the last author of more than 20, we first need to use ellipses:
        if(i === authNum && authNum >= 20) authorList += " ..."; //No ampersand follows the ellipses!

        //If we're about to list the last author of less than 20, use an ampersand:
        if(i === authNum && i > 0 && authNum < 20) authorList += " & ";

        const first  = document.querySelector("#input-first-"  + i).value;
        const middle = document.querySelector("#input-middle-" + i).value;
        //and we already got the last name, above...

        if(first)
        {
            authorList += `${last}, ${first.substring(0, 1).toUpperCase()}.`;
            if(middle) authorList += ` ${middle.substring(0, 1).toUpperCase()}.`;
        }
        else authorList += `${last}`;

        if(i < authNum) authorList += ","; //We have more authors to list, so use a comma.

        //"If we just listed the last author and we've only listed their last name":
        if(i === authNum && !first) authorList += "."; //Then finalize the list with a period

        authorList += " "; //In every possible case, we always append a space, including just before moving on to the date:
    }

    return authorList;
}

function getAPADate()
{
    const year  = document.querySelector("#input-year").value;
    const month = document.querySelector("#input-month").value;
    const day   = document.querySelector("#input-day").value;

    let date = "";

    //Formatting date:
    //Input type="date" fails hard here, as any missing info (day, month, or year),
    //causes the input to return a null value. The input had to be switched out
    //with 3 custom inputs. We require a year, or else we return "n.d." (not dated).
    //If given the day, but not month, only keep the year.
    if(!year)              date = "n.d."; //All subsequent cases imply year is truthy
    else if(!day && month) date += `${year}, ${month}`;
    else if( day && month) date += `${year}, ${month} ${day}`;
    else                   date += `${year}`; //Else if (day && !month) or (!day && !month)

    return date;
}

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

    const authorList = (author0) ? getAPAAuthorList() : "";
    const date       = (year)    ? year               : "n.d.";

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

    const authorList = (author0) ? getAPAAuthorList() : "";
    const date       = getAPADate();

    //If the content is not likely to change, we won't include a retrieval date:
    const dateObj = new Date();
    const monthString = ["January",   "February", "March",    "April", "May", "June", "July", "August",
                        "September", "October",  "November", "December"];
    const retrieval = (!change) ? `Retrieved ${monthString[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}, from ` : "";

    //Citation ouput:
    if(!author0) citeStr = `${site}. (${date}). <i>${title}</i>. ${site}. ${retrieval}${url}`;
    else         citeStr = `${authorList}(${date}). <i>${title}</i>. ${site}. ${retrieval}${url}`;

    citation.innerHTML = citeStr;
}

function videoAPA() {
    const citation = document.querySelector("#citation-output");

    const channel  = document.querySelector("#input-channel").value || "Anonymous";
    const title    = document.querySelector("#input-title").value;
    const site     = document.querySelector("#input-site").value;
    const url      = document.querySelector("#input-url").value;

    const date = getAPADate();

    //Error checking:
    let error = "";
    if(!title || !site || !url)
    {
        error += (!title) ? "A title is required. "                           : "";
        error += (!site)  ? "The site is required. "                          : "";
        error += (!url)   ? "The URL is needed, as this cites online videos." : "";
        citation.innerHTML = error;
        return;
    }
    
    //Citation output:
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