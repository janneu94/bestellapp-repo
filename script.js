

let basket = [];

function init() {
  render();
  renderBasket();
}

function render() {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  for (let i = 0; i < myDishes.length; i++) {
    menu.innerHTML += getDishHTML(i);
  }
}

function renderTotal() {
  let total = 0;

  for (const item of basket) {
    const dish = getDishById(item.dishId);
    if (!dish) continue;
    total += dish.price * item.amount;
  }

  document.getElementById("total").innerText =
    "Total: " + total.toFixed(2) + " €";
}

function showPlus(dishId) {
  let plusBtn = document.getElementById("plus_btn" + dishId);
  let addBtn = document.getElementById("add_btn" + dishId);

  plusBtn.classList.add("visible");
  addBtn.classList.add("add_btn_clicked");

  let index = getBasketIndexById(dishId);
  let amount = 0;

  if (index !== -1) {
    amount = basket[index].amount;
  }

  addBtn.innerHTML = "added " + amount;
}


function showMinus(dishId) {
  const i = getBasketIndexById(dishId);

  const addBtn = document.getElementById("add_btn" + dishId);
  const plusBtn = document.getElementById("plus_btn" + dishId);

  if (!addBtn || !plusBtn) return;

  if (i == -1) {
    plusBtn.classList.remove("visible");
    addBtn.classList.remove("add_btn_clicked");
    addBtn.innerHTML = "";
  } else {
    addBtn.innerHTML = "added " + basket[i].amount;
  }
}

function getDishById(id) {
  return myDishes.find(a => a.id === id);
}

function getBasketIndexById(dishId) {
  return basket.findIndex(b => b.dishId === dishId);
}

function addToBasket(id) {
  let basketId = getBasketIndexById(id);

  if (basketId === -1) basket.push({ dishId: id, amount: 1 });
  else basket[basketId].amount++;

  renderBasket();
  showPlus(id);
}

function reduceBasket(id) {
  let basketId = getBasketIndexById(id);
  if (basketId === -1) return;

  basket[basketId].amount--;
  if (basket[basketId].amount === 0) basket.splice(basketId, 1);

  renderBasket();
  showMinus(id);
}

function renderBasket() {
  let showBasket = document.getElementById("basket");
  showBasket.innerHTML = "";

  if (basket.length === 0) {
    showBasket.innerHTML = getEmptyBasketHTML();
    renderTotal();
    return;
  }

  for (let basketItem of basket) {
    let dish = getDishById(basketItem.dishId);
    showBasket.innerHTML += getBasketHTML(dish, basketItem);
  }

  for (const basketItem of basket) {
    proofAmount(basketItem.dishId);
  }

  renderTotal();
}

function proofAmount(dishId) {
  let index = getBasketIndexById(dishId);
  if (index === -1) return;

  let minusBtn = document.getElementById("minus_btn_" + dishId);
  if (!minusBtn) return;

  if (basket[index].amount === 1) {
    minusBtn.classList.add("trash_icon");
    minusBtn.innerHTML = "";
  } else {
    minusBtn.classList.remove("trash_icon");
    minusBtn.innerHTML = "-";
  }
}

function toggleBasket() {
  document.querySelector(".basket_overlay").classList.toggle("open");
  document.querySelector(".m_btn_basket").classList.toggle("active");
}

function buyNow() {
  basket = [];
  renderBasket();
  resetAddButtons();
  let basketOverlay = document.querySelector(".basket_overlay");
  let mobileBtn = document.querySelector(".m_btn_basket");

  basketOverlay.classList.remove("open");
  mobileBtn.classList.remove("active");
  let dialog = document.getElementById("order_confirmed");
  dialog.showModal();
}

function closeDialog(event) {
  event.preventDefault();
  event.stopPropagation();
  let dialog = document.getElementById("order_confirmed");
  dialog.close();
}

function resetAddButtons() {
  document.querySelectorAll(".add_btn_clicked").forEach(btn => {
    btn.classList.remove("add_btn_clicked");
    btn.innerHTML = "";
  });

  document.querySelectorAll(".plus_btn.visible").forEach(btn => {
    btn.classList.remove("visible");
  });
}