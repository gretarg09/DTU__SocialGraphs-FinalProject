//console.log($.getJSON("https://api.themoviedb.org/3/discover/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb"));
var movie_to_search = 'Search somthing wierd';
var movies_recomendations = NaN;


// til ad vita hvada mynd var verid ad nota
function choose(choice) {
    console.log('alrighty');
    movie_to_search = encodeURIComponent(choice.target.parentNode.id.replace(new RegExp("_", 'g'), " "));
    //$('#' + choice.target.parentNode.id).css('filter', 'none');
    $('.img-responsive').css("padding", "10px");
    console.log(movie_to_search)
    console.log(choice.target.parentNode.id)
    // make image on
    $('#' + choice.target.parentNode.id).css("filter", "13px");
    $('#' + choice.target.parentNode.id).css("-webkit-filter", "grayscale(0%)");
}



$('#term').focus(function() {
    var full = $("#poster").has("img").length ? true : false;
    if (full == false) {
        $('#poster').empty();
    }
});



var getPoster = function(val, id) {
    console.log('--------- getPoster ----------');
    var film = val //$('#term').val();

    var idd = val.replace(new RegExp(" ", 'g'), "_");
    console.log('IDDDDDDD');
    console.log(idd);

    if (film == '') {

        $('#poster').html('<div class="alert"><strong>Oops!</strong> Try adding something into the search field.</div>');

    } else {

        //$('#poster').html('<div class="alert"><strong>Loading...</strong></div>');

        $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + film + "&callback=?", function(json) {
            if (json != "Nothing found.") {

                $('#poster').append('<img  id =' + idd + ' src=\"http://image.tmdb.org/t/p/w500/' + json.results[0].poster_path + '\" class=\"img-responsive\" >').on('click', choose)

                // make the image grayscale
                $('#' + idd).css("webkit-filter", "grayscale(1)");
                $('#' + idd).css("filter", "url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale')");
                $('#' + idd).css("filter", "gray");
                $('#' + idd).css("webkit-filter", "grayscale(100%)");
                console.log(movie_to_search);

            } else {
                $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=goonies&callback=?", function(json) {


                    $('#poster').html('<div class="alert"><p>We\'re afraid nothing was found for that search.</p></div><p>Perhaps you were looking for The Goonies?</p><img id="thePoster" src="http://image.tmdb.org/t/p/w500/' + json[0].poster_path + ' class="img-responsive" />');
                });
            }
        });

    }

    console.log('--------- getPoster ends----------');
    return false;
}




function list_shortest_paths() {

    // Let´s get the data
    $.getJSON("search_results.json", function(json) {
        //console.log(json); // this will show the info it in firebug console

        movies_recomendations = json
        console.log(movies_recomendations)



        try {
            // get the value from the network input box (that is what node we calculate from)
            var input = document.getElementById('term').value
            console.log(input)
            //var input = 'Vampires Suck'


            keySorted = movies_recomendations[input]
            console.log(keySorted)

            // a box to add posters to
            posters = document.getElementById("posters")


            var num_posters_to_show = 5
            var shown_posters = 0
            // write to the doom
            for (var key in keySorted) {

                getPoster(keySorted[key][1], shown_posters)

                shown_posters = shown_posters + 1

                if (shown_posters >= num_posters_to_show) {
                    break

                }

            }




        } catch (err) {
            console.log(err)
            console.log('Error')

        }
    });
}

// make the serach buttons 
$('#buttons').append('<button id = "Netflix" class = "btn btn-secondary"> Netflix </button>')
$('#buttons').append('<button id = "IMDB" class = "btn btn-secondary"> IMDB </button> ')
$('#buttons').append('<button id = "Amazon" class = "btn btn-secondary"> Amazon </button>')
$('#buttons').append('<button id = "Google" class = "btn btn-secondary"> Google </button> ')
$('#buttons').append('<button id = "Delete" class = "btn btn-warning"> Delete </button> ')
$('#buttons').append('<button id = "search" class = "btn btn-success"> Search </button> ')

// add event listeners to the buttons
$('#Netflix').on('click', goToNetflix);
$('#IMDB').on('click', goToIMDB);
$('#Amazon').on('click', goToAmazon);
$('#Google').on('click', goToGoogle);



// check if we have search for somthing
$('#search').click(list_shortest_paths);
$('#term').keyup(function(event) {
    if (event.keyCode == 13) {
        list_shortest_paths();
    }
});








 // Let´s get the data
// $.getJSON("search_results2.json", function(json) {      // aoutcomplite
// $("#term").autocomplete({
// //var data = Object.keys(json)
// //minLength:2
//       source: function( request, response ) {
//               var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
//               response( $.grep( Object.keys(json), function( item ){
//                   return matcher.test( item );
//               }) );
//           }
// });


$.getJSON("search_results.json", function(json) { 
    var data = Object.keys(json)
    //console.log(data)
$( "#term" ).autocomplete({
      source: function( request, response ) {
            console.log("hjello");
              var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
              response( $.grep( data, function( item ){
                  return matcher.test( item );
              }) );
          }
    });
});


// https://www.google.com/#q=    til ad googla input
// http://www.imdb.com/find?s=tt&q=MOVIE-TITLE-HERE     finna tad a imdb
// http://www.amazon.com/s/ref=nb_ss_d?tag=chriscoyier-20&url=search-alias%3Ddvd&field-keywords=MOVIE-TITLE-HERE finna tad a amaxon
// http://www.netflix.com/Search?lnkctr=srchrd-ips&v1=MOVIE-TITLE-HERE    finna tad a netflix



// nota google search apa
function goToNetflix() {
    alert('wanna go to netflix')

    window.location.href = "http://www.netflix.com/Search?lnkctr=srchrd-ips&v1=" + movie_to_search;
}

function goToIMDB() {
    alert('Sure you wann go to IMDB')

    window.location.href = "http://www.imdb.com/find?s=tt&q=" + movie_to_search;
}

function goToAmazon() {
    alert('are you afried of the amazon, das jubngle')

    window.location.href = "http://www.amazon.com/s/ref=nb_ss_d?tag=chriscoyier-20&url=search-alias%3Ddvd&field-keywords=" + movie_to_search;
}

function goToGoogle() {
    alert('Sure you wann go to Google')

    window.location.href = "https://www.google.com/#q=" + movie_to_search;
}