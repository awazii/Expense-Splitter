import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="size-48 md:size-60 lg:size-70 transition-all duration-300 ease-in-out">
        <DotLottieReact
          src="https://lottie.host/c4d1651b-8468-499a-9663-37549cac4c95/8zE1qTJ0HC.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
};