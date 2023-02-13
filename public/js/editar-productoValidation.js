window.addEventListener("load", function () {
  let form = document.querySelector("#form");
  let errores = document.querySelector("div.errores");
  let contenedorInputs = document.querySelector(".contenedor-inputs");
  let name = document.getElementById("name")
  let price = document.querySelector("#price");
  let discount = document.querySelector("#discount");
  let size = document.querySelector("#size");
  let bodega = document.querySelector("#bodega");
  let province = document.querySelector("#province");
  let category = document.querySelector("#category");
  let image = document.querySelector("#image_id");
  let descripcion = document.querySelector("#descripcion");
  let inputFields = form.querySelectorAll("input");
  
  
  document.getElementById("name").focus();
  let ulErrores = document.querySelector("div.errores ul");
  let formIsValid = true;
  let formIsComplete = false;
  
  form.addEventListener("submit", function (e) {
    
    let erroresArray = [];
    formIsValid = true;
    for (let i = 0; i < inputFields.length; i++) {
      // Verificar si el valor del campo es nulo o no
      if (inputFields[i].name !== "foto" && !inputFields[i].value) {
        // Si el valor es nulo, establecer formIsValid en false
        formIsValid = false;
        // Detener el ciclo
        break;
      }
      if (formIsValid) {
        formIsComplete = true;
      }
    }

    if (!formIsValid) {
      erroresArray.push("Debe completar todos los campos");
      // Detener el envío del formulario
      errores.classList.add("is-invalid");
      contenedorInputs.classList.add("alert-warning");
    } else {
      errores.classList.add("is-invalid");
      contenedorInputs.classList.remove("alert-warning");
      

      if (name.value == "" || name.value.length < 5) {
        contenedorInputs.classList.add("alert-warning");
        name.classList.add("is-invalid");
        erroresArray.push("El nombre debe tener un largo minimo de 5 caracteres");
      } else {
        if (name.classList.contains("is-invalid")) {
          name.classList.remove("is-invalid");
        }
      }
      if (price.value == "" || isNaN(price.value) || price.value < 0) {
        contenedorInputs.classList.add("alert-warning");
        price.classList.add("is-invalid");
        erroresArray.push("El precio debe ser un numero mayor a 0");
      } else {
        if (price.classList.contains("is-invalid")) {
          price.classList.remove("is-invalid");
        }
      }
      if (discount.value == ""|| isNaN(discount.value) || discount.value < 0 || discount.value > 100) {
        contenedorInputs.classList.add("alert-warning");
        discount.classList.add("is-invalid");
        erroresArray.push("El descuento debe ser un numero entre 0 y 100");
      } else {
        if (discount.classList.contains("is-invalid")) {
          discount.classList.remove("is-invalid");
        }
      }
      if (size.value == "") {
        contenedorInputs.classList.add("alert-warning");
        size.classList.add("is-invalid");
        erroresArray.push("Debe seleccionar el campo tamaño");
      } else {
        if (size.classList.contains("is-invalid")) {
          size.classList.remove("is-invalid");
        }
      }
      if (bodega.value == "") {
        contenedorInputs.classList.add("alert-warning");
        bodega.classList.add("is-invalid");
        erroresArray.push("Debe seleccionar el campo bodega");
      } else {
        if (bodega.classList.contains("is-invalid")) {
          bodega.classList.remove("is-invalid");
        }
      }
      if (province.value == "") {
        contenedorInputs.classList.add("alert-warning");
        province.classList.add("is-invalid");
        erroresArray.push("Debe seleccionar el campo provincia");
      } else {
        if (province.classList.contains("is-invalid")) {
          province.classList.remove("is-invalid");
        }
      }
      if (category.value == "") {
        contenedorInputs.classList.add("alert-warning");
        category.classList.add("is-invalid");
        erroresArray.push("Debe seleccionar el campo categoría");
      } else {
        if (category.classList.contains("is-invalid")) {
          category.classList.remove("is-invalid");
        }
      }
      if (descripcion.value == "" || descripcion.value.length < 20) {
        contenedorInputs.classList.add("alert-warning");
        descripcion.classList.add("is-invalid");
        erroresArray.push("La descripcion debe tener un largo minimo de 20 caracteres");
      } else {
        if (descripcion.classList.contains("is-invalid")) {
          descripcion.classList.remove("is-invalid");
        }
      }
    }
    if (erroresArray.length > 0) {
      e.preventDefault();
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

