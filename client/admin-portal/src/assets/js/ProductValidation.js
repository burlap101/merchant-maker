export const ProductValidation = {
  validateTextField: function(value, required, re = undefined) {
    if (!value && required) {
      throw Error("Needs a value");
    } else if (!value && !required) {
      return true;
    }
    if (re && re.test(value)) {
      return true;
    } else if (re) {
      return false;
    } else {
      return true;
    }
  },
  validateNumberField: function(
    value,
    required,
    specialValues = [undefined],
    min = undefined,
    max = undefined
  ) {
    if (!value && required) {
      throw Error("Needs a value");
    } else if (!value && !required) {
      return true;
    }
    if (specialValues[0] !== undefined && specialValues.includes(value)) {
      return true;
    }
    if (min !== undefined && value < min) {
      return false;
    }
    if (max !== undefined && value > max) {
      return false;
    }
    return true;
  }
};
