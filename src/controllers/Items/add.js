import { Item } from '../../services/database';

import validateInput from './validate';

const addItems = async (req, res) => {
  const { username } = req.user;
  let { itemType, qty } = req.params;
  itemType = itemType.toLowerCase();
  qty = parseInt(qty, 10);
  const max = process.env.MAX_ITEMS;

  const isValid = validateInput({ itemType, qty });

  if (isValid !== true) {
    return res.json(isValid);
  }

  try {
    const items = await Item.find({ username }).value();

    const current = items[itemType];
    let able = qty;
    let now = current + qty;

    if (now > 50) {
      able = max - current;
      now = max;
    }

    // write op
    items[itemType] = now;
    await Item.find({ username }).write(items);

    return res.json({
      status: 'success',
      data: {
        username,
        operation: 'add',
        type: itemType,
        try: qty,
        able,
        now
      }
    });
  } catch (err) {
    return res.json({
      status: 'error',
      message: `DB error: ${err}`
    });
  }
};

export default addItems;
