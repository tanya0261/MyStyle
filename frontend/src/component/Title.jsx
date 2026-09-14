import React from "react";

function Title({ text1, text2 }) {
  return (
    <div className="text-center mb-6 md:mb-8">
      <h2
        className="
        text-2xl
        sm:text-4xl
        md:text-5xl
        font-bold
        leading-tight
        text-[#2F1E1A]
        "
      >
        {text1}{" "}
        <span className="text-[#D88770]">
          {text2}
        </span>
      </h2>

      <div
        className="
        w-16
        sm:w-20
        md:w-24
        h-1
        bg-[#D88770]
        mx-auto
        mt-3
        md:mt-4
        rounded-full
        "
      ></div>
    </div>
  );
}

export default Title;