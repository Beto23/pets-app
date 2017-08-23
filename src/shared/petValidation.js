const validation = {
  name: {
    presence: {
      message: '^Campo requerido',
    },
  },
  photo: {
    presence: {
      message: '^Imagen requerida',
    },
  },
  email: {
    presence: {
      message: '^Email requerido',
    },
    format: {
      /* eslint max-len: ["error", { "ignoreRegExpLiterals": true }]*/
      /* eslint no-useless-escape: 0*/
      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: '^Escriba un correo valido',
    },
  },
};

export default validation;
