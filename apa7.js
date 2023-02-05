/*
Create an APA7 citation for a book.
*/
function bookAPA() //TODO: Redo this!
{
    /*
    TODO: When you come back to this, you really need to DRY this out by moving out the
          code to pull fields into individual functions, as some will be reused by some
          of the other citation types or styles (APA and MLA can both require authors).
          Book, video, and website citations will all require authors, dates, etc. too.
    */
    var citation = "";

    // AUTHORS ------------------------------------------------------------------------
    //If no name is given, skip it. It must have a last name at the very least.
    if(document.getElementById("last-name0").value)
    {
        var authnum = Number.parseInt(document.getElementById("author-list").getAttribute("data-auths"));
        var index = 0; //Start with the first listed author's name, then go down the list

        //Figure out the final last name field that's been filled in (important for adding the "&" for the last author):
        var lastind = ""; //None of the last name boxes might even be set.
        if(authnum > 1 && document.getElementById("last-name0").value)
        {
            var i = 0;
            lastind = 0; //The top-most last name box might be the only one filled in.
            while(i < authnum)
            {
                //If this last name field is filled, set lastind to the index of this last name field.
                if(document.getElementById("last-name" + i).value)
                {
                    lastind = i;
                }
                i += 1;
            }
        }

        do {
            //If we have more than 20 authors, and we've already printed out 19 of them...
            //Remember to use \t to insert tabs into multiline citations.
            if(authnum > 20 && (authnum - index) === 19)
            {
                //Then just print ellipses and then the last author.
                citation += " ... ";
                break;
            }
            if(index > 0 && document.getElementById("last-name" + index).value)
            {
                citation += ", ";
                //For the final name, add "&" (unless we have >20 names)
                if(lastind && index == lastind && lastind > 0)
                {
                    citation += "& ";
                }
            }
            if(document.getElementById("last-name" + index).value)
            {
                citation += document.getElementById("last-name" + index).value.toString().substring(0, 1).toUpperCase() + document.getElementById("last-name" + index).value.toString().substring(1).toLowerCase();
                if(document.getElementById("f-initial" + index).value)
                {
                    citation += ", " + document.getElementById("f-initial" + index).value.toString().substring(0, 1).toUpperCase() + ".";
                    //Don't bother with middle initials if the first name wasn't set:
                    if(document.getElementById("m-initial" + index).value)
                    {
                        citation += document.getElementById("m-initial" + index).value.toString().substring(0, 1).toUpperCase() + ".";
                    }
                }
            }
            index += 1;
        }
        while(index < authnum);

        index -= 1;
        //If there was an initial, we shouldn't have an extra "."
        if((document.getElementById("f-initial" + index).value && document.getElementById("m-initial" + index).value) || document.getElementById("f-initial" + index).value)
        {
            citation += " (";//End of the name and start of the date published text.
        }
        else
        {
            citation += ". (";
        }
    }
    // DATE ---------------------------------------------------------------------------
    //If no name was given, start with the year in parentheses:
    else
    {
        citation += "(";
    }
    //The rest of the year published text:
    if(document.getElementById("date-pub").value && Number.isInteger(Number.parseInt(document.getElementById("date-pub").value)))
    {
        citation += document.getElementById("date-pub").value.toString() + "). ";
    }
    else
    {
        citation += "n.d.). "
    }
    // TITLE --------------------------------------------------------------------------
    //The title of the book (must be italicized text):
    if(document.getElementById("source-title").value)
    {
        citation += document.getElementById("source-title").value.toString().italics();
        // EDITION --------------------------------------------------------------------
        //Optional edition parameter:
        if(document.getElementById("edition").value && Number.isInteger(Number.parseInt(document.getElementById("edition").value)) && Number.parseInt(document.getElementById("edition").value) > 0)
        {
            citation += " (" + document.getElementById("edition").value.toString();
            //"1st", "2nd", "3rd", and "-th" for anything else:
            switch(Number.parseInt(document.getElementById("edition").value))
            {
                case 1:
                    citation += "st ed.). ";
                    break;
                case 2:
                    citation += "nd ed.). ";
                    break;
                case 3:
                    citation += "rd ed.). ";
                    break;
                default:
                    citation += "th ed.). ";
                    break;
            }
        }
        else
        {
            citation += ". ";
        }
    }
    // PUBLISHER ----------------------------------------------------------------------
    //Publisher city
    if(document.getElementById("pub-city").value)
    {
        citation += document.getElementById("pub-city").value.toString();
        //If country or state was given, add it (it should be given, but you can never trust the end-users or testers...)
        if(document.getElementById("pub-loc").value)
        {
            citation += ", " + document.getElementById("pub-loc").value.toString();
        }
    }
    //If ONLY the state or country was given (It will NOT check if you used proper postal abbreviations for states!)
    else if(document.getElementById("pub-loc").value)
    {
        citation += document.getElementById("pub-loc").value.toString();
    }
    //The publisher should have been given, but once again, trust nobody...
    if(document.getElementById("pub-name").value)
    {
        //Only put the ": " if any location was given
        if(document.getElementById("pub-city").value || document.getElementById("pub-loc").value)
        {
            citation += ": ";
        }
        citation += document.getElementById("pub-name").value.toString() + ". ";
    }
    // DOI ----------------------------------------------------------------------------
    /*
    // URL --------------------------------------------------------------------------
    //===== THIS MAY ONLY BE USED IN WEB CITATIONS, NOT BOOK CITATIONS! =====
    //If a URL was given:
    if(document.getElementById("source-url").value)
    {
        citation += "Retrieved from " + document.getElementById("source-url").value.toString();
    }
    //=======================================================================
    */

    //Replace the "None" text:
    document.getElementById("citation").innerHTML = citation;
    //And make sure it's black text:
    document.getElementById("citation").style.color = "#111";

    //Allow the user to copy the text using the "copy" button:
    document.querySelector("#copy-button").removeAttribute("disabled");
}

