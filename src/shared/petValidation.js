const validation = {
    name: {
        presence: {
            message: '^Campo requerido'
        }
    },
    email: {
        presence: {
            message: '^Email requerido'
        },
        format: {
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: '^Escriba un correo valido'
        }
    }
}

export default validation;