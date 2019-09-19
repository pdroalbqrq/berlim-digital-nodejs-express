exports.auth = (req, res) => {
  res.send({ ok: true, userId: req.userId });
};
