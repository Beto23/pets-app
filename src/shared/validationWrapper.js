import validation from 'validate.js'

export default function validate(fieldName, value, fieldConstraint) {
  // Validate.js validates your values as an object
  // e.g. var form = {email: 'email@example.com'}
  // Line 8-9 creates an object based on the field name and field value
  var formValues = {}
  formValues[fieldName] = value;



  var formFields = {}
  formFields[fieldName] = fieldConstraint;

  const result = validation(formValues, formFields);
  
  // If there is an error message, return it!
  if (result) {
    // Return only the field error message if there are multiple
    return result[fieldName][0];
  }

  return null
}