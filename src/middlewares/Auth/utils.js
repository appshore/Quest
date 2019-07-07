import jwt from 'jsonwebtoken';

// to keep it simple, password are not encrypted
const validPassword = (clear, hashed) => clear === hashed;

const generateToken = data => jwt.sign(data, process.env.SECRET, {
  expiresIn: '24h'
});


export { generateToken, validPassword };
