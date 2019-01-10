/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import {
  html,
  i18n,
  bind
} from 'i18n-element/i18n.js';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';
export const binding = bind('get-all-products', import.meta);
html([
  '<!-- localizable -->',
  '\n<template>\n  <json-data id="PRODUCT_LIST">',
  '</json-data>\n</template>'
], ...bind(('get-all-products', binding), (_bind, text, model, effectiveLang) => [
  _bind,
  text['PRODUCT_LIST']
], {
  'meta': {},
  'model': {},
  'PRODUCT_LIST': [
    {
      'id': 1,
      'title': 'Cabot Creamery Extra Sharp Cheddar Cheese',
      'price': 10.99,
      'inventory': 2
    },
    {
      'id': 2,
      'title': 'Cowgirl Creamery Mt. Tam Cheese',
      'price': 29.99,
      'inventory': 10
    },
    {
      'id': 3,
      'title': 'Tillamook Medium Cheddar Cheese',
      'price': 8.99,
      'inventory': 5
    },
    {
      'id': 4,
      'title': 'Point Reyes Bay Blue Cheese',
      'price': 24.99,
      'inventory': 7
    },
    {
      'id': 5,
      'title': 'Shepherd\'s Halloumi Cheese',
      'price': 11.99,
      'inventory': 3
    }
  ]
}));
export const getAllProducts = () => dispatch => {
  const products = binding.element.text.PRODUCT_LIST.reduce((obj, product) => {
    obj[product.id] = product;
    return obj;
  }, {});
  dispatch({
    type: GET_PRODUCTS,
    products
  });
};
export const checkout = () => dispatch => {
  const flip = Math.floor(Math.random() * 2);
  if (flip === 0) {
    dispatch({ type: CHECKOUT_FAILURE });
  } else {
    dispatch({ type: CHECKOUT_SUCCESS });
  }
};
export const addToCart = productId => (dispatch, getState) => {
  const state = getState();
  if (state.shop.products[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId));
  }
};
export const removeFromCart = productId => {
  return {
    type: REMOVE_FROM_CART,
    productId
  };
};
export const addToCartUnsafe = productId => {
  return {
    type: ADD_TO_CART,
    productId
  };
};
