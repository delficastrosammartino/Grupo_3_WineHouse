window.addEventListener("load", function(){
  let form = document.querySelector("form")
  
  form.addEventListener("submit", function(e) {

    let name = document.querySelector("input.name")
    let price = document.querySelector("input.price")
    let discount = document.querySelector("input.discount")
    let size = document.querySelector("select.size")
    let bodega = document.querySelector("select.bodega")
    let province = document.querySelector("select.province")
    let category = document.querySelector("select.category")
    let descripcion = document.querySelector("select.descripcion")

    

    let erroresArray = [];




    if(name.value == "" || name.lemgth < 3 ){
      console.log("1")
      console.log(name.value)
        name.classList.add('is-invalid');
        erroresArray.push("Debe completar el campo nombre")
        
    }else{
        
        name.classList.remove('is-invalid');
        name.classList.add('is-valid');
    }
    
    
    
    if(price.value == "" || price.value < 0 ){
      console.log("2")
        price.classList.add('is-invalid');
        erroresArray.push("El precio debe ser mayor a 0")
    }else{
        price.classList.remove('is-invalid');
        price.classList.add('is-valid');
    }
    
    
    
    if(discount.value == "" || discount.value < 0 || discount.value > 100){
      console.log("3")
        discount.classList.add('is-invalid');
        console.log("1")
        erroresArray.push("Debe ser un numero entre 0 y 100")
    }else{
        discount.classList.remove('is-invalid');
        discount.classList.add('is-valid');
    }
    
    
    
    if(size.value == ""){
      console.log("4")
        size.classList.add('is-invalid');
        erroresArray.push("Debe seleccionar el campo tamaño")
    }else{
        size.classList.remove('is-invalid');
        size.classList.add('is-valid');
    }
    
    
    
    if(bodega.value == ""){
      console.log("5")
        bodega.classList.add('is-invalid');
        erroresArray.push("Debe seleccionar el campo bodega")
    }else{
        bodega.classList.remove('is-invalid');
        bodega.classList.add('is-valid');
    }
    
    
    
    if(province.value == ""){
      console.log("6")
        province.classList.add('is-invalid');
        erroresArray.push("Debe seleccionar el campo provincia")
    }else{
        province.classList.remove('is-invalid');
        province.classList.add('is-valid');
    }
    
    
    if(category.value == ""){
      console.log("7")
        category.classList.add('is-invalid');
        erroresArray.push("Debe seleccionar el campo categoria")
    }else{
        category.classList.remove('is-invalid');
        category.classList.add('is-valid');
    }
    
    if(descripcion.value == ""){
      console.log("8")
        descripcion.classList.add('is-invalid');
        erroresArray.push("Debe escribir una descripcion")
    }else{
        descripcion.classList.remove('is-invalid');
        descripcion.classList.add('is-valid');
    }
  })
  
  if (erroresArray.length > 0){
    console.log("9")
    e.preventDefault()
    let ulErrores = document.querySelector("div.errores ul")
            ulErrores.innerHTML = ""
            
            for (let i = 0; i < erroresArray.length; i++){
                
                ulErrores.innerHTML += "<li>" + erroresArray[i] + "<li>"
            }

  }

  

})
