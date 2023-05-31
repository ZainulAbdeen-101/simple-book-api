import {sign} from 'jsonwebtoken'



// Define the payload (claims) to include in the token
interface payload {
  client_name: string,
  client_email: string,
};

// Define the secret key to sign the token
const secret_key =process.env.Secret_Key ;

// Define the token expiration time
const expires_in = "7d";

// Define the header for the token
const header = {
  alg: "HS256",
  typ: "JWT",
};

// Generate the JWT token
export  async function JWTtoken(payload:payload) {

   return sign(payload, secret_key!, {
    expiresIn: expires_in,
    header: header,
  });
}


    

// Print the token


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX2VtYWlsIjoiam9obmRvZSIsImlhdCI6MTY4MTc0NDg4MiwiZXhwIjoxNjgxNzQ1MDAyfQ.SFmHfJOLLa4R0iTnxqCozs1ldpJR_KhLaIpvN-dihF4
