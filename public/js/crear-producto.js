window.onload = function(){

document.getElementById('delete-button').addEventListener('click', () => {
    fetch(`/products/delete/${product.id}?_method=DELETE`, {
      method: 'DELETE'
    })
  }); 
}