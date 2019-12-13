import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provider' });
  }
  // antes da virgula é a primeira posição do autHeader que foi separado no metodo split
  const [, token] = authHeader.split(' ');

  try {
    // uso a biblioteca promisify do util para utilizar o await em um callback
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // jogoar o id dentro do req
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
