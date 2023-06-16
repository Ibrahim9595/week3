import fetch from "node-fetch";

const _fetch = (url) => fetch(url).then((res) => res.json());

const groupWithCategory = (products) => {
  const categorized = {};

  products.forEach((element) => {
    if (categorized[element.category.id]) {
      categorized[element.category.id].products.push(element);
    } else {
      categorized[element.category.id] = {
        category: {
          id: element.category.id,
          name: element.category.name,
        },
        products: [element],
      };
    }
  });

  return Object.values(categorized);
};

const transferCurrency = (products, rate) => {
  return products.map((el) => ({ ...el, price: el.price * rate }));
};

const categorizeProducts = async () => {
  const [products, egp] = await Promise.all([
    _fetch("https://api.escuelajs.co/api/v1/products?offset=1&limit=10"),
    _fetch("https://api.exchangerate.host/latest?base=USD").then(
      (res) => res.rates["EGP"]
    ),
  ]);

  const transformedPrices = transferCurrency(products, egp);
  const categorizedProducts = groupWithCategory(transformedPrices);
  console.log(JSON.stringify(categorizedProducts, null, 2));
};

categorizeProducts();
