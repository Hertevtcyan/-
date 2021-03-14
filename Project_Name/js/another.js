  $.get("http://ipinfo.io", function (response) {
        if(response.city === "Rossia"){
        $("#address").html("Средство №1 в" + response.region + " " + response.city);
        }
        else{
        $("#address").html("Страны СНГ")
        }
}, "jsonp");

           
                                    
                                
            