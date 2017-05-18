"use strict";

import * as i18n from 'i18n';
import * as path from 'path';

i18n.configure({
  locales:['es'],
  directory: path.join(__dirname, '/../locales'),
  extension: '.js'
});

export default i18n;
