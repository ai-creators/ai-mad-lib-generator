import { expressjwt: jwt} from "express-jwt";
import jwksRsa from "jwks-rsa";


export class Auth {
  public static verifyJwt() {
    return jwt({})
  }
}
