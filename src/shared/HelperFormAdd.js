import validate from './validationWrapper';
import { fieldName } from './fieldsAddPet';


class HelperFormAdd {
    static validateNameError(value) {
        const { nameField, validation, nameError } = fieldName;
        return validate(nameField, value, validation, nameError);
    }
}

module.exports = HelperFormAdd;

