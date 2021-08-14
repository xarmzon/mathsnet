import _ from "lodash";

export const toTitleCase = (txt) => {
  return _.startCase(txt);
};

export const saveToLocalStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};
export const getLocalStorageItem = (name) => {
  return localStorage.getItem(name);
};
