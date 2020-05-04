const states = ["NSW", "QLD", "ACT", "VIC", "NT", "SA", "WA", "TAS"];

export const CoreFields = {
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
      re: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // eslint-disable-line
      maxLength: 255,
      errorMsg: "Please provide a valid email address",
      hint:
        "An email address where we can send your receipt and any followup details.",
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
    }
  }
};
