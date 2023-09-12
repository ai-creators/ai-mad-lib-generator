import { auth } from "express-oauth2-jwt-bearer";

export const chechJwt = auth({
  audience: process.env.AUTH_API_IDENTIFIER,
  issuerBaseURL: process.env.AUTH_API_DOMAIN,
});
