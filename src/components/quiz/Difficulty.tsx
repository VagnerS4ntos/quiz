"use client";
import React from "react";
import { useFilters } from "@/globalStates/config";

function Difficulty() {
  const { difficulty, setDifficulty } = useFilters((state) => state);

  return (
    <div>
      <label className="block mb-1">Dificuldade</label>
      <select
        className="text-black px-2 py-1 rounded-md w-full"
        value={difficulty}
        onChange={({ target }) => setDifficulty(target.value)}
      >
        <option value={""}>Any Difficulty</option>
        <option value={"easy"}>Easy</option>
        <option value={"medium"}>Medium</option>
        <option value={"hard"}>Hard</option>
      </select>
    </div>
  );
}

export default Difficulty;
