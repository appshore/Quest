import { Item } from '../../services/database';

import validateInput from './validate';

const deleteItems = async (req, res) => {
  const { username } = req.user;
  let { itemType, qty } = req.params;
  itemType = itemType.toLowerCase();
  qty = parseInt(qty, 10);

  const isValid = validateInput({ itemType, qty });

  if (isValid !== true) {
    return res.json(isValid);
  }

  try {
    const items = await Item.find({ username }).value();

    const current = items[itemType];
    let able = qty;
    let now = current - qty;

    if (current - qty < 0) {
      able = current ? qty - current : current;
      now = 0;
    }

    // write op
    items[itemType] = now;
    await Item.find({ username }).write(items);

    return res.json({
      status: 'success',
      data: {
        username,
        operation: 'delete',
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

export default deleteItems;
