'use strict';

import log from './../../libraries/Log';

export function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    log.error(err);
    if(err.code === 'notFound') return res.status(404).end();
    if(err.code === 'timeout') return res.status(504).end();
    res.status(statusCode).send(err);
  };
}
