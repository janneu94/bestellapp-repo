function getDishHTML(index){
    return `        <div id="food_card" class="food_card">
            <img src="" alt="food" id="first_card_section">
            <section id="second_card_section">
               <h3 id="dish_name">
                   ${myDishes[index].name}
               </h3>
               <p id="description">
                  ${myDishes[index].description}
               </p>
            </section>

            <section id="third_card_section">
               <p id="price">
                    ${myDishes[index].price}
               </p>
               <button onclick="addToBasket(${index})">add to basket</button>
            </section>

        </div>`;
}

function getBasketHTML(index) {
   return `
            <div class="basket_item">
                <span>${basket[index].name}</span>
                <span>${basket[index].amount}</span>
                <span>${basket[index].price.toFixed(2)} €</span>
            </div>
        `
}