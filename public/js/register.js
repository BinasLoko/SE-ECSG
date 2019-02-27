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
            confirm_password = $('#confirmPassword').val();
            email_value = $('#email').val();
            //sexo e telefone podem ser vazios

            if (user_password != confirm_password) {
                $('#password').val("");
                $('#confirmPassword').val("");

                $("#password").attr('style', 'background-color:#FEC2C2');
                $("#confirmPassword").attr('style', 'background-color:#FEC2C2');

                alert('Inconsistência nas senhas!');
            } else if (name_value == "" || last_name == "" || country_value == ""
                || birth_value == "" || user_name == "" || user_password == ""
                || confirm_password == "" || email_value == "") {
                alert('Preencha os campos!');
            } else {
                var sql = "insert into pessoas (nome, sobrenome, pais_residencia, sexo, telefone, data_nascimento, nome_usuario, senha_usuario, email_usuario) VALUES ?";
                var values = [name_value, last_value, country_value,
                                sex_value, telephone_value, birth_value, 
                                user_name, user_password, email_value];
            }



        });
    }
    getRegisterInputs();
})