function webAPA()
{
    const citation = document.querySelector("#citation-output");

    const author0  = document.querySelector("#input-last-0").value;
    const title    = document.querySelector("#input-title").value;
    const year     = document.querySelector("#input-year").value;
    const month    = document.querySelector("#input-month").value;
    const day      = document.querySelector("#input-day").value;
    const site     = document.querySelector("#input-site").value;
    const change   = document.querySelector("#input-change").checked;
    const url      = document.querySelector("#input-url").value;

    let authorList = "";
    let citeStr    = "";

    //TODO: You might be back at the point now where you can try this again. So, make sure that all
    //      Last name fields have something in them before you try to cite anything!
    
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
        if(!author0) break; //Skip making the author list if there aren't any authors

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

    //Formatting date:
    //Input type="date" fails hard here, as any missing info (day, month, or year),
    //causes the input to return a null value. The input had to be switched out
    //with 3 custom inputs. We require a year, or else we return "n.d." (not dated).
    //If given the day, but not month, only keep the year.
    let date = "";
    if(!year) date = "n.d."; //All subsequent cases imply year is truthy
    else if(!day && month) date += `${year}, ${month}`;
    else if(day && month) date += `${year}, ${month} ${day}`;
    else date += `${year}`; //Else if (day && !month) or (!day && !month)

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
    const year     = document.querySelector("#input-year").value;
    const month    = document.querySelector("#input-month").value;
    const day      = document.querySelector("#input-day").value;
    const site     = document.querySelector("#input-site").value;
    const url      = document.querySelector("#input-url").value;

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

    //Formatting date:
    //Input type="date" fails hard here, as any missing info (day, month, or year),
    //causes the input to return a null value. The input had to be switched out
    //with 3 custom inputs. We require a year, or else we return "n.d." (not dated).
    //If given the day, but not month, only keep the year.
    let date = "";
    if(!year) date = "n.d."; //All subsequent cases imply year is truthy
    else if(!day && month) date += `${year}, ${month}`;
    else if(day && month) date += `${year}, ${month} ${day}`;
    else date += `${year}`; //Else if (day && !month) or (!day && !month)
    
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