import { NextFunction , Request, Response} from "express";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
const SECRET_KEY = process.env.SECRET_KEY;

export interface CustomRequest extends Request {
    token  : string | JwtPayload;
}
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies.token;
   
      if (!token) {
        throw new Error();
      }
   
      const decoded = jwt.verify(token, SECRET_KEY);
      (req as CustomRequest).token = decoded;
   
      next();
    } catch (err) {
      res.status(401).send('Please authenticate');
    }
   };
