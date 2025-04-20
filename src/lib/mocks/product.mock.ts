import { IProductResponse } from "@/lib/types";

export const PRODUCTS_MOCK: IProductResponse = {
  total: 10,
  page: 1,
  countOfPages: 2,
  limit: 5,
  result: [
    {
      id: "1",
      fullName:
        "Сидр сортовой газированный полусухой «Восстание против пепина» 20.0 л.",
      shortName: "Восстание против пепина",
      gtin: "04680089900321",
      alcoholCode: "0300005753630000035",
      pictureUrl:
        "https://online.sbis.ru/previewer/r/208/208/disksharedrest/d28017dc-735d-42b5-880a-6f8585676bbc",
      volume: 20,
      expirationInDays: 186,
      status: "active",
    },
    {
      id: "2",
      fullName:
        'Сидр фруктовый ароматизированный нефильтрованный пастеризованный газированный жемчужный полусухой "ТАЙМ КИЛЛА КОНОПЛЯНЫЙ" 0.33 л.',
      shortName: "ТАЙМ КИЛЛА КОНОПЛЯНЫ",
      gtin: "04680089900345",
      alcoholCode: "0300005753630000036",
      pictureUrl:
        "https://online.sbis.ru/previewer/r/208/208/disksharedrest/2ccff5d8-1a04-4769-bf57-1b8b47b6c78e",
      volume: 0.33,
      expirationInDays: 1095,
      status: "inactive",
    },
    {
      id: "3",
      fullName:
        "Сидр сортовой газированный полусухой «Восстание против пепина» 0.45 л.",
      shortName: "Восстание против пепина",
      gtin: "04680089900413",
      alcoholCode: "0300005753630000026",
      pictureUrl:
        "https://online.sbis.ru/previewer/r/208/208/disksharedrest/703910d3-9bc9-4fa2-9e96-fd202f898af0",
      volume: 0.45,
      expirationInDays: 365,
      status: "paused",
    },
    {
      id: "4",
      fullName:
        'Сидр фруктовый газированный жемчужный фильтрованный пастеризованный полусухой "МАЙ МИШЕЛ РОЗЕ" 0.75 л.',
      shortName: "МАЙ МИШЕЛ РОЗЕ",
      gtin: "04680089900383",
      alcoholCode: "0300005753630000027",
      pictureUrl:
        "https://online.sbis.ru/previewer/r/208/208/disksharedrest/ac23a460-dc22-4af8-a41b-bdfaad409665",
      volume: 0.75,
      expirationInDays: 365,
      status: "registration",
    },
    {
      id: "5",
      fullName: 'Сидр сухой газированный "Дикий Крест" 0.45 л.',
      shortName: "Дикий Крест",
      gtin: "04680089900024",
      alcoholCode: "0300005753630000029",
      pictureUrl:
        "https://online.sbis.ru/previewer/r/208/208/disksharedrest/2d916b0a-9d7b-45e9-afb8-eca31b013580",
      volume: 0.45,
      expirationInDays: 730,
      status: "archived",
    },
  ],
};
