export const ShippingMethodFields = {
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
  }
};
