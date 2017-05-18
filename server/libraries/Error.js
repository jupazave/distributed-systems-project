'use strict';

import ExtendableError from 'es6-error';

export class _Error extends ExtendableError {
  // constructor is optional; you should omit it if you just want a custom error
  // type for inheritance and type checking

  constructor( message = 'Error', code = 'error') {
    super(message);
    this.code = code;
  }

  toString(){
    return `${this.code}: ${this.message}`;
  }
}
