export const productFields = {
  /* Define the fields corresponding to text HTML input fields */
  text: {
    name: {
      id: "name",
      label: "Name",
      re: /[A-Za-z]/,
      maxLength: 255,
      errorMsg: "Needs to contain one or more letters",
      hint: "The product's name",
      example: "Combobulator",
      value: "",
      isValid: false,
      required: true
    },
    stockCode: {
      id: "stockCode",
      label: "Stock Code",
      re: /[0-9A-Za-z]/,
      maxLength: 256,
      errorMsg: "Needs to contain one or more letters or digits",
      hint: "A code that you may want to designate your product",
      example: "COMB001",
      value: "",
      isValid: false,
      required: false
    },
    uom: {
      id: "uom",
      label: "Unit of Measure",
      re: /[A-Za-z]/,
      maxLength: 256,
      errorMsg: "Needs to contain one or more letters",
      hint: "The unit of measure you are selling your product",
      example: "'each', 'm', 'box of 12'",
      value: "",
      isValid: false,
      required: true
    }
  },
  /* Define the fields corresponding to textarea HTML input fields */
  textArea: {
    description: {
      id: "description",
      label: "Description",
      re: /[A-Za-z]/,
      maxLength: 1024,
      errorMsg: "Needs to contain one or more letters",
      hint: "A short description of the product",
      example: "This product combobulates whatever you want!",
      value: "",
      isValid: false,
      required: true
    }
  },
  /* Define the fields corresponding to number HTML input fields */
  number: {
    price: {
      id: "price",
      label: "Price",
      hint: "The price per 'unit of measure' you are selling this product for",
      errorMsg: "Needs to be a number greater than or equal to 0",
      example: "1045.95",
      value: undefined,
      isValid: false,
      required: true
    },
    available: {
      id: "available",
      label: "Available",
      hint:
        "The amount of this product you can deliver or have in stock for example. If not required (i.e. never running out of stock) then set this to -1.",
      errorMsg:
        "Needs to be value greater than or equal to 0 or can be -1 (signalling infinite supply)",
      example: "101",
      value: undefined,
      isValid: false,
      required: true
    }
  }
};
