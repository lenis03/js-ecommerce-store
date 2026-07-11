import { getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import cart from "../data/cart.js";

async function renderTracking() {
  await loadProductsFetch();
  const url = new URL(window.location.href);
  const productId = url.searchParams.get("productId");
  const orderId = url.searchParams.get("orderId");
  const product = getProduct(productId);
  const order = getOrder(orderId);

  if (!product) {
    document.querySelector(".js-order-tracking").innerHTML =
      `<p>Product wasn't found</p>`;
    return;
  } else if (!order) {
    document.querySelector(".js-order-tracking").innerHTML =
      `<p>order wasn't found</p>`;
    return;
  }
  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === productId) {
      productDetails = details;
    }
  });
  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  const percentProgress =
    ((today - orderTime) / (deliveryTime - orderTime)) * 100;

  const html = `
  <a class="back-to-orders-link link-primary" href="orders.html">
  View all orders
</a>

<div class="delivery-date">Arriving on ${dayjs(productDetails.estimatedDeliveryTime).format("dddd, MMMM D")}</div>

<div class="product-info">${product.name}</div>

<div class="product-info">Quantity: ${productDetails.quantity}</div>

<img
  class="product-image"
  src="${product.image}"
/>

<div class="progress-labels-container">
<div class="progress-label ${percentProgress < 50 ? "current-status" : ""}">
        Preparing
      </div>
      <div class="progress-label ${
        percentProgress >= 50 && percentProgress < 100 ? "current-status" : ""
      }">
        Shipped
      </div>
      <div class="progress-label ${
        percentProgress >= 100 ? "current-status" : ""
      }">
        Delivered
      </div>
</div>

<div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentProgress}%;"></div>
</div>

  `;
  document.querySelector(".js-order-tracking").innerHTML = html;
  function updateCartQuantityDOM() {
    document.querySelector(".js-cart-quantity").innerHTML =
      cart.getCartQuantity();
  }
  updateCartQuantityDOM();
}

renderTracking();
