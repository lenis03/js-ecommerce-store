import { validDeliveryOption } from "./deliveryOptions.js";

class Cart {
  #cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.#cartItems =
      JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  saveToStorage() {
    localStorage.setItem(
      this.#localStorageKey,
      JSON.stringify(this.#cartItems),
    );
  }

  get cartItems() {
    return this.#cartItems;
  }

  findMatchingItem(productId) {
    let matchingItem;
    this.#cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });
    return matchingItem;
  }

  getCartQuantity() {
    let cartQuantity = 0;
    this.#cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }

  addToCart(productId, quantity) {
    const matchingItem = this.findMatchingItem(productId);

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.#cartItems.push({
        productId,
        quantity,
        deliveryOptionId: "1",
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
    this.#cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.#cartItems = newCart;
    this.saveToStorage();
  }

  updateCartQuantity(productId, newQuantity) {
    const matchingItem = this.findMatchingItem(productId);
    if (!matchingItem) {
      return;
    }
    matchingItem.quantity = newQuantity;
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const matchingItem = this.findMatchingItem(productId);

    if (!matchingItem) {
      return;
    }
    if (!validDeliveryOption(deliveryOptionId)) {
      return;
    }

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}

const cart = new Cart("cart");
export default cart;
