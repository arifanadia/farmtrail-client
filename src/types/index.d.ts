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
import * as React from "react";

export interface SliderProps {
  disabled?: boolean | undefined;
  format?: ((value: number) => string | number | undefined) | undefined;
  handleLabel?: string | undefined;
  labels?: { [value: number]: string } | undefined;
  max?: number | undefined;
  min?: number | undefined;
  onChange?(value: number): void;
  onChangeComplete?(value: number): void;
  onChangeStart?(value: number): void;
  orientation?: string | undefined;
  reverse?: boolean | undefined;
  step?: number | undefined;
  tooltip?: boolean | undefined;
  className?: string | undefined;
  value: number;
}

export default class Slider extends React.Component<SliderProps> {}

declare module "react-rating" {
  import React from "react";

  interface RatingProps {
    initialRating?: number;
    readonly: true;
    emptySymbol: Element;
    fullSymbol: Element;
  }

  const Rating: React.FC<RatingProps>;

  export default Rating;
}

export interface Product {
  id: number;
  productName: string;
  mainPrice: number;
  offerPrice: number;
  description: string;
  images: string;
  category: string;
  gramToPrice: object;
  createdAt: string;
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  totalProducts?: number;
  currentPage?: number ;
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  search?: string;
  priceRange?: string ;
  category?: string;
}
