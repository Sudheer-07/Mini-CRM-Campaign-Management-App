function setCookies(name,value)
{
    var days = 7;
    if(value === '')
    {
        days = 0;
    }
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    var expires = "expires=" + date.toGMTString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/;SameSite=Strict;Secure=true;";
}
function getCookies(name)
{
    var returnFlag = '';
    var cookieArr = document.cookie.split(";");
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if(name === cookiePair[0].trim())
        {
            returnFlag = decodeURIComponent(cookiePair[1]);
        }
    }
    return returnFlag;
}
export {setCookies,getCookies};