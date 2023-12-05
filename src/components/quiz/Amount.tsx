"use client";
import React, { ChangeEvent } from "react";
import { useFilters } from "@/globalStates/config";

function Amount() {
  const { amount, setQuestionAmount } = useFilters((state) => state);
  function chooseAmount(event: ChangeEvent<HTMLInputElement>) {
    if (Number(event.target.value) > 50 || Number(event.target.value) < 1) {
      setQuestionAmount(5);
    } else {
      setQuestionAmount(Number(event.target.value));
    }
  }

  return (
    <div className="flex flex-col" id="top">
      <label>Quantidade</label>
      <input
        className="text-black px-2 py-1 rounded-md"
        type="number"
        min={1}
        max={50}
        value={amount}
        onChange={chooseAmount}
      />
      <span className="text-red-600">Entre 1 e 50</span>
    </div>
  );
}

export default Amount;
