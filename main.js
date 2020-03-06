//Set the labels in the correct place:
function checkLabelPlacement()
{
    //First, get a list of all labels on the page
    var allLabels = Array.from(document.getElementsByTagName("label"));

    //Then change the left of each one to the input it is "for":
    allLabels.forEach(element => {
        element.style.left = document.getElementById(element.htmlFor).getBoundingClientRect().left + "px";
    });
}

//Add a new row for author's name (but only if the previous last name field was given):
function addAuthor()
{
    //Find the final last name box and determine if it's been filled yet:
    var finalfield = Number.parseInt(document.getElementById("author-list").getAttribute("data-auths").value);
    //If it hasn't been filled yet, don't add a new row.
    if(document.getElementById("last-name" + finalfield) === null)
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

function bookAPA()
{
    var citation = "";

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
            if(index > 0 && document.getElementById("last-name" + index).value)
            {
                citation += ", ";
                //For the final name, add "&"
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
    //The title of the book (must be italicized text):
    if(document.getElementById("source-title").value)
    {
        citation += document.getElementById("source-title").value.toString().italics();
        //Optional edition parameter:
        if(document.getElementById("edition").value && Number.isInteger(Number.parseInt(document.getElementById("edition").value)) && Number.parseInt(document.getElementById("edition").value) > 0)
        {
            citation += " (" + document.getElementById("edition").value.toString();
            //"st" for 1, "nd" for 2, "rd" for 3, and "th" for anything else:
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
    //If a URL was given:
    if(document.getElementById("source-url").value)
    {
        citation += "Retrieved from " + document.getElementById("source-url").value.toString();
    }

    //Replace the "None" text:
    document.getElementById("citation").innerHTML = citation;
    //And make sure it's black text:
    document.getElementById("citation").style.color = "#111";
    
    //alert(citation);
    
}