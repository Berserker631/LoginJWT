import { Request, Response } from "express";
import { User } from "../models/user";
import express from "express";
import speakeasy from "speakeasy";
import qrcode from "qrcode";

export const generateSecret = async (req: Request, res: Response) => {
  const secret = speakeasy.generateSecret("Hickory");
  const otpauth_url = speakeasy.otpauthURL({
    secret: secret.base32,
    encoding: "base32",
    label: "OA2",
  });
  qrcode.toDataURL(otpauth_url, (err, data_url) => {
    res.json({ secret: secret.base32, otpauth_url, qr_code: data_url });
  });
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { secret, otp } = req.body;
  const verified = speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token:otp
  });
  res.json({ verified });
};
