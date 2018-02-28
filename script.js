
$(document).ready(function(){
    $("#button").on("click", function(){
        $("#album").hide();
        var artist = document.getElementById("artist").value;
        console.log(artist);
        $.ajax({
            // findArtist()
            url: "https://itunes.apple.com/search?term=" + artist + "&limit=" + 25,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: function(result) {
                myFunction(result) },
            error: function() { alert('Failed!');
            }
        });
    });
});


function myFunction(json) {
    $("#table").show();
    var t = "";
    console.log(json);
    var results = json.results;
    console.log(results);
    t = "<table class=table table-bordered>";
    t += "<tr><td>Album</td>";
    t += "<td>" + 'Song' + "</td>";
    t += "<td>" + 'Album Art' + "</td></tr>";

    for (var i = 0; i < results.length; i++) {
        var album = results[i].collectionName;
        var song = results[i].trackName;
        var art = '<img src=' + results[i].artworkUrl30 + '>';
        t += "<tr><td><a href='#' onclick='runDetail(" + results[i].collectionId + ")'>" + album + "</a></td>";
        t += "<td>" + song + "</td>";
        t += "<td>" + art + "</td></tr>";
    }
    t += "</table>";
    document.getElementById("table").innerHTML = t;
}

function runDetail(collectionId){
    console.log(collectionId);

    $.ajax({
        // findArtist()
        url: "https://itunes.apple.com/lookup?id=" + collectionId,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function(album) {
            console.log(album);
            getDetail(album);
            },
        error: function() { alert('Failed!');
        }
    });

    $("#table").hide();
    $("#album").show();

    function getDetail(album){
        album = album.results;
        var name = album[0].collectionCensoredName;
        var explicit = album[0].collectionExplicitness;
        var genre = album[0].primaryGenreName;
        var country = album[0].country;
        var release = album[0].releaseDate;
        var artwork = '<img src=' + album.artworkUrl100 + '>';

        var x = "<table class=' table 'table-bordered>";
        x += "<tr><td>Album Name</td>";
        x += "<td>" + 'Content Advisory Rating' + "</td>";
        x += "<td>" + 'Genre' + "</td>";
        x += "<td>" + 'Country' + "</td>";
        x += "<td>" + 'Release Date' + "</td></tr>";

        x += "<tr><td>" + name + "</td>";
        x += "<td>" + explicit + "</td>";
        x += "<td>" + genre + "</td>";
        x += "<td>" + country + "</td>";
        x += "<td>" + release + "</td></tr>";
        x += "</table>";
        document.getElementById("album").innerHTML = x;



    }
}

