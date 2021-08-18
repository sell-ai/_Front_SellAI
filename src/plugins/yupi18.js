/* eslint-disable no-template-curly-in-string */
import { setLocale } from 'yup';

setLocale({
  mixed: {
    default: 'No es válido.',
    required: 'Este campo debe ser completado.',
  },
  number: {
    min: 'Debe ser mayor que ${min}',
  },
  string: {
    min: 'Debe ser de ${min} carácteres',
  },
});
