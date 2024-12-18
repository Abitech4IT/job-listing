import express from "express";

export const createSendToken = (
  user: any,
  statusCode: number,
  res: express.Response
) => {
  const token = user.getJwtToken();
  const cookieExpiresIn = Number(process.env.JWT_COOKIE_EXPIRES_IN) || 7;

  const cookieOptions: {
    expires: Date;
    httpOnly: boolean;
    secure?: boolean;
  } = {
    expires: new Date(Date.now() + cookieExpiresIn * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

const auth = {
  createSendToken,
};

export default auth;
