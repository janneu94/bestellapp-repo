

let basket = [];

function init() {
  render();
  renderBasket();
  scrollBehavior();
}

function render() {
  let burgerEl = document.getElementById("burger");
  let pizzaEl = document.getElementById("pizza");
  let saladEl = document.getElementById("salad");
  burgerEl.innerHTML = "";
  pizzaEl.innerHTML = "";
  saladEl.innerHTML = "";
  for (let i = 0; i < myDishes.length; i++) {
    let dish = myDishes[i];

    if (dish.category === "burger") {
      burgerEl.innerHTML += getDishHTML(i);
    } else if (dish.category === "pizza") {
      pizzaEl.innerHTML += getDishHTML(i);
    } else if (dish.category === "salad") {
      saladEl.innerHTML += getDishHTML(i);
    }
  }
}

function renderTotal() {
  let total = 0;

  for (let item of basket) {
    let dish = getDishById(item.dishId);
    if (!dish) continue;
    total += dish.price * item.amount;
  }

  document.getElementById("total").innerText = "Total: " + total.toFixed(2) + " €";
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
  let i = getBasketIndexById(dishId);
  let addBtn = document.getElementById("add_btn" + dishId);
  let plusBtn = document.getElementById("plus_btn" + dishId);

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

  let isEmpty = basket.length === 0;

  toggleBasketUI(isEmpty);

  if (isEmpty) {
    showBasket.innerHTML = getEmptyBasketHTML();
  } else {
    renderBasketItems(showBasket);
  }

  renderTotal();
}

function toggleBasketUI(isEmpty) {
  let buyBtn = document.getElementById("buy_btn");
  let separator = document.querySelector(".seperator");
  let total = document.getElementById("total");

  let display = isEmpty ? "none" : "block";

  buyBtn.style.display = display;
  separator.style.display = display;
  total.style.display = display;
}

function renderBasketItems(container) {
  for (let basketItem of basket) {
    let dish = getDishById(basketItem.dishId);
    container.innerHTML += getBasketHTML(dish, basketItem);
  }

  for (let basketItem of basket) {
    proofAmount(basketItem.dishId);
  }
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
  const overlay = document.querySelector(".basket_overlay");
  const mobileBtn = document.querySelector(".m_btn_basket");

  overlay.classList.toggle("open");
  mobileBtn.classList.toggle("active");

  const isOpen = overlay.classList.contains("open");
  document.body.classList.toggle("no-scroll", isOpen);
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

function scrollBehavior() {
  let scrollY = window.scrollY;
  let startPosition = 480;
  let newPosition = startPosition - scrollY;

  if (window.innerWidth <= 1180) {
    basketEl.style.transform = "none";
    return;
  }

  if (newPosition < 0) {
    newPosition = 0;
  }

  let basket = document.querySelector(".basket_overlay");
  basket.style.transform = "translateY(" + newPosition + "px)";
}

if (window.innerWidth > 1180) {
  window.addEventListener("scroll", scrollBehavior);
}