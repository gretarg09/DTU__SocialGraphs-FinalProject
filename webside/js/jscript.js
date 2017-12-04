//console.log($.getJSON("https://api.themoviedb.org/3/discover/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb"));
var selected_movie = '';
var movies_recomendations = NaN;
var previous_movie = '';
var shown_posters;
var movie_search;

// til ad vita hvada mynd var verid ad nota
function choose(choice) {
    console.log("================ choose ========================");
    console.log(choice)
    console.log(choice.target.id)
    console.log('alrighty');

    selected_movie = choice.target.id.replace(new RegExp("_", 'g'), " ");
    //$('#' + choice.target.parentNode.id).css('filter', 'none');
    console.log('======================');
    console.log(choice.target.id)
    console.log(previous_movie)
    console.log('======================');




    // darken the formerl
    $('#' + previous_movie).css("filter", "gray");
    $('#' + previous_movie).css("filter", "url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale'");
    $('#' + previous_movie).css("-webkit-filter", "grayscale(1)");
    $('#' + previous_movie).css("-webkit-filter", "grayscale(100%)");

    // add hover to the former movies
    $('#' + previous_movie).hover(function() {
        $(this).css("filter", "none");
        $(this).css("-webkit-filter", "grayscale(0%)");
    }, function() {
        $(this).css("filter", "gray");
        $(this).css("filter", "url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale'");
        $(this).css("-webkit-filter", "grayscale(1)");
        $(this).css("-webkit-filter", "grayscale(100%)");
    });

    // here we include the underscore
    selected_movie_id = choice.target.id
    // light up the selected movie
    $('#' + selected_movie_id).css("filter", "none");
    $('#' + selected_movie_id).css("-webkit-filter", "grayscale(0%)");

    // take out the hover of the selected movie
    $('#' + selected_movie_id).off('mouseenter mouseleave');


    // make the selected movie bigger
    $('#' + selected_movie_id).css("max-width", "250px");

    $('#' + previous_movie).css("max-width", "200px");
    // update the previous movie
    previous_movie = selected_movie_id

    console.log("================ choose ========================");
}



$('#term').focus(function() {
    var full = $("#poster").has("img").length ? true : false;
    if (full == false) {
        $('#poster').empty();
    }
});



