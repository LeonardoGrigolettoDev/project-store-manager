const responseStatusOk = (res, json) => {
  res.status(200).json(json);
};

const responseStatusBadRequest = (res, json) => {
  res.status(400).json(json);
};

const responseStatusNotFound = (res, json) => {
  res.status(404).json(json);
};

const responseStatusCreated = (res, json) => {
  res.status(201).json(json);
};

const responseStatusDeleted = (res) => {
  res.status(204).send();
};

module.exports = {
  responseStatusOk,
  responseStatusBadRequest,
  responseStatusNotFound,
  responseStatusCreated,
  responseStatusDeleted,
};
