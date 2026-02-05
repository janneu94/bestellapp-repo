

let basket = [];

function render() {
    const menu = document.getElementById("menu");
    menu.innerHTML = "";

    for (let i = 0; i < myDishes.length; i++) {
        menu.innerHTML += getDishHTML(i);
    }
}

// function addToBasket(index) {
//     let dish = myDishes[index];

//     let existingDish = basket.find(item => item.name === dish.name);

//     if (existingDish) {
//         existingDish.amount++;
//     } else {
//         basket.push({
//             name: dish.name,
//             price: dish.price,
//             amount: 1
//         });
//     }

//     renderBasket();
// }

// function renderBasket() {
//     let basketContainer = document.getElementById("basket");
//     basketContainer.innerHTML = "";

//     for (let i = 0; i < basket.length; i++) {
//         basketContainer.innerHTML += getBasketHTML(i);
//     }

//     renderTotal();
// }

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

function showPlus(dishId) {
  document.getElementById("plus_btn" + dishId).classList.add("visible");
  document.getElementById("add_btn" + dishId).classList.add("add_btn_clicked");

  const i = getBasketIndexById(dishId);
  const amount = i === -1 ? 0 : basket[i].amount;

  document.getElementById("add_btn" + dishId).innerHTML = "added " + amount;
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
}

function renderBasket() {
    let showBasket = document.getElementById("basket");
    showBasket.innerHTML ="";
    
    for(let basketItem of basket) {
        let dish = getDishById(basketItem.dishId);
        showBasket.innerHTML += getBasketHTML(dish,basketItem);

    }
    renderTotal();
}