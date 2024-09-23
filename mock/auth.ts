export default {
  "POST /authen/partners/login": (req: Request, res: any) => {
    let response = {
      access_token: "fakeToken",
      token_type: "Bearer",
      expires_in: 3600 * 24 * 365,
      refresh_token: "fakeRefreshToken",
    };

    return res.status(200).send(response);
  },
};
