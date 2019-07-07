/* eslint-disable no-undef */
import 'regenerator-runtime/runtime';

import validateInput from '../src/controllers/Items/validate';

describe.only('Items Validation - validateInput', () => {
  test('item type', () => {
    expect(validateInput({ itemType: 'Unkown', qty: 4 })).toEqual({
      status: 'fail',
      message: 'Invalid item type'
    });
    expect(validateInput({ itemType: 'Coins', qty: 42 })).toEqual({
      status: 'fail',
      message: 'Invalid item type'
    });
    expect(validateInput({ itemType: 'potioNs', qty: 56 })).toEqual({
      status: 'fail',
      message: 'Invalid item type'
    });
    expect(validateInput({ qty: 13 })).toEqual({
      status: 'fail',
      message: 'Invalid item type'
    });
    expect(validateInput({ itemType: 'coins', qty: 4 })).toEqual(true);
    expect(validateInput({ itemType: 'gems', qty: 4 })).toEqual(true);
    expect(validateInput({ itemType: 'potions', qty: 4 })).toEqual(true);
  });
  test('Quantity of items', () => {
    expect(validateInput({ itemType: 'coins', qty: -3 })).toEqual({
      status: 'fail',
      message: 'Invalid item quantity'
    });
    expect(validateInput({ itemType: 'coins', qty: '2' })).toEqual({
      status: 'fail',
      message: 'Invalid item quantity'
    });
    expect(validateInput({ itemType: 'coins' })).toEqual({
      status: 'fail',
      message: 'Invalid item quantity'
    });
    expect(validateInput({ itemType: 'coins', qty: 0 })).toEqual(true);
    expect(validateInput({ itemType: 'gems', qty: 50 })).toEqual(true);
    expect(validateInput({ itemType: 'potions', qty: 23 })).toEqual(true);
  });
});
