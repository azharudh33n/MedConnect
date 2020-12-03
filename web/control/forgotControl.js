const forgot_password_post = (req, res) => {
  res.json({ method: "fogot password post" });
};

const reset_password_get = (req, res) => {
  res.json({ method: "reset password get" });
};

const reset_password_put = (req, res) => {
  res.json({ method: "reset password put" });
};

module.exports = {
  forgot_password_post,
  reset_password_get,
  reset_password_put,
};
