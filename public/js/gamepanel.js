$(document).ready(function () {
    
    function changeButtons() {
        
            if($('.status').html() == "Preenchido"){
                $('.status').parent().find('.button').hide();
            }
        
        
    }
    changeButtons();
})