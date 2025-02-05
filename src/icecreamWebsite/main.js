const ONE_SCOOP = "one_scoop";
const TWO_SCOOPS = "two_scoops";

// PRODUCT CONSTRUCTOR
function Product(name, price, category) {
  this.name = name;
  this.price = price;
  this.category = category;
}

// SHOPPING BASKET
const userSelectedProducts = [];

const products = [];

const listOfProductNames = [
  "Vanilla",
  "Chocolate",
  "Mint Choc Chip",
  "Honey Comb",
  "Coffee",
  "Pistachio",
  "test",
];
const listOfPrices = [6.95, 5.95, 6.5, 5.3, 4.99, 3.95, 6.25];
const listOfCatagories = [ONE_SCOOP, TWO_SCOOPS];

let newItem;
for (i = 0; i < listOfPrices.length; i++) {
  newItem = new Product(
    listOfProductNames[i],
    listOfPrices[i],
    listOfCatagories[0]
  );
  products.push({ ...newItem, qty: 0 });
  // if (!newItem.name === "test") {
  products.push({
    ...newItem,
    price: newItem.price + 2,
    category: listOfCatagories[1],
    qty: 0,
  });
  // }
}

// products.push({ name: "one", price: 10.95, catagory: ONE_SCOOP });

console.log("products", products);

// if (products.length < 1) {
//   console.log("no products found");
// }
const oneScoopItems = products.filter(
  (item) => item.category === ONE_SCOOP
);

const twoScoopsItems = products.filter(
  (item) => item.category === TWO_SCOOPS
);

function menuBuilder(products) {
  let htmlString = `<ul class="content-list outfit-20">`;
  products.forEach((item) => {
    htmlString += `<li>${item.name} - $${item.price.toFixed(
      2
    )} <button onclick='purchaseItem(${JSON.stringify(
      item
    )})'>+</button></li>`;
  });
  htmlString += "</ul>";
  return htmlString;
}

const exampleLayoutConfig = {
  title: "Ice Cream Shop",
  navOptions: [
    {
      title: "Home",
      href: "FlexLayoutExample.html",
    },
    {
      title: "In Your Area",
      href: "/in-your-area",
    },
    {
      title: "About Us",
      href: "/about-us",
    },
  ],
  contentList: [
    menuBuilder(oneScoopItems),
    menuBuilder(twoScoopsItems),
    "adasda adsasd aasdasd asdasdasd asdaasdas",
  ],
  // MENU, IN YOUR AREA, ABOUT US
};

// CREATE HEADER FOR THE PAGE
document.getElementById("header-title").textContent =
  exampleLayoutConfig.title.toLocaleUpperCase();

// CREATE NEW NAV OPTIONS

exampleLayoutConfig.navOptions.forEach((link) => {
  const newMenuItem = document.createElement("a");
  newMenuItem.textContent = link.title;
  newMenuItem.href = link.href;
  document.querySelector(".page-links").appendChild(newMenuItem);
});

// CREATE CONTENT TO FIT INSIDE THE 3 boxes
const contentOneHeader = document.getElementById("content-one-title");
contentOneHeader.innerText = ONE_SCOOP.toLocaleUpperCase().replace(
  "_",
  " "
);

const contentOneItems = document.getElementById("content-one-items");
const contentOneHtml = exampleLayoutConfig.contentList[0];
contentOneItems.innerHTML = contentOneHtml;

const contentTwoHeader = document.getElementById("content-two-title");
contentTwoHeader.innerText = TWO_SCOOPS.toLocaleUpperCase().replace(
  "_",
  " "
);

const insertItemsByEleIdHandler = (items, elementId, sortType) => {
  if (items && elementId) {
    const contentItemsEle = document.getElementById(elementId);
    let sortedItems;
    if (sortType) {
      sortedItems = sortByTypeHandler(items, sortType);
    } else {
      sortedItems = items;
    }
    const contentHtml = menuBuilder(sortedItems);

    contentItemsEle.innerHTML = contentHtml;
  }
};

const sortByData = (a, b) => {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    1;
  }

  return 0;
};

const sortByTypeHandler = (data, sortType) => {
  if (sortType === "alpha") {
    return data.sort((itemOne, itemTwo) =>
      sortByData(itemOne.name, itemTwo.name)
    );
  }
  if (sortType === "numeric") {
    return data.sort((itemOne, itemTwo) =>
      sortByData(itemOne.price, itemTwo.price)
    );
  }

  return data;
};

const sortForContentAlpha = () => {
  insertItemsByEleIdHandler(oneScoopItems, "content-one-items", "alpha");
  insertItemsByEleIdHandler(twoScoopsItems, "content-two-items", "alpha");
};

const sortForContentNumeric = () => {
  insertItemsByEleIdHandler(
    oneScoopItems,
    "content-one-items",
    "numeric"
  );
  insertItemsByEleIdHandler(
    twoScoopsItems,
    "content-two-items",
    "numeric"
  );
};

const contentTwoItems = document.getElementById("content-two-items");
const contentTwoHtml = exampleLayoutConfig.contentList[1];
contentTwoItems.innerHTML = contentTwoHtml;

// A SHOPPING BASKET EMPTY ARRAY
const shoppingBasket = [];

function searchProducts() {
  const userInput = document.getElementById("search-box");
  const searchTerm = userInput.value.toLowerCase();

  console.log("search", searchTerm);
  const matchedProducts = products.filter((prod) =>
    prod.name.toLowerCase().includes(searchTerm)
  );

  console.log("matchedProducts", matchedProducts);
}

function capitalize(word) {
  word[0].toUpperCase() + word[0].substring(1);
}

function purchaseItem(product) {
  if (product && product?.qty > -1) {
    // validate if the item exists
    const matchedIndex = userSelectedProducts.findIndex(
      (item) =>
        item.name === product.name && item.category === product.category
    );

    // HAPPY PATH - NO ITEM EXISTS
    if (matchedIndex === -1) {
      userSelectedProducts.push({ ...product, qty: 1 });
    } else {
      userSelectedProducts[matchedIndex].qty++;
    }

    // UNHAPPY PATH - ITEM EXISTS, NEED TO AMEND WHATS ALREADY THERE

    // add product to basket
  }

  console.log("shoppingBasket", userSelectedProducts);

  let shoppingItemsHtml = "<ul>";
  userSelectedProducts.forEach((item) => {
    shoppingItemsHtml += `<li>${item.name} ${capFirstLetters(item.category, '_')} - $${item.price.toFixed(
      2
    )} (Qty: ${item.qty})</li>`;
  });
  shoppingItemsHtml += "</ul>";
  document.getElementById("shopping-items").innerHTML = shoppingItemsHtml;
}

// NOTE Example of summing up the total price in the user's shopping basket 

// const itemPrices = [4.95, 7.95, 3.95, 8.95];
// let total = 0;

// itemPrices.forEach((price) => {
//   total += price;
// })

// console.log("$" + total.toFixed(2));

// NOTE Function from module 3 intermediate labs and from Hazel

const capFirstLetters = (str, special) => {
  if (!str || typeof str !== "string") return;
  return str
    .split(special)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// TODO Chris will go through some slides with the usage of Set() and Map() in JS