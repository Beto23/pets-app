import validationPet from './petValidation';

export const fieldName = {
    nameField: 'name',
    nameError: 'nameError',
    validation: validationPet.name,
    label: 'Nombre'
};
export const fieldBreed = {
    nameField: 'breed',
    nameError: 'breedError',
    validation: validationPet.name,
    label: 'Raza'
}
export const fieldAge = {
    nameField: 'age',
    nameError: 'ageError',
    validation: validationPet.name,
    label: 'Edad'
}
export const fieldGender = {
    nameField: 'gender',
    nameError: 'genderError',
    validation: validationPet.name,
    label: 'Genero'
}
export const fieldDescription = {
    nameField: 'description',
    nameError: 'descriptionError',
    validation: validationPet.name,
    label: 'Descripción'
}
export const fieldNameContact = {
    nameField: 'nameContact',
    nameError: 'nameContactError',
    validation: validationPet.name,
    label: 'Nombre contacto'
}
export const fieldPhone = {
    nameField: 'phone',
    nameError: 'phoneError',
    validation: validationPet.name,
    label: 'Telefono'
}
export const fieldEmail = {
    nameField: 'email',
    nameError: 'emailError',
    validation: validationPet.email,
    label: 'Email'
}
export const fields = [
    fieldName,
    fieldBreed,
    fieldAge,
    fieldGender,
    fieldDescription,
    fieldNameContact,
    fieldPhone,
    fieldEmail
]