const decrementButton = document.querySelector('.decrement');
const incrementButton = document.querySelector('.increment');
const quantityInput = document.querySelector('input[type="text"]');

decrementButton.addEventListener('click', function() {
    console.log("entre al detalle validation!!!!!!!!!!!!!!!!!!!!!")
  let quantity = parseInt(quantityInput.value);
  if (quantity > 1) {
    quantity--;
  }
  quantityInput.value = quantity;
});

incrementButton.addEventListener('click', function() {
  let quantity = parseInt(quantityInput.value);
  if (quantity < 24) {
    quantity++;
  }
  quantityInput.value = quantity;
});