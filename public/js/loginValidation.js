window.addEventListener("load", function(){
    let form = document.querySelector("form")
    let email = document.querySelector("#email")
    let password = document.querySelector("#password")
    // Selecciono todos los campos de input dentro del formulario
    let inputFields = form.querySelectorAll("input");
    // Creo una variable booleana para registrar si al menos un campo está vacío

    document.getElementById("email").focus();

    form.addEventListener("submit", function(e) {
        console.log("Entre al submit")
        
        let erroresArray = []
        let formIsValid = true;
        
        // Recorrer cada campo de input
        for (let i = 0; i < inputFields.length; i++) {
            // Verificar si el valor del campo es nulo o no
            if (!inputFields[i].value) {
                // Si el valor es nulo, establecer formIsValid en false
                formIsValid = false;
                // Detener el ciclo
                break;
            }
        }
        // Verifico si formIsValid es false
        if (!formIsValid) {
            erroresArray.push("Debe completar todos los campos")
            // Detener el envío del formulario
            e.preventDefault();
            form.classList.add('is-invalid');
            form.classList.add("alert-warning")
        }else{
            
            
            
            // Creo una expresión regular para validar el formato de una dirección de correo electrónico
            let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            // Verifico si el valor del campo de email cumple con la expresión regular
            if (!emailRegex.test(email.value)) {
                email.classList.add('is-invalid');
            erroresArray.push("El email debe tener un formato valido")
        }else{
            if(email.classList.contains("is-invalid")){
                email.classList.remove("is-invalid")
            }
        }
        let passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
        
        if (!passwordRegex.test(password.value)) {
            password.classList.add('is-invalid');
            erroresArray.push("La contraseña debe tener un formato valido, largo 8, caracter especial y mayuscula")
        }else{
            if(password.classList.contains("is-invalid")){
                password.classList.remove("is-invalid")
            }
        }

    }
        if(erroresArray.length > 0){
            e.preventDefault()
            form.classList.add('is-invalid');
            form.classList.add("alert-warning")
            let ulErrores = document.querySelector("div.errores ul")
            ulErrores.innerHTML = ""
            for (let i = 0; i < erroresArray.length; i++){
                console.log("erroresArray")
                console.log(erroresArray)
                ulErrores.innerHTML += "<li>" + erroresArray[i] + "</li>"
            }
            erroresArray.length = 0
        }
    })

})
