const baseUrl = window.location.hostname.includes("localhost:8")
  ? "/api/categories"
  : "/store/api/categories";

const noResponseMessage =
  "There was a problem communicating with the server. Please contact your administrator.";

export const CategoriesService = {
  findAll: async function() {
    let url = baseUrl;
    let res = await fetch(url);
    if (res.ok) {
      return res.json();
    } else {
      let message = undefined;
      try {
        message = (await res.json()).message;
      } catch (err) {
        throw Error(noResponseMessage);
      }
      throw Error(message + " - Code: " + res.status);
    }
  }
};