var getPoster = function(val) {
    console.log('--------- getPoster ----------');
    var film = val //$('#term').val();

    var idd = val.replace(/['.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    var idd = idd.replace(new RegExp(" ", 'g'), "_");
    console.log('IDDDDDDD');
    console.log(idd);

    if (film == '') {

        $('#poster').html('<div class="alert"><strong>Oops!</strong> Try adding something into the search field.</div>');

    } else {

        //$('#poster').html('<div class="alert"><strong>Loading...</strong></div>');

        $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + film + "&callback=?", function(json) {
            if (json != "Nothing found.") {

                $('#poster').append('<img  id =' + idd + ' src=\"http://image.tmdb.org/t/p/w500/' + json.results[0].poster_path + '\" class=\"img-responsive\" >')
                console.log(idd)
                $('#' + idd).on('click', choose);
                console.log(selected_movie);

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
    $.getJSON("search_results3.json", function(json) {
        //console.log(json); // this will show the info it in firebug console

        movies_recomendations = json
        console.log(movies_recomendations)



        try {

            // remove all childs from previous posters
            $("#poster").empty()

            // get the value from the network input box (that is what node we calculate from)
            var input = document.getElementById('term').value
            input = input.replace(/['.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase();
            console.log(input)
            //var input = 'Vampires Suck'


            movies_orderd = movies_recomendations[input]
            console.log(movies_orderd)
            console.log(movies_orderd)



            var num_posters_to_show = 5
            shown_posters = 0
            // write to the doom
            for (var key in movies_orderd) {
                console.log(key)
                getPoster(movies_orderd[key][1])

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
$('#buttons').append('<button id = "remove" class = "btn btn-warning"> remove </button> ')
$('#buttons').append('<button id = "the_searcher" class = "btn btn-success"> Search </button> ')

// add event listeners to the buttons
$('#Netflix').on('click', goToNetflix);
$('#IMDB').on('click', goToIMDB);
$('#Amazon').on('click', goToAmazon);
$('#Google').on('click', goToGoogle);
$('#remove').on('click', removePoster);
$('#the_searcher').on('click', searcher);





// check if we have search for somthing
$('#search').click(list_shortest_paths);
$('#term').keyup(function(event) {
    if (event.keyCode == 13) {
        list_shortest_paths();
    }
});




// autocomplete function, to get the possible movies
$.getJSON("all_movies.json", function(json) {
    var data = Object.keys(json)
    console.log(json)
    //console.log(data)
    $("#term").autocomplete({
        source: function(request, response) {
            console.log("hjello");
            var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(request.term), "i");
            response($.grep(json['movies'], function(item) {
                return matcher.test(item);
            }));
        }
    });
});


// this function search the selected film
function searcher(){
    if (selected_movie != ''){
     document.getElementById('term').value = selected_movie;
     list_shortest_paths()
 }

}


// links which can help with the search
// https://www.google.com/#q=    til ad googla input
// http://www.imdb.com/find?s=tt&q=MOVIE-TITLE-HERE     finna tad a imdb
// http://www.amazon.com/s/ref=nb_ss_d?tag=chriscoyier-20&url=search-alias%3Ddvd&field-keywords=MOVIE-TITLE-HERE finna tad a amaxon
// http://www.netflix.com/Search?lnkctr=srchrd-ips&v1=MOVIE-TITLE-HERE    finna tad a netflix


function goToNetflix() {
    if (selected_movie != ''){
        alert('are you sure you wann go to Netflix?')

        window.location.href = "http://www.netflix.com/Search?lnkctr=srchrd-ips&v1=" + encodeURIComponent(selected_movie);
    }
}

function goToIMDB() {
    if (selected_movie != ''){
        alert('are you sure you wann go to IMDb?')

        window.location.href = "http://www.imdb.com/find?s=tt&q=" + encodeURIComponent(selected_movie);
    }
}

function goToAmazon() {
    if (selected_movie != ''){
        alert('are you sure you want to go to the jungle?')

        window.location.href = "http://www.amazon.com/s/ref=nb_ss_d?tag=chriscoyier-20&url=search-alias%3Ddvd&field-keywords=" + encodeURIComponent(selected_movie);
    } 
}

function goToGoogle() {
    if (selected_movie != ''){
        alert('are you sure you wann Google it?')

        window.location.href = "https://www.google.com/#q=" + encodeURIComponent(selected_movie);
    }
}

var last_selected = '';
function removePoster() {
    
    
    if (selected_movie != '' && selected_movie !== last_selected){ 
    // get all the posters that are to show
    var current_posters = [];
    $(function() {
        $('#poster').children().each(function() {
            current_posters[current_posters.length] = $(this).attr('id');
        });
    });


    // find the next poster that is not for show
    var poster_to_show = movies_orderd[shown_posters][1].replace(/['.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")//replace(/'/g, "")
    poster_to_show = poster_to_show.replace(new RegExp(" ", 'g'), "_")
    while (current_posters.includes(poster_to_show)) {
        shown_posters = (shown_posters + 1) % (Object.keys(movies_orderd).length - 1);
        poster_to_show  = movies_orderd[shown_posters][1].replace(/['.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
        poster_to_show = poster_to_show.replace(new RegExp(" ", 'g'), "_");
    }

    // remove the post which was selected
    poster = selected_movie.replace(new RegExp(" ", 'g'), "_")
    $("#" + poster).remove();

    // get the new poster
    getPoster(movies_orderd[shown_posters][1])

    }
    last_selected = selected_movie

}

