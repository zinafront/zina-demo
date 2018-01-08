function twitterCallback(twitters) {
    var statusHTML = [];
    var results = twitters.results;
    for (var i = 0; i < results.length; i++) {
        var username = results[i].from_user;
        var from_user = results[i].from_user;
        //need filter by user for remove extra tweets
        if (from_user == 'zinansn'){
            var status = results[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g,
                function(url) {
                    return '<a href="' + url + '">' + url + '</a>';
                });
            statusHTML.push('<li><div>' + status + '</div><a href="http://twitter.com/' + username + '/statuses/' + results[i].id + '">' + relative_time(results[i].created_at) + '</a></li>');
        }
    }

    if (results.length == 0){
        statusHTML.push("<li><div>You haven't tweeted yet</div></li>");
    }

    $('#twitter').attr("original-title", statusHTML.join(''));
}

function relative_time(time_value) {
    var values = time_value.split(" ");
    time_value = values[1] + " " + values[2] + ", " + values[3] + " " + values[4];
    var parsed_date = Date.parse(time_value);
    var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
    var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
    delta = delta + (relative_to.getTimezoneOffset() * 60);

    if (delta < 60) {
        return 'less than a minute ago';
    } else if (delta < 120) {
        return 'about a minute ago';
    } else if (delta < (60 * 60)) {
        return (parseInt(delta / 60)).toString() + ' minutes ago';
    } else if (delta < (120 * 60)) {
        return 'about an hour ago';
    } else if (delta < (24 * 60 * 60)) {
        return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
    } else if (delta < (48 * 60 * 60)) {
        return '1 day ago';
    } else {
        return (parseInt(delta / 86400)).toString() + ' days ago';
    }
}