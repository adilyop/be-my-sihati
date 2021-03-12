function formatOutput(status, req, res, next) {
  console.log('status ', status)
  if (status === 500) {
    const data = res.exception || res.error;
    res.status(500).send(data);
  } else if (status === 200) {
    const result = res.result;
    res.status(200).send(result);
  } else { next(); }
}

export  {
  formatOutput,
};
