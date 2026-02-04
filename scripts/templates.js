function getDishHTML(index) {
    return `        <div id="food_card" class="food_card">
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
                    ${myDishes[index].price + " €"}
               </p>
               <div class="add_btn">
                <button id="add_btn${index}" onclick="addToBasket(${index}); showPlus(${index})" class="add-btn"></button>
                <button onclick="addToBasket(${index}); showPlus(${index})" id="plus_btn${index}" class="plus_btn">+</button>
                </div>
                </section>

        </div>`;
}

function getBasketHTML(index) {
    return `
            <div class="basket_item">
                <span>${basket[index].name}</span>
                <div class="basket_numbers">
                <div>
                <button class="reduce_amount_bsk">-</button>
                <span>${basket[index].amount}</span>
                <button class="add_amount_bsk" onclick="addToBasket(${index})">+</button>
                </div>
                <span>${basket[index].price.toFixed(2)} €</span>
                </div>           
            </div>
        `;
}