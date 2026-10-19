import type { RequestHandler } from 'express';
import { parsePinterestEnvironment } from '../src/utils/pinterestEnvironment.js';

export const requirePinterestEnvironment: RequestHandler = (req, res, next) => {
  try {
    const value = ['GET', 'DELETE'].includes(req.method) ? req.query.environment : req.body?.environment;
    res.locals.pinterestEnvironment = parsePinterestEnvironment(value);
    next();
  } catch {
    res.status(400).json({ error: 'Bitte wähle Produktion oder Sandbox als Pinterest-Umgebung.' });
  }
};
