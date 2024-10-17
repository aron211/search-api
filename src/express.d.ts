import { Request } from 'src/express';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

declare module 'express' {
  export interface Request {
    user?: UserActiveInterface;
  }
}