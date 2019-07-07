import { Item } from '../../services/database';

const listItems = async (req, res) => {
  const { username } = req.user;

  try {
    const items = await Item.find({ username }).value();

    if (!items) {
      return res.json({
        status: 'error',
        message: 'No items'
      });
    }

    const { coins, gems, potions } = items;

    return res.json({
      status: 'success',
      data: {
        username,
        coins,
        gems,
        potions
      }
    });
  } catch (err) {
    return res.json({
      status: 'error',
      message: `DB error: ${err}`
    });
  }
};

export default listItems;
