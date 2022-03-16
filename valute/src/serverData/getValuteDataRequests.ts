export async function getTodayValuteData() {
  const valuteResponse: Response = await fetch(
    "https://www.cbr-xml-daily.ru/daily_json.js"
  );
  const valuteData = await valuteResponse.json();

  console.log(valuteData);
}
