export const DiscountPointFields = {
  number: {
    point: {
      id: "point",
      label: "Point ($)",
      hint:
        "The value, in dollars, of the cart that if exceeded that the discount will be applied",
      errorMsg: "Needs to be a number greater than or equal to 0",
      example: "99.99",
      value: undefined,
      isValid: false,
      required: false,
      step: 0.01,
      min: 0
    },
    discount: {
      id: "discount",
      label: "Discount (%)",
      hint:
        "The percentage discount to be applied to an order once the value point is exceeded. For free shipping then set to 100%",
      errorMsg: "Needs to be a number between 0 or 100 inclusive",
      example: "100",
      value: undefined,
      isValid: false,
      required: false,
      step: 0.01,
      min: 0,
      max: 100
    }
  }
};
