import { getProduct, loadProductsFetch } from "../data/products.js";
import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import formatCurrency from "./utils/money.js";
import cart from "../data/cart.js";

async function loadPage() {
  const buyAgainTimeouts = {};
  console.log(orders);
  await loadProductsFetch();

  let ordersHTML = "";

  orders.forEach((order) => {
    const orderTimeString = dayjs(order.orderTime).format("MMMM D");

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsListHTML(order)}
        </div>
      </div>
    `;
  });

  function productsListHTML(order) {
    let productsListHTML = "";

    order.products.forEach((productDetails, index) => {
      const product = getProduct(productDetails.productId);

      productsListHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${dayjs(productDetails.estimatedDeliveryTime).format(
              "MMMM D",
            )}
          </div>
          <div class="product-quantity">
            Quantity: ${productDetails.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again" data-unique-key="${product.id}_${index}" data-product-id=${product.id} data-product-quantity=${productDetails.quantity}>
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    return productsListHTML;
  }

  document.querySelector(".js-orders-grid").innerHTML = ordersHTML;
  function updateCartQuantityDOM() {
    document.querySelector(".js-cart-quantity").innerHTML =
      cart.getCartQuantity();
  }
  updateCartQuantityDOM();

  document.querySelectorAll(".js-buy-again").forEach((element) => {
    element.addEventListener("click", () => {
      const productId = element.dataset.productId;
      const productQuantity = Number(element.dataset.productQuantity);
      const uniqueKey = element.dataset.uniqueKey;
      cart.addToCart(productId, productQuantity);
      updateCartQuantityDOM();

      const previousTimeout = buyAgainTimeouts[uniqueKey];
      if (previousTimeout) {
        clearTimeout(previousTimeout);
      }
      element.innerHTML = "Added";
      const timeoutId = setTimeout(() => {
        element.innerHTML = `
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      `;
        delete buyAgainTimeouts[uniqueKey];
      }, 1000);
      buyAgainTimeouts[uniqueKey] = timeoutId;
    });
  });
}

loadPage();
