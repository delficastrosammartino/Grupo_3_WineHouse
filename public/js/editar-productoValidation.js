window.addEventListener("load", function () {
  let form = document.querySelector("#form");
  let errores = document.querySelector("div.errores");
  let inputBorder = document.querySelector(".contenedor-inputs");
  let name = document.querySelector("#name");
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
      if (!inputFields[i].value) {
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
      form.classList.add("alert-warning");
    } else {
      errores.classList.add("is-invalid");
      form.classList.add("alert-warning");

      if (name.value == "" || name.value.length < 3) {
        if (name.classList.contains("is-valid")) {
          name.classList.remove("is-valid");
        }
        name.classList.add("is-invalid");
        erroresArray.push(
          "El nombre debe tener un largo minimo de 2 caracteres"
        );
      } else {
        if (name.classList.contains("is-invalid")) {
          name.classList.remove("is-invalid");
        }
        name.classList.add("is-valid");
      }
      if (price.value == "" || price.value < 0) {
        if (price.classList.contains("is-valid")) {
          price.classList.remove("is-valid");
        }
        price.classList.add("is-invalid");
        erroresArray.push("El precio debe ser mayor a 0");
      } else {
        if (price.classList.contains("is-invalid")) {
          price.classList.remove("is-invalid");
        }
        price.classList.add("is-valid");
      }
      if (discount.value == "" || discount.value < 0 || discount.value > 100) {
        if (discount.classList.contains("is-valid")) {
          discount.classList.remove("is-valid");
        }
        discount.classList.add("is-invalid");
        erroresArray.push("Debe ser un numero entre 0 y 100");
      } else {
        if (discount.classList.contains("is-invalid")) {
          discount.classList.remove("is-invalid");
        }
        discount.classList.add("is-valid");
      }
      if (size.value == "") {
        if (size.classList.contains("is-valid")) {
          size.classList.remove("is-valid");
        }
        size.classList.add("is-invalid");
        erroresArray.push("Debe seleccionar el campo tamaño");
      } else {
        if (size.classList.contains("is-invalid")) {
          size.classList.remove("is-invalid");
        }
        size.classList.add("is-valid");
      }
      if (bodega.value == "") {
        if (bodega.classList.contains("is-valid")) {
          bodega.classList.remove("is-valid");
        }
        bodega.classList.add("is-invalid");
        erroresArray.push("Debe seleccionar el campo bodega");
      } else {
        if (bodega.classList.contains("is-invalid")) {
          bodega.classList.remove("is-invalid");
        }
        bodega.classList.add("is-valid");
      }
      if (province.value == "") {
        if (province.classList.contains("is-valid")) {
          province.classList.remove("is-valid");
        }
        province.classList.add("is-invalid");
        erroresArray.push("Debe seleccionar el campo provincia");
      } else {
        if (province.classList.contains("is-invalid")) {
          province.classList.remove("is-invalid");
        }
        province.classList.add("is-valid");
      }
      if (category.value == "") {
        if (category.classList.contains("is-valid")) {
          category.classList.remove("is-valid");
        }
        category.classList.add("is-invalid");
        erroresArray.push("Debe seleccionar el campo categoría");
      } else {
        if (category.classList.contains("is-invalid")) {
          category.classList.remove("is-invalid");
        }
        category.classList.add("is-valid");
      }
      if (image.value == "") {
        if (image.classList.contains("is-valid")) {
          image.classList.remove("is-valid");
        }
        image.classList.add("is-invalid");
        erroresArray.push("Debe seleccionar una foto");
      } else {
        if (image.classList.contains("is-invalid")) {
          image.classList.remove("is-invalid");
        }
        image.classList.add("is-valid");
      }
      if (descripcion.value == "" || descripcion.value.length < 5) {
        if (descripcion.classList.contains("is-valid")) {
          descripcion.classList.remove("is-valid");
        }
        descripcion.classList.add("is-invalid");
        erroresArray.push("Debe escribir una descripción");
      } else {
        if (descripcion.classList.contains("is-invalid")) {
          descripcion.classList.remove("is-invalid");
        }
        descripcion.classList.add("is-valid");
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
