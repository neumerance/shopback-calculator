const fetch = require("node-fetch");

const buildUrl = (url, parameters) => {
  let qs = "";
  for (const key in parameters) {
    if (parameters.hasOwnProperty(key)) {
      const value = parameters[key];
      qs +=
        encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
    }
  }
  if (qs.length > 0) {
    qs = qs.substring(0, qs.length - 1); //chop off last "&"
    url = url + "?" + qs;
  }

  return url;
}

class ExchangeRate {
  async getExchangeRate(base, target) {
    const url = buildUrl('https://api.exchangeratesapi.io/latest', {
      base: base,
      symbols: target
    });
    const response = await fetch(url)
    const data = await response.json();
    return data;
  }
}

export default ExchangeRate;
