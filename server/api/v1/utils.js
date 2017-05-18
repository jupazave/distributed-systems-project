'use strict';


export function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log(err);
    if(err.code === 'notFound') return res.status(404).end();
    if(err.code === 'timeout') return res.status(504).end();
    res.status(statusCode).send(err);
  };
}
