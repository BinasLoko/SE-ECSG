$(document).ready(function () {


    function getHeuristicValues() {

        $('.btn-final').on('click', function () {

            let heuristic_one = $('[name=likert-one]:checked').val();

            let heuristic_three = $('[name=likert-three]:checked').val();
            
            let heuristic_five = $('[name=likert-five]:checked').val();
            
            let heuristic_list = [{heuristic_one}, {heuristic_three}, {heuristic_five}];
            
            

            localStorage.setItem('heuristic_values', JSON.stringify(heuristic_list));
            let heuristic_result = localStorage.getItem('heuristic_values');
            console.log(JSON.parse(heuristic_result));
            localStorage.removeItem('heuristic_values');

            

        });


    }

    getHeuristicValues();

});