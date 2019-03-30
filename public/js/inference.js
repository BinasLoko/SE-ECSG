$(document).ready(function () {


    function getHeuristicValues() {

        $('.btn-final').on('click', function () {

            let heuristic_one = $('[name=likert-one]:checked').val();

            let heuristic_three = $('[name=likert-three]:checked').val();

            let heuristic_five = $('[name=likert-five]:checked').val();

            let one_return = setHeuristicOneValue(heuristic_one);
            debugger


            let heuristic_list = [{ heuristic_one }, { heuristic_three }, { heuristic_five }];



            localStorage.setItem('heuristic_values', JSON.stringify(heuristic_list));
            let heuristic_result = localStorage.getItem('heuristic_values');
            console.log(JSON.parse(heuristic_result));
            localStorage.removeItem('heuristic_values');



        });


    }

    function setHeuristicOneValue(one_value) {
        debugger
        let one_text;
        if (one_value == "strong_disagree") {
            one_text = "Adaptatividade pode ser usada para melhorar a forma com a qual o jogador aprende e sua não utilização tende a prejudicar a experiência de quem está interagindo com a ferramenta, prejudicando o objetivo de um serious game que é a aprendizagem. Considerando que esse aspecto nunca é utilizado, é aconselhável buscar e implantar maneiras de como monitorar as habilidades habilidades julgadas necessárias do jogador para caracterizá-lo, de forma a fornecer algum tipo de ajuda.";
        } else if (one_value == "disagree") {
            one_text = "Adaptatividade pode ser usada para melhorar a forma com a qual o jogador aprende e sua não utilização tende a prejudicar a experiência de quem está interagindo com a ferramenta, fazendo com que a proposta escape do objetivo de um serious game que é a aprendizagem. Considerando que esse aspecto raramente é abordado, é aconselhável aumentar a quantidade de habilidades monitoradas do jogador para caracterizá-lo e poder mapear mais alguns cenários onde cabe fornecer ajuda. ";
        } else if (one_value == "neutral") {
            one_text = "Tendo em vista que não é perceptível a atuação de técnicas de adaptatividade no serious game, é necessário saber se realmente é aplicável a ponto do jogador não perceber, ou se o serious game não apresenta nenhum tipo de abordagem deste recurso. Caso já esteja sendo aplicado, é recomendado revisar todas as mudanças no jogo e validar. Caso não esteja, a adaptatividade pode ser usada para melhorar a forma com a qual o jogador aprende e sua não utilização tende a prejudicar a experiência de quem está interagindo com a ferramenta, fazendo com que a proposta escape do objetivo de um serious game que é a aprendizagem. Considerando que esse aspecto não é utilizado, é aconselhável monitorar as habilidades julgadas necessárias do jogador para caracterizá-lo, de forma a fornecer algum tipo de ajuda. ";
        } else if (one_value == "agree") {
            one_text = "Utilizar, quase sempre, recursos de adaptatividade no serious game pode ser um sinal de alerta. É aconselhável rever os processos para verificar se realmente existe essa necessidade. Oferecer ajuda em excesso pode tornar o jogador ocioso e diminuir a sua vontade de entender e descobrir por conta própria, tendo em vista que ele sempre receberá ajuda.";
        } else {
            one_text = "Levando em consideração que o jogo sempre aplica técnicas de adaptatividade, é aconselhável verificar se realmente existe essa necessidade. Oferecer ajuda em excesso pode tornar o jogador ocioso e diminuir a sua vontade de entender e descobrir por conta própria, tendo em vista que ele sempre receberá ajuda.";
        }
        return one_text;
    }



    getHeuristicValues();

});