import { auth } from "express-oauth2-jwt-bearer";

const chechJwt = auth({
  audience: process.env.AUTH_API_AUDIENCE,
  issuerBaseURL: process.env.AUTH_API_ISSUER,
});

export default chechJwt;
