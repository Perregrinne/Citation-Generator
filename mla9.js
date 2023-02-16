//Get MLA Author List:
//This function returns a string that contains one or two authors in MLA format.
//If there are more than two authors, we only list one, and add " et al." Unlike
//APA, MLA expects entire first names. An initial can be used for a middle name.
function getMLAAuthorList()
{
    let authorList = "";

    const authNum = parseInt(document.body.dataset.authors);
    const author0 = document.querySelector("#input-last-0").value;

    if(authNum === 0 && author0)
    {
        const first  = document.querySelector("#input-first-0").value;
        const middle = document.querySelector("#input-middle-0").value;

        authorList = author0;
        if(first) authorList += `, ${first}`;
        if(first && middle) authorList += " " + middle.substring(0, 1).toUpperCase();
        authorList += ". ";
    }
    else if(authNum === 1 && author0)
    {
        const first0  = document.querySelector("#input-first-0").value;
        const middle0 = document.querySelector("#input-middle-0").value;
        const first1  = document.querySelector("#input-first-1").value;
        const middle1 = document.querySelector("#input-middle-1").value;
        const last1   = document.querySelector("#input-last-1").value;
        
        if(!last1)
        {
            alert("Not all authors have been properly named! They all need at least a last name!");
            return;
        }

        authorList = author0;
        if(first0) authorList += `, ${first0}`;
        if(first0 && middle0) authorList += ` ${middle0.substring(0, 1).toUpperCase()}.`;
        authorList += `, and ${last1}`;
        if(first1) authorList += `, ${first1}`;
        if(first1 && middle1) authorList += " " + middle1.substring(0, 1).toUpperCase();
        authorList += ". ";
    }
    else if(authNum === 2 && author0)
    {
        if(!document.querySelector("#input-last-1").value || !document.querySelector("#input-last-2").value)
        {
            alert("Not all authors have been properly named! They all need at least a last name!");
            return;
        }
        const first  = document.querySelector("#input-first-0").value;
        const middle = document.querySelector("#input-middle-0").value;

        authorList = author0;
        if(first && middle) authorList += `, ${first} ${middle.substring(0, 1).toUpperCase()}.`;
        else if(first) authorList += `, ${first}.`;
        authorList += ", et al. ";
    }
    //An "implied else" is that authorList stays empty, if author0 is empty. In that case, we skip authors in the citation.
    return authorList;
}

function getMLADate()
{
    const year  = document.querySelector("#input-year").value;
    const month = document.querySelector("#input-month").value;
    const day   = document.querySelector("#input-day").value;

    let date = "";
    //We require at least a year, but if the day was given too, we also require a month (or we ignore the day)
    if(!year) return ""; //If no date (at least the year) is provided, skip the date in the citation.
    else if(!day && month) date += `${month} ${year}, `; 
    else if(day && month) date += `${day} ${month} ${year}, `;
    else date += `${year}, `; //Else if (day && !month) or (!day && !month)

    return date;
}

function getDateAccessed()
{
    const day   = document.querySelector("#input-access-day").value;
    const month = document.querySelector("#input-access-month").value;
    const year  = document.querySelector("#input-access-year").value;
    const today = document.querySelector("#input-today").checked;

    const date  = new Date();
    const months = [
        "Jan.",
        "Feb.",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug.",
        "Sept.",
        "Oct.",
        "Nov.",
        "Dec."
    ];

    if(!today && (!day || !month || !year)) return "";
    else if(today) return ` Accessed ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}.`;

    return ` Accessed ${day} ${month} ${year}.`;
}

