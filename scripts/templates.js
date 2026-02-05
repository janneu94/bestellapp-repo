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
<button
  id="add_btn${myDishes[index].id}"
  onclick="addToBasket(${myDishes[index].id})"
  class="add-btn">
</button>

<button
  id="plus_btn${myDishes[index].id}"
  onclick="addToBasket(${myDishes[index].id})"
  class="plus_btn">
  +
</button>
                </div>
                </section>

        </div>`;
}

function getBasketHTML(dish, basketItem) {
    return `
            <div class="basket_item">
                <span>${dish.name}</span>
                <div class="basket_numbers">
                <div>
                <button class="reduce_amount_bsk" onclick="reduceBasket(${dish.id})">-</button>
                <span>${basketItem.amount}</span>
                <button class="add_amount_bsk" onclick="addToBasket(${dish.id})">+</button>
                </div>
                <span>${(dish.price * basketItem.amount).toFixed(2)} €</span>
                </div>           
            </div>
        `;
}