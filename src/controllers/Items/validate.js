const validateInput = ({ itemType, qty }) => {
  if (!['coins', 'gems', 'potions'].includes(itemType)) {
    return {
      status: 'fail',
      message: 'Invalid item type'
    };
  }

  if (qty < 0 || qty > process.env.MAX_ITEMS || typeof qty !== 'number') {
    return {
      status: 'fail',
      message: 'Invalid item quantity'
    };
  }

  return true;
};

export default validateInput;
