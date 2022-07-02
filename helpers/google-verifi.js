const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleVerify( token = '' ) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { name, picture, email } = ticket.getPayload();
  //console.log( payload );

  return {
    nombre: name,  //renombrar las variables
    img: picture,
    correo: email
  }
}


module.exports = {
    googleVerify
}
