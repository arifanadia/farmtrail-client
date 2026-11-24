declare module "typewriter-effect/dist/core" {
  export default class Typewriter {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(element: HTMLElement, options?: any);
    typeString(string: string): Typewriter;
    start(): Typewriter;
    stop(): Typewriter;
    pauseFor(duration: number): Typewriter;
    deleteAll(): Typewriter;
    deleteChars(count: number): Typewriter;
    changeDelay(newDelay: number): Typewriter;
  }
}

declare module "react-range-slider-input" {
  import React from "react";

  interface RangeSliderProps {
    id?: string;
    min?: number;
    max?: number;
    step?: number;
    value?: [number, number];
    onInput?: (value: [number, number]) => void;
    className?: string;
  }

  const RangeSlider: React.FC<RangeSliderProps>;

  export default RangeSlider;
}

declare module "react-rating" {
  import React from "react";

  interface RatingProps {
    initialRating?: number;
    readonly?: boolean;
    emptySymbol?: React.ReactNode;
    fullSymbol?: React.ReactNode;
  }

  const Rating: React.FC<RatingProps>;

  export default Rating;
}
