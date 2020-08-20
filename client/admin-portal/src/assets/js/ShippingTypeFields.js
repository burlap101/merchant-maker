export const ShippingTypeFields = {
  text: {
    name: {
      id: "name",
      label: "Name",
      re: /[A-Za-z]/,
      maxLength: 255,
      errorMsg: "Needs to contain one or more letters",
      hint: "A descriptive name to enable quick selection.",
      example: "Flat-rate",
      value: "",
      isValid: false,
      required: true
    }
  },
  boolean: {
    perProduct: {
      id: "perProduct",
      label: "Apply shipping to each product in a cart?",
      hint:
        "This determines how this shipping will be applied. If ticked, this means that if a product with this method selected will add to total cost despite other items in a user's cart. If not ticked then the shipping will be applied as a per order cost, only being charged once even if multiple products are ordered.",
      value: false,
      isValid: true
    }
  },
  textArea: {
    description: {
      id: "description",
      label: "Description",
      re: /[A-Za-z]/,
      maxLength: 1024,
      errorMsg: "Needs to contain one or more letters",
      hint: "A short description of the shipping type you are creating",
      example:
        "Flat-rate shipping is applied to each order, regardless of amount of items in the cart.",
      value: "",
      isValid: false,
      required: true
    }
  }
};
