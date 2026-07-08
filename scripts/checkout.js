import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";

async function loadPages() {
  await loadProductsFetch();
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}

loadPages();
