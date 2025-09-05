"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import CustomFilter from "@/components/CustomFilter";
import CarCard from "@/components/CarCard";
import { ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";

export default function Home() {
  const searchParams = useSearchParams();

  const [allCars, setAllCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // читаем параметры из URL
  const { manufacturer, model, fuel, year, limit } = useMemo(() => {
    return {
      manufacturer: searchParams.get("manufacturer") || "porsche",
      model: searchParams.get("model") || "",
      fuel: searchParams.get("fuel") || "",
      year: Number(searchParams.get("year")) || 2022,
      limit: Number(searchParams.get("limit")) || 6,
    };
  }, [searchParams]);

  // получаем машины при изменении фильтров
  useEffect(() => {
    const getCars = async () => {
      setLoading(true);
      try {
        const result = await fetchCars({
          manufacturer,
          model,
          fuel,
          year,
          limit,
        });

        setAllCars(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Ошибка загрузки машин:", error);
        setAllCars([]);
      } finally {
        setLoading(false);
      }
    };

    getCars();
  }, [manufacturer, model, fuel, year, limit]);

  const isDataEmpty = allCars.length === 0;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore cars you might like</p>
        </div>

        {/* Фильтры */}
        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {/* Секция карточек */}
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars.map((car, index) => (
                <CarCard key={index} car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={Math.ceil(limit / 10)}
              isNext={limit < 30}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">
              {loading ? "Loading..." : "Oops, no results"}
            </h2>
            {!loading && <p>Try changing filters</p>}
          </div>
        )}
      </div>
    </main>
  );
}
