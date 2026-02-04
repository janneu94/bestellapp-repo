

let basket = [];

function render() {
    const menu = document.getElementById("menu");
    menu.innerHTML = "";

    for (let i = 0; i < myDishes.length; i++) {
        menu.innerHTML += getDishHTML(i);
    }
}

function addToBasket(index) {
    let dish = myDishes[index];

    let existingDish = basket.find(item => item.name === dish.name);

    if (existingDish) {
        existingDish.amount++;
    } else {
        basket.push({
            name: dish.name,
            price: dish.price,
            amount: 1
        });
    }

    renderBasket();
}

function renderBasket() {
    let basketContainer = document.getElementById("basket");
    basketContainer.innerHTML = "";

    for (let i = 0; i < basket.length; i++) {
        basketContainer.innerHTML += getBasketHTML(i);
    }

    renderTotal();
}

function renderTotal() {
    let total = 0;

    for (let i = 0; i < basket.length; i++) {
        total += basket[i].price * basket[i].amount;
    }

    document.getElementById("total").innerText =
        "Total: " + total.toFixed(2) + " €";
}



function openDialog() {
    const dialogRef = document.getElementById("basket_dialog");
    dialogRef.showModal();

    document.getElementById('basket_mobile').innerHTML =
        document.getElementById('basket').innerHTML;

    document.getElementById('total_mobile').innerHTML =
        document.getElementById('total').innerHTML;

}

function closeDialog() {
    const dialogRef = document.getElementById("basket_dialog");
    dialogRef.close();

}

function showPlus(index) {
  document.getElementById("plus_btn" + index).classList.add("visible");
  document.getElementById("add_btn" + index).classList.add("add_btn_clicked");
  document.getElementById("add_btn" + index).innerHTML =
        "added " + basket[index].amount;
}

function getDishbyID(id) {
    return myDishes.find(a => a.id === id);
}

function getBasketIndexbyID(id) {
    return basket.find(b => b.id === id);
}

function addToBasket(id) {
  let basketId = getBasketIndexById(id);

  if (basketId === -1) basket.push({id, amount: 1});
  else basket[basketId].amount++;

  renderBasket();
}

function reduceBasket(id) {
  let basketId = getBasketIndexById(id);
  if (basketId === -1) return;

  basket[basketId].amount--;
  if (basket[basketId].amount === 0) basket.splice(basketId, 1);

  renderBasket();
}