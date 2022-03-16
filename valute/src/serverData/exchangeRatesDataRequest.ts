export async function getTodayExchangeRatesData() {
  const valuteResponse: Response = await fetch(
    "https://www.cbr-xml-daily.ru/daily_json.js"
  );
  const valuteData = await valuteResponse.json();

  console.log(valuteData);
}
