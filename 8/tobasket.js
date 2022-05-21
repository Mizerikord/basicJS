'use strict';

const cartCountElem = document.querySelector(`.cartIconWrap span`);
const basketTotalValueElem = document.querySelector(`.basketTotalValue`);
const basketElem = document.querySelector(`.basket`);
const basketTotalElem = document.querySelector(`.basketTotal`);


document.querySelector(`.cartIconWrap`).addEventListener(`click`, () => {
  basketElem.classList.toggle(`hidden`);
});

const basket = {};

document.querySelector(`.featuredItems`).addEventListener(`click`, event => {
    if (!event.target.closest(`.addToCart`)){
        return;
    };
    const featuredItemElem = event.target.closest('.featuredItem');
    const id = +featuredItemElem.dataset.id;
    const name = featuredItemElem.dataset.name;
    const price = +featuredItemElem.dataset.price;
    addToCart(id, name, price);
});

function addToCart(id, name, price){
  if (!(id in basket)) {
    basket[id] = {
      id: id, 
      name: name,
      price: price, 
      count: 0,
    };
  };
  basket[id].count++;
  cartCountElem.textContent = getTotalBasketCount().toString();
  basketTotalValueElem.textContent = getTotalBasketPrice().toFixed(2);
  renderProductInBasket(id);
};

function getTotalBasketCount() {
  return Object.values(basket).reduce((sum, product) => sum + product.count, 0);
};

function getTotalBasketPrice() {
  return Object
    .values(basket)
    .reduce((sum, product) => sum + product.count * product.price, 0);
};

function renderProductInBasket(id){
  const basketRowElem = basketElem
    .querySelector(`.basketRow[data-productId="${id}"]`);
    if(!basketRowElem){
      renderNewProductInBasket(id);
      return;
    }
    basketRowElem.querySelector(`.productCount`).textContent = basket[id].count;
    basketRowElem.querySelector(`.productTotalRow`)
      .textContent = basket[id].count *  basket[id].price;
};

function renderNewProductInBasket(productId){
  const productRow = `
    <div class="basketRow" data-productId="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  basketTotalElem.insertAdjacentHTML(`beforebegin`, productRow);
};
