"use client";
import React from "react";

const BtnTest = () => {
  return (
    <button
      type="button"
      onClick={async () => {
        const res = await fetch("http://localhost:3000/api/pets", {
          method: "POST",
          body: JSON.stringify({
            name: "test",
            owner: "test",
          }),
        }).then((res) => res.json());
        console.log(res);
      }}
    >
      test
    </button>
  );
};

export default BtnTest;
