window.addEventListener("load", function () {
  console.log("Entre a la validacion front-end!!!!!!!!");
  let form = document.getElementById("form");
  let name = document.querySelector("#name");
  let lastName = document.querySelector("#lastName");
  let userName = document.querySelector("#userName");
  let adress = document.querySelector("#adress");
  let password = document.querySelector("#password");
  let confirmPassword = document.querySelector("#confirmPassword");
  let body = document.querySelector(".edit-profile");
  let li = document.querySelector("div.errores ul");
  let contenedorInputs = document.querySelector("div.contenedor-inputs");

  document.getElementById("name").focus();

  form.addEventListener("submit", function (e) {
    console.log("Entre al submit!!!!!!!!");
    let erroresArray = [];

    if (password.value.length <= 0 || confirmPassword.value.length <= 0) {
      console.log(
        "Entre al  if ((password.value.length <= 0) || (confirmPassword.value.length <= 0))!!!!!!!!"
      );

      password.classList.add("is-invalid");
      erroresArray.push("Debe completar los campos de contraseñas");
      console.log("erroresArray");
      console.log(erroresArray);
    }

    if (password.value !== confirmPassword.value) {
      password.classList.add("is-invalid");
      erroresArray.push("Las contraseñas deben coincidir");
    }
    let passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

    if (!passwordRegex.test(password.value)) {
      password.classList.add("is-invalid");
      erroresArray.push(
        "La contraseña debe tener un formato valido, largo 8, caracter especial y mayusucula"
      );
    }

    if (name.value.length <= 2) {
      name.classList.add("is-invalid");
      erroresArray.push("El nombre debe tener un largo minimo de 2 caracteres");
    }
    if (lastName.value.length <= 2) {
      lastName.classList.add("is-invalid");
      erroresArray.push(
        "El apellido debe tener un largo minimo de 2 caracteres"
      );
    }

    if (erroresArray.length > 0) {
      e.preventDefault();
      contenedorInputs.classList.add("alert-warning");
      li.classList.add("is-invalid");
      let ulErrores = document.querySelector("div.errores ul");
      ulErrores.innerHTML = "";
      for (let i = 0; i < erroresArray.length; i++) {
        console.log("erroresArray");
        console.log(erroresArray);
        ulErrores.innerHTML += "<li>" + erroresArray[i] + "</li>";
      }
      erroresArray.length = 0;
    }
  });
});
