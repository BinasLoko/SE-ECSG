$(document).ready(function () {

    function getHeuristicResults(){
        let results = localStorage.getItem('heuristic_values');
        let resultsToUse = JSON.parse(results);

        $('body .one-result').html("<p>" + resultsToUse[0].one_return +"</p>"+ "\n");
        $('body .three-result').html("<p>" + resultsToUse[1].three_return +"</p>"+ "\n");
        $('body .five-result').html("<p>" + resultsToUse[2].five_return +"</p>"+ "\n")  ;

        localStorage.removeItem('heuristic_values');
        console.log(localStorage.getItem('heuristic_values'));
        
    }

    getHeuristicResults();

});