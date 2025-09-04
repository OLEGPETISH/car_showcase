"use client";


import React from "react";

type CustomFilterProps = {
  title: string;
};

const CustomFilter: React.FC<CustomFilterProps> = ({ title }) => {
  return (
    <div className="p-2 border rounded">
      <h3 className="text-lg font-medium">{title}</h3>
    </div>
  );
};

export default CustomFilter;
