const states = ["NSW", "QLD", "ACT", "VIC", "NT", "SA", "WA", "TAS"];

export const AddressFields = {
  text: {
    street: {
      id: "street",
      label: "Street",
      re: /^\w+ +\w+ /,
      maxlength: 255,
      errorMsg: "Please provide a valid street address.",
      example: "123 Fake St",
      value: "",
      isValid: false,
      required: true
    },
    suburb: {
      id: "suburb",
      label: "Suburb",
      re: /^\w+/,
      maxlength: 255,
      errorMsg: "Please provide a valid suburb name.",
      example: "Humpty Doo",
      value: "",
      isValid: false,
      required: true
    },
    postcode: {
      id: "postcode",
      label: "Postcode",
      re: /\d{4,5}/,
      maxlength: 5,
      errorMsg: "Please provide a valid postcode.",
      example: "1234",
      value: "",
      isValid: false,
      required: true
    }
  },
  select: {
    state: {
      id: "state",
      label: "State",
      re: /^\w+/,
      maxlength: 10,
      errorMsg: "Please select a state.",
      options: states,
      value: "",
      isValid: false,
      required: true
    }
  }
};
