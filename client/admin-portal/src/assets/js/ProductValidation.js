export const ProductValidation = {
  validateTextField: function(re, value) {
    if (re.test(value)) {
      return true;
    } else {
      return false;
    }
  },
  validateNumberField: function()
}