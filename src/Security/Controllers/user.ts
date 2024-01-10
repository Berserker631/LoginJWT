import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../Models/user";
import jwt from "jsonwebtoken";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import nodemailer from "nodemailer";

export const newUser = async (req: Request, res: Response) => {
  const secret = speakeasy.generateSecret(process.env.SECRET_KEY);
  const { name, last, alias, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  let userName: string = `${name.charAt(0).toUpperCase()}.${last}`; 
  
  const otpauth_url = speakeasy.otpauthURL({
    secret: secret.base32,
    encoding: "base32",
    label: "Hickory Industries",
  });
  const user = await User.findOne({ where: { userName } }); // Validar si el usuario ya existe

  if (user) {
    return res.status(400).json({
      msg: `User: ${userName} already exist.`,
    });
  }

  try {
    await User.create({ //Guardar usuario en la BD

      name,
      last,
      alias,
      userName: userName,
      password: hashedPassword,
      key2FA: secret.base32,
      language_idLanguage: 1,
      isActive: 1,
      user_idUser_log: null,
    });

    qrcode.toDataURL(otpauth_url, (data_url) => {
      res.json({ secret: secret.base32, otpauth_url, qr_code: data_url });
    });
  } catch (error) {
    res.status(400).json({ msg: "Ocurrio un problema", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  const { key2FA } = req.body;

  const user: any = await User.findOne({ where: { userName } });
  let secret: string;

  if (!user) {
    return res.status(400).json({  //Validamos si el usuario existe en la Base de datos
      msg: `The user: ${userName} doesn't exist`,
    });
  } else {
    const findScrt = await User.findOne({ where: { userName } });
    secret = findScrt?.dataValues.key2FA;
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {   //Validamos la contraseña
    return res.status(400).json({
      msg: "Password Incorrect",
    });
  }

  const verified = speakeasy.totp.verify({   //validamos si el token esta bien.
    secret: secret,
    encoding: "base32",
    token: key2FA,
  });

  if (!verified) {
    return res.status(400).json({
      msg: "Invalid Token",
    });
  }

  const jwt_token = jwt.sign(  //Generamos token
    {
      userName: userName,
    },
    process.env.SECRET_KEY || "omega"
  );
  try {
    if (
      userName === req.body.userName &&
      password === req.body.password &&
      verified
    ) {
      res.json(jwt_token);
    }
  } catch (error) {
    return res.status(400).json({
      msg: `The user: ${userName} doesn't exist`,
    });
  }
};

export const sendMail = async (req: Request, res: Response) => {
  //  const transporter = nodemailer.createTransport({
  //   service: "Gmail",
  //   auth: {
  //     user: "ner.aguilar06@gmail.com",
  //     pass: "nsog vkhj qoot ikse",
  //   },
  // });
  // const mailOptions = {
  //   from: "ner.aguilar06@gmail.com",
  //   to: "sistemas@hickoryindustries.com",
  //   subject: "QR Code [Hickory Industries]",
  //   html: `<!DOCTYPE html>
  //   <html lang="en">
  //   <head>
  //       <meta charset="UTF-8">
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //       <title>Document</title>
  //       <link rel="stylesheet" href="../assets/style.css">
  //   </head>
  //   <body style="padding: 0; margin: 0;">
  //       <header class="header">
  //           <div class="logo">
  //               <img src="HickoryLogoSplashArt.png" alt="hickory">
  //           </div>
  //           <div >
  //               <p class="title">
  //                   Hickory Industries
  //               </p>
  //           </div>
  //       </header>
  //       <div class="container">
  //           <h1 class="title1">Congratulations! Your user has been created successfully 🎉</h1>
  //           <h2 class="title2">Scan here to generate a token:</h2>
  //           <div class="qrContainer">
  //               <img id="qr" alt="qrcode">
  //           </div>
  //       </div>
  //   </body>
  //   </html>`
  // };
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log("Error: Mail not sent: " + error);
  //   } else {
  //     console.log("Correo enviado con éxito: " + info.response);
  //   }
  // });
};
