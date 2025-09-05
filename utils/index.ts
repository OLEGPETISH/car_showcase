import { CarProps, FiltersProps } from "@/types";

// Новый fetchCars через vpic API
export async function fetchCars(filters: FiltersProps) {
  const { manufacturer, year, fuel, limit, model } = filters;

  // Получаем модели Porsche (можно заменить manufacturer на динамический)
  const modelsRes = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${manufacturer || "porsche"}?format=json`
  );

  if (!modelsRes.ok) {
    throw new Error(`Ошибка API: ${modelsRes.status}`);
  }

  const modelsData = await modelsRes.json();
  const models = modelsData.Results.slice(0, limit || 10);

  // Один пример VIN (чтобы получить характеристики)
  const vinExample = "3VWFE21C04M000001";
  const vinRes = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vinExample}?format=json`
  );

  if (!vinRes.ok) {
    throw new Error(`Ошибка API VIN: ${vinRes.status}`);
  }

  const vinData = await vinRes.json();
  const vinInfo = vinData.Results[0];

  // Фиксированные года
  const fixedYears = [
    1995, 1998, 2001, 2004, 2007,
    2010, 2012, 2014, 2016, 2017,
    2018, 2019, 2020, 2021, 2022
  ];

  // Преобразуем в формат CarProps
  const enriched: CarProps[] = models.map((m: any, index: number) => ({
    make: m.Make_Name,
    model: m.Model_Name,
    year: year || fixedYears[index % fixedYears.length],
    fuel_type: vinInfo.FuelTypePrimary || "Gasoline",
    transmission: vinInfo.TransmissionStyle?.toLowerCase().includes("manual") ? "m" : "a",
    drive: "awd",
    city_mpg: 20, // тестовое значение
  }));

  return enriched;
}

// считаем аренду на основе года и двигателя
export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");

  const make = car.make.toLowerCase();       // "porsche"
  const model = car.model.split(" ")[0].toLowerCase(); // "911" вместо "911 Carrera"

  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${car.year}`);

  if (angle) url.searchParams.append("angle", angle);

  return url.toString();
};


export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathname;
};
