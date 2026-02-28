function getDishHTML(index) {
  return `        
  <div id="food_card" class="food_card">
            <section>
            <img class="dish_img" src="${myDishes[index].image}" alt="${myDishes[index].name}">
            </section>
            <section id="second_card_section">
               <h3 id="dish_name">
                   ${myDishes[index].name}
               </h3>
               <p id="description">
                  ${myDishes[index].description}
               </p>
            </section>

            <section id="third_card_section">
               <p class="price">
                    ${myDishes[index].price.toFixed(2)} €
               </p>
               <div class="add_btn">

              <button
              id="add_btn${myDishes[index].id}"
              onclick="addToBasket(${myDishes[index].id})"
              class="content_add_btn">
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
                <div class="number_interface_basket">
                <button id="minus_btn_${dish.id}" class="reduce_amount_bsk" onclick="decreaseDishAmount(${dish.id})">-</button>
                <span>${basketItem.amount}</span>
                <button class="add_amount_bsk" onclick="addToBasket(${dish.id})">+</button>
                </div>
                <span>${dish.price.toFixed(2)} €</span>
                </div>           
            </div>
        `;
}

function getEmptyBasketHTML() {
  return `
    <div class="empty_basket">
      <div>Nothing here yet.<br>Go ahead and choose something delicious!</div>
      <div class="empty_icon"><img src="assets/img/empty_basket_cart.png" alt="empty_basket_cart"></div>
    </div>
  `;
}