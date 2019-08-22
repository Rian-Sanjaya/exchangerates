export function currencyDesc(curr) {
  switch(curr) {
    case "EUR":
      return "Euro"

    case "HKD":
      return "Hong Kong Dollar"

    case "AUD":
      return "Australian Dollar"

    case "NZD":
      return "New Zealand Dollar"

    case "CZK":
      return "Czech Koruna"

    case "CAD":
      return "Canadian Dollar"

    case "IDR":
        return "Indonesian Rupiah"

    case "GBP":
      return "United Kingdom Pound"

    case "CHF":
      return "Switzerland Franc"

    case "SGD":
      return "Singapore Dollar"

    case "INR":
      return "India Rupee"

    case "MYR":
      return "Malaysia Ringgit"

    case "JPY":
      return "Japanese Yen"

    case "KRW":
      return "Korea (South) Won"

    default:
      return ""
  }
}