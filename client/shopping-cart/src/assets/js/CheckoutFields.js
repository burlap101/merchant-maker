const states = ["NSW", "QLD", "ACT", "VIC", "NT", "SA", "WA", "TAS"];

export const CheckoutFields = {
  text: {
    name: {
      id: "name",
      label: "Name",
      re: /[A-Za-z]+/,
      maxLength: 255,
      errorMsg: "Needs to contain one or more letters",
      hint: "Your full name",
      example: "Joe Blogs",
      value: "",
      isValid: false,
      required: true
    },
    email: {
      id: "email",
      label: "Email",
      re: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      maxLength: 255,
      errorMsg: "Please provide a valid email address",
      hint: "An email address where we can send your receipt and any followup details.",
      example: "joe@blogs.com.au",
      value: "",
      isValid: false,
      required: true
    },
    phone: {
      id: "phone",
      label: "Phone",
      re: /(^1300\d{6}$)|(^1800|1900|1902\d{6}$)|(^0[2|3|7|8]{1}[0-9]{8}$)|(^13\d{4}$)|(^04\d{2,3}\d{6}$)/,
      maxLength: 255,
      errorMsg: "Please provide a valid Australian phone number",
      example: "0412345678",
      value: "",
      isValid: false,
      required: false
    },
    shippingAddressStreet: {
      id: "shipping-address-street",
      label: "Street",
      re: /^\w+ +\w+/,
      maxlength: 255,
      errorMsg: "Please provide a valid shipping street address.",
      example: "123 Fake St",
      value: "",
      isValid: false,
      required: true
    },
    shippingAddressSuburb: {
      id: "shipping-address-suburb",
      label: "Suburb",
      re: /^\w+/,
      maxlength: 255,
      errorMsg: "Please provide a valid shipping suburb name.",
      example: "Humpty Doo",
      value: "",
      isValid: false,
      required: true
    },
    shippingAddressPostcode: {
      id: "shipping-address-postcode",
      label: "Postcode",
      re: /\d{4,5}/,
      maxlength: 5,
      errorMsg: "Please provide a valid shipping postcode.",
      example: "1234",
      value: "",
      isValid: false,
      required: true
    },
    billingAddressStreet: {
      id: "billing-address-street",
      label: "Street",
      re: /^\w+ +\w+/,
      maxlength: 255,
      errorMsg: "Please provide a valid billing street address.",
      example: "123 Fake St",
      value: "",
      isValid: false,
      required: true
    },
    billingAddressSuburb: {
      id: "billing-address-suburb",
      label: "Suburb",
      re: /^\w+/,
      maxlength: 255,
      errorMsg: "Please provide a valid billing suburb name.",
      example: "Humpty Doo",
      value: "",
      isValid: false,
      required: true
    },
    billingAddressPostcode: {
      id: "billing-address-postcode",
      label: "Postcode",
      re: /\d{4,5}/,
      maxlength: 5,
      errorMsg: "Please provide a valid billing postcode.",
      example: "1234",
      value: "",
      isValid: false,
      required: true
    }
  },
  select: {
    shippingAddressState: {
      id: "shipping-address-state",
      label: "State",
      re: /^\.+/,
      maxlength: 10,
      errorMsg: "Please select a shipping state.",
      options: states,
      isValid: false,
      required: true
    },
    billingAddressState: {
      id: "billing-address-state",
      label: "State",
      re: /^\.+/,
      maxlength: 10,
      errorMsg: "Please select a billing state.",
      options: states,
      isValid: false,
      required: true
    }
  }

  
}