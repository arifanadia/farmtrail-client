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
declare module "react-rating" {
  import React from "react";

  interface RatingProps {
    initialRating?: number;
    readonly:true;
    emptySymbol:Element
    fullSymbol:Element
  }

  const Rating: React.FC<RatingProps>;

  export default Rating;
}
declare module 'react-range-slider-input' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}


declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
export interface Product {
  id: number;
  productName: string;
  mainPrice: number;
  offerPrice : number
  description: string;
  images: string;
  category: string;
  gramToPrice : object;
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}