function bookMLA()
{
    const citation  = document.querySelector("#citation-output");

    const author0   = document.querySelector("#input-last-0").value;
    let   publisher = document.querySelector("#input-publisher").value;
    const title     = document.querySelector("#input-title").value;
    const edition   = document.querySelector("#input-edition").value;
    let   database  = document.querySelector("#input-database").value; //TODO: Must italicize, if provided!
    let   year      = document.querySelector("#input-year").value;
    const doi       = document.querySelector("#input-doi").value;
    const url       = document.querySelector("#input-url").value;

    //Error checking:
    let error = "";
    error += (!author0)   ? "An author is required. "          : "";
    error += (!title)     ? "The title is required. "          : "";
    error += (!publisher) ? "The publisher is required. "      : "";
    error += (!year)      ? "The year published is required. " : "";
    error += (database && (!url || !doi)) ? "Databases require a URL or DOI. " : "";
    citation.innerHTML = error;
    if(error) return;

    const author = getMLAAuthorList();
    
    let   locate = ""; //We only keep the DOI -OR- the URL. It can be blank.
    if(doi)      locate = doi;
    else if(url) locate = url;
    //The URL or DOI is guaranteed to be the final piece, which we end with a period:
    if(locate)   locate += "."; //I hate that MLA has this period after URL or DOI.
    
    if(database)
    {
        database = "<i>" + database + "</i>";
        if(locate) database += ", "; //Determine if database is the last element or not.
        else       database += ".";  //The last listed piece is punctuated with a period.
    }

    //We determine if year is the last listed citation piece and end it accordingly.
    if(locate || database) year += ", ";
    else year += ".";

    //If the title ends in a period, we don't want to have two periods because we add our own later:
    if(title.charAt(title.length - 1) === ".") title = title.substring(0, title.length - 1);
    //If we don't have a title (like when citing a whole website), this won't affect anything anyways.

    //MLA edition sections are a bit different from APA edition sections
    let fullTitle = "<i>" + title + "</i>";
    if(edition && edition > 0)
    {
        //We can't simply say if edition is 1, then use 1st, because we say 21st, 31st, etc.
        //So, we need to check the last digit (and check for special cases like 11, 12, and 13)
        const ones = edition % 10;
        const tens = edition % 100; //For handling cases where edition is or ends in 11, 12, or 13
        if     (ones === 1 && tens !== 11) fullTitle += ". " + edition + "st ed.";
        else if(ones === 2 && tens !== 12) fullTitle += ". " + edition + "nd ed.";
        else if(ones === 3 && tens !== 13) fullTitle += ". " + edition + "rd ed.";
        else                               fullTitle += ". " + edition + "th ed.";
        //A comma will follow the period after the edition, but that's expected. It just looks weird.
    }

    //Citation building:
    let citationStr = `${author}${fullTitle}, ${publisher}, ${year}${database}${locate}`;

    citation.innerHTML = citationStr;
}

function webMLA()
{
    const citation  = document.querySelector("#citation-output");

    let   publisher = document.querySelector("#input-publisher").value;
    const title     = document.querySelector("#input-title").value;
    const site      = document.querySelector("#input-site").value;
    const url       = document.querySelector("#input-url").value;

    const author    = getMLAAuthorList();
    const date      = getMLADate();
    const accessed  = getDateAccessed();

    //If the title ends in a period, we don't want to have two periods because we add our own later:
    if(title.charAt(title.length - 1) === ".") title = title.substring(0, title.length - 1);
    //If we don't have a title (like when citing a whole website), this won't affect anything anyways.

    //Error checking:
    let error = "";
    error += (!site)      ? "The site is required. "      : "";
    error += (!publisher) ? "The publisher is required. " : "";
    error += (!url)       ? "The url is required."        : "";
    citation.innerHTML = error;
    if(error) return;
    
    //Citation building:
    let citationStr = "";
    if(title) citationStr = `${author}"${title}." <i>${site}</i>, ${publisher}, ${date}${url}.${accessed}`;
    else      citationStr = `${author} <i>${site}</i>, ${publisher}, ${date}${url}.${accessed}`;
    //Adding a period to the end of the URL is an abomination, and the Modern Language
    //Association should recognize that. It appears as if the period is part of the URL,
    //when in fact, it's not. For the sake of clarity, URLs should have NOTHING after them.

    citation.innerHTML = citationStr;
}

function videoMLA()
{
    const citation = document.querySelector("#citation-output");

    let   channel  = document.querySelector("#input-channel").value;
    const title    = document.querySelector("#input-title").value;
    const site     = document.querySelector("#input-site").value;
    const url      = document.querySelector("#input-url").value;

    const author   = getMLAAuthorList();
    const date     = getMLADate();

    if(channel) channel = `uploaded by ${channel}, `;
    
    //If the title ends in a period, we don't want to have two periods because we add our own later:
    if(title.charAt(title.length - 1) === ".") title = title.substring(0, title.length - 1);

    //Error checking:
    let error = "";
    error += (!url && !author) ? "An author or channel name is required. "          : "";
    error += (!title)          ? "A title is required. "                            : "";
    error += (!site)           ? "The site is required. "                           : "";
    error += (!url)            ? "The URL is needed, as this cites online videos. " : "";
    citation.innerHTML = error;
    if(error) return;
    
    //Citation building:
    const citationStr = `${author}"${title}." <i>${site}</i>, ${channel}${date}${url}`;
    //If we don't have any authors, ${author} is empty. If we do, it has the names, period, and space taken care of.

    citation.innerHTML = citationStr;
}