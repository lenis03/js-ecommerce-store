import { Product, Clothing, Appliance } from "../../data/products.js";

describe("test suite: Product class", () => {
  it("creates a product with correct properties", () => {
    const product = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: { stars: 4.5, count: 87 },
      priceCents: 1090,
    });
    expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(product.name).toEqual(
      "Black and Gray Athletic Cotton Socks - 6 Pairs",
    );
    expect(product.rating).toEqual({ stars: 4.5, count: 87 });
    expect(product.priceCents).toEqual(1090);
  });

  it("returns the correct star rating image url", () => {
    const product = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      rating: { stars: 4.5, count: 87 },
      priceCents: 1090,
    });
    expect(product.getStarsUrl()).toEqual("images/ratings/rating-45.png");
  });

  it("returns the correct formatted price", () => {
    const product = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      rating: { stars: 4.5, count: 87 },
      priceCents: 1090,
    });
    expect(product.getPrice()).toEqual("$10.90");
  });

  it("returns an empty string for extraInfoHTML by default", () => {
    const product = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      rating: { stars: 4.5, count: 87 },
      priceCents: 1090,
    });
    expect(product.extraInfoHTML()).toEqual("");
  });
});

describe("test suite: Clothing class", () => {
  const clothingDetails = {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: { stars: 4.5, count: 56 },
    priceCents: 799,
    sizeChartLink: "images/clothing-size-chart.png",
  };

  it("creates a clothing product with a size chart link", () => {
    const clothing = new Clothing(clothingDetails);
    expect(clothing.sizeChartLink).toEqual("images/clothing-size-chart.png");
    expect(clothing.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");
  });

  it("returns a size chart link in extraInfoHTML", () => {
    const clothing = new Clothing(clothingDetails);
    expect(clothing.extraInfoHTML()).toEqual(
      '<a href="images/clothing-size-chart.png" target="_blank">Size Chart</a>',
    );
  });
});

describe("test suite: Appliance class", () => {
  const applianceDetails = {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: { stars: 5, count: 2197 },
    priceCents: 1899,
    instructionsLink: "images/appliance-instructions.png",
    warrantyLink: "images/appliance-warranty.png",
  };

  it("creates an appliance product with instructions and warranty links", () => {
    const appliance = new Appliance(applianceDetails);
    expect(appliance.instructionsLink).toEqual(
      "images/appliance-instructions.png",
    );
    expect(appliance.warrantyLink).toEqual("images/appliance-warranty.png");
  });

  it("returns instructions and warranty links in extraInfoHTML", () => {
    const appliance = new Appliance(applianceDetails);
    expect(appliance.extraInfoHTML()).toContain(
      'href="images/appliance-instructions.png"',
    );
    expect(appliance.extraInfoHTML()).toContain(
      'href="images/appliance-warranty.png"',
    );
  });
});
