//Add a new row for author's name (but only if the previous last name field was given).
//TODO Note: APA 7 allows only 20 authors. Include 19, ellipses, then final author.
//If more than 20 are given, truncate all names after 19 but keep the last.
function addAuthor()
{
    //Find the final last name box and determine if it's been filled yet:
    const finalField = Number.parseInt(document.getElementById("author-list").getAttribute("data-auths")) - 1;
    //If it hasn't been filled yet, don't add a new row.
    if(!document.getElementById("last-name" + finalField).value)
    {
        alert("The authors must have at least a last name before you can add another!");
        return;
    }

    //Append the first, middle, and last name inputs:
    const firstName = document.createElement("input");
    firstName.type = "text";
    firstName.id = "f-initial" + document.getElementById("author-list").getAttribute("data-auths");
    document.getElementById("author-list").appendChild(firstName);
    document.getElementById(firstName.id).style.margin = "4px 15px 4px 0";
    document.getElementById(firstName.id).style.left = document.getElementById("label-f-initial").getBoundingClientRect().left + "px";

    const middleName = document.createElement("input");
    middleName.type = "text";
    middleName.id = "m-initial" + document.getElementById("author-list").getAttribute("data-auths");
    document.getElementById("author-list").appendChild(middleName);
    document.getElementById(middleName.id).style.margin = "4px 15px 4px 0";
    document.getElementById(middleName.id).style.left = document.getElementById("label-m-initial").getBoundingClientRect().left + "px";

    const lastName = document.createElement("input");
    lastName.type = "text";
    lastName.id = "last-name" + document.getElementById("author-list").getAttribute("data-auths");
    document.getElementById("author-list").appendChild(lastName);
    document.getElementById(lastName.id).style.margin = "4px 15px 4px 0";
    document.getElementById(lastName.id).style.left = document.getElementById("label-f-initial").getBoundingClientRect().left + "px";

    //Increment the data-auths value so we can keep track of the number of authors given:
    document.getElementById("author-list").setAttribute("data-auths", (Number.parseInt(document.getElementById("author-list").getAttribute("data-auths")) + 1).toString());
    document.getElementById("author-list").appendChild(document.createElement("br"));
}


/*
Create an APA7 citation for a book.
*/
function bookAPA()
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

function webAPA() {
    //TODO
}

function videoAPA() {
    //TODO
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