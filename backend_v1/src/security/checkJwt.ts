import { auth } from "express-oauth2-jwt-bearer";

const chechJwt = auth({
  audience: process.env.AUTH_API_IDENTIFIER,
  issuerBaseURL: process.env.AUTH_API_DOMAIN,
});

export default chechJwt;
