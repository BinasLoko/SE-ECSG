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


        $('.btn-final').on('click', function () {

            name_value = $('#nome').val();
            last_name = $('#sobrenome').val();
            country_value = $('.pais').val();
            sex_value = $('.sexo').val();
            telephone_value = $('#telefone').val();
            birth_value = $('.nascimento').val();
            user_name = $('#username').val();
            user_password = $('#password').val();
            confirm_password = $('#confirmPassword').val();
            email_value = $('#email').val();
            //sexo e telefone podem ser vazios
            

            if (user_password != confirm_password) {
                $('#password').val("");
                $('#confirmPassword').val("");

                $("#password").attr('style', 'background-color:#D3D3D3');
                $("#confirmPassword").attr('style', 'background-color:#D3D3D3');

                alert('Inconsistência nas senhas!');
            }
            
            if(telephone_value.length > 15){
                $('#telefone').val("");
                $("#telefone").attr('style', 'background-color:#D3D3D3');
                alert('Digite até 15 caracteres no campo telefone!');
            }


        });
    }
    getRegisterInputs();
})