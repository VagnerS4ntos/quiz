"use client";
import React from "react";
import { useFilters } from "@/globalStates/config";

function Type() {
  const { type, setType } = useFilters((state) => state);

  return (
    <div>
      <label className="block mb-1">Tipo</label>
      <select
        className="text-black px-2 py-1 rounded-md w-full"
        value={type}
        onChange={({ target }) => setType(target.value)}
      >
        <option value={""}>Any Type</option>
        <option value={"multiple"}>Multiple Choice</option>
        <option value={"boolean"}>True / False</option>
      </select>
    </div>
  );
}

export default Type;
