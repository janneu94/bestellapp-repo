

let basket = [];

function render(){
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



function openDialog(){
    const dialogRef = document.getElementById("basket_dialog");
    dialogRef.showModal();
    
}