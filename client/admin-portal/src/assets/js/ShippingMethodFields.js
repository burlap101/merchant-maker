export const ShippingMethodFields = {
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
  textArea: {
    description: {
      id: "description",
      label: "Description",
      re: /[A-Za-z]/,
      maxLength: 1024,
      errorMsg: "Needs to contain one or more letters",
      hint:
        "A description to remind yourself and other admins what the shipping method includes.",
      example:
        "Flat-rate shipping which is applied per order not per item. Discounts are added at order values over $100 (50%) and $200 (free or 100%)",
      value: "",
      isValid: false,
      required: true
    }
  },
  number: {
    cost: {
      id: "cost",
      label: "Cost ($)",
      hint:
        "The price per item or cart, depending on the shipping type selected, that will be charged to the customer.",
      example: "19.95",
      value: undefined,
      isValid: false,
      required: true,
      step: 0.01,
      min: 0
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
  }
};
