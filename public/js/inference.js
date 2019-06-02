$(document).ready(function () {


    function getHeuristicValues() {

        $('.btn-final').on('click', function () {

            let heuristic_one = $('[name=likert-one]:checked').val();
            let heuristic_two = $('[name=likert-two]:checked').val();
            let heuristic_three = $('[name=likert-three]:checked').val();
            let heuristic_four = $('[name=likert-four]:checked').val();
            let heuristic_five = $('[name=likert-five]:checked').val();
            let heuristic_six = $('[name=likert-six]:checked').val();
            let heuristic_seven = $('[name=likert-seven]:checked').val();
            let heuristic_eight = $('[name=likert-eight]:checked').val();
            let heuristic_nine = $('[name=likert-nine]:checked').val();
            let heuristic_ten = $('[name=likert-ten]:checked').val();
            let heuristic_eleven = $('[name=likert-eleven]:checked').val();
            let heuristic_twelve = $('[name=likert-twelve]:checked').val();
            let heuristic_thirteen = $('[name=likert-thirteen]:checked').val();
            let heuristic_fourteen = $('[name=likert-fourteen]:checked').val();
            let heuristic_fifteen = $('[name=likert-fifteen]:checked').val();
            let heuristic_sixteen = $('[name=likert-sixteen]:checked').val();
            let heuristic_seventeen = $('[name=likert-seventeen]:checked').val();

            let heuristic_list = [{ one_return }, 
                                   {two_return}, 
                                   { three_return }, 
                                   {four_return},
                                   { five_return },
                                {six_return}];
            localStorage.setItem('heuristic_values', JSON.stringify(heuristic_list));
            let heuristic_result = localStorage.getItem('heuristic_values');
        });

        
    }    


    getHeuristicValues();

});