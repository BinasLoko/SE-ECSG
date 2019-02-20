$(document).ready(function () {


    function getRegisterInputs() {

        let name_value;
        let last_value;
        let country_value;
        let sex_value;
        let telephone_value;
        let birth_value;
        let user_name;
        let user_password;
        let confirm_password;
        let email_value;


        $('.finalizar').on('click', function () {

            name_value = $('#nome').val();
            last_name = $('#sobrenome').val();
            country_value = $('.pais').val();
            sex_value = $('.sexo').val();
            telephone_value = $('#telefone').val();
            birth_value = $('.nascimento').val();
            user_name = $('#username').val();
            user_password = $('#password').val();
            confirm_passowrd = $('#confirmPassword').val();
            email_value = $('#email').val();


            // if(user_password != confirm_password){
            //     $('#username').val("");
            //     $('#password').val("");
                
            //     $("#password").attr('style',  'background-color:#FEC2C2');
            //     $("#confirmPassword").attr('style',  'background-color:#FEC2C2');

            //     alert('Inconsistência nas senhas!');
            // }



        });
    }

    getRegisterInputs();

})