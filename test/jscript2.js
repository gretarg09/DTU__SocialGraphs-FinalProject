
    var getShortestPaths = document.getElementById('getShortestPaths');
	getShortestPaths.addEventListener("click", list_shortest_paths);







function list_shortest_paths() {

	// Let´s get the data
$.getJSON("result.json", function(json) {
    //console.log(json); // this will show the info it in firebug console

    var movies_recomendations = json




	console.log(json)
    // As long as <ul> has a child node, remove it
    while (results.hasChildNodes()) {
        results.removeChild(results.firstChild);
    }



    try {
        // get the value from the network input box (that is what node we calculate from)
        var input = document.getElementById('term').value
        
   
        keySorted = movies_recomendations[input]
        console.log(input)
        console.log(keySorted)
        console.log('keySorted!!!!!!!!!')
        console.log(typeof(keySorted))

        // a box to add results to
        results = document.getElementById("results")


        var num_results_to_show = 5 
        var shown_results = 0
        // write to the doom
        for (var key in keySorted) {
        	console.log(keySorted[key][1])


            // create a <p> node
            var para = document.createElement("P");

            // create a text for the p node
            var t = document.createTextNode("distance is " + keySorted[key][0] + " to " + keySorted[key][1]); // Create a text node

            // append the text to the p node
            para.appendChild(t);

            // insert the element to the doom 
            results.appendChild(para)

            shown_results = shown_results + 1

            if (shown_results >= num_results_to_show){
            	break

            }

            

        }




    } catch (err) {
        console.log(err)
        console.log('Error')
        // here wedo somthing clever

        var para = document.createElement('P');

        // create a text for the p node
        var t = document.createTextNode('You have done somthing terible! :o'); // Create a text node

        // append the text to the p node
        para.appendChild(t);
        para.style.color = "magenta"
        results.appendChild(para)

         var para = document.createElement('P');

        // create a text for the p node
        var t = document.createTextNode('Are you sure you are not making a spelling error??????'); // Create a text node

        // append the text to the p node
        para.appendChild(t);
        para.style.color = "red"
        results.appendChild(para)

    }
});
}



