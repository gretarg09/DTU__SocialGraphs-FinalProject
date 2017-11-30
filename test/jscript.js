


// Let´s get the data
// $.getJSON("result.json", function(json) {
//     //console.log(json); // this will show the info it in firebug console

//     var movies_recomendations = json
//     console.log(movies_recomendations)
// });

// console.log(json)
// Note: some methods can be found here: http://jsnetworkx.org/api_progress.html
var G = new jsnx.Graph();


// Initalizing the network
G.addNodesFrom(['A', 'B', 'C', 'D', 'E', ['IBE', {
    color: '#008A00'
}]], {
    color: '#0064C7'
});
G.addCycle(['A', 'B', 'C', 'D', 'E']);
G.addEdgesFrom([
    ['A', 'IBE'],
    ['IBE', 'A']
]);


	

// drawing the network
jsnx.draw(G, {
    element: '#demo-canvas',
    withLabels: true,
    nodeStyle: {
        fill: function(d) {
            // `d` has the properties `node`, `data` and `G`
            return d.data.color;
        }
    },
    labelStyle: {
        fill: 'white'
    },
    stickyDrag: true
});

function list_shortest_paths() {


    // As long as <ul> has a child node, remove it
    while (results.hasChildNodes()) {
        results.removeChild(results.firstChild);
    }



    try {
        // get the value from the network input box (that is what node we calculate from)
        var input = document.getElementById('text').value

        // find the length of all the shortest paths from that node
        var network = jsnx.singleSourceShortestPathLength(G, input)

        // get the object represeting the paths, key:node, val: length from original node to this one
        var network_values = network['_stringValues']


        // sort the data interms of the network distances
        keysSorted = Object.keys(network_values).sort(function(a, b) {
            return network_values[b] - network_values[a]
        })

        results = document.getElementById("results")


        var num_results_to_show = 3 
        var shown_results = 0
        // write to the doom
        for (var key in keysSorted) {

            // create a <p> node
            var para = document.createElement("P");

            // create a text for the p node
            var t = document.createTextNode("distance is " + network_values[keysSorted[key]] + " to " + keysSorted[key]); // Create a text node

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

}

var getShortestPaths = document.getElementById('getShortestPaths');


getShortestPaths.addEventListener("click", list_shortest_paths);