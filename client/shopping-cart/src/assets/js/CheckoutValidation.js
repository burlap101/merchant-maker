export const CheckoutValidation = {
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
  }
}