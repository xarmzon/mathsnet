import _ from "lodash";

export const toTitleCase = (txt) => {
  return _.startCase(txt.toLowerCase());
};

export const saveToLocalStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};
export const getLocalStorageItem = (name) => {
  return JSON.parse(localStorage.getItem(name)) || null;
};

export const formatPrice = (price: string | number) => {
  let priceToConvert: number;
  if (typeof price === "string") {
    priceToConvert = parseFloat(price);
  } else {
    priceToConvert = price;
  }

  return new Intl.NumberFormat("en-Us").format(priceToConvert);
};
