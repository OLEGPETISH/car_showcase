"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import SearchManufacturer from "./SearchManufacturer";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`ml-2 z-10 ${otherClasses}`}>
    <Image 
      src="/magnifying-glass.svg"
      alt="magnifying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [manufacturer, setManufacturer] = useState(searchParams.get("manufacturer") || "");
  const [model, setModel] = useState(searchParams.get("model") || "");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!manufacturer && !model) return alert("Please fill in the search bar");

    const params = new URLSearchParams();
    if (model) params.set("model", model.toLowerCase());
    if (manufacturer) params.set("manufacturer", manufacturer.toLowerCase());

    router.push(`?${params.toString()}`);
  };

  return (
    <form className="searchbar flex flex-wrap gap-4" onSubmit={handleSearch}>
      {/* Производитель */}
      <div className="searchbar__item flex items-center relative">
        <SearchManufacturer manufacturer={manufacturer} setManufacturer={setManufacturer} />
        <SearchButton otherClasses="sm:hidden" />
      </div>

      {/* Модель */}
      <div className="searchbar__item flex items-center relative">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute left-4 w-[20px] h-[20px]"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input pl-12"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>

      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
