import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { IoSearchSharp } from "react-icons/io5";
  // @ts-expect-ignore
  import RangeSlider from "react-range-slider-input";
  import "react-range-slider-input/dist/style.css";
  import { useState } from "react";
  
  const RightSideMobile = () => {
    const [values, setValues] = useState<[number, number]>([100, 900]);
    const categories = [
      "All Products",
      "Berries",
      "Milk Products",
      "Fruits",
      "Vegetables",
      "Equipment",
      "Boxes and Bundles",
    ];
  
    const handleSliderChange = (newValues: [number, number]) => {
      setValues(newValues);
    };
  
    return (
      <Sheet>
        {/* Popover Trigger Button */}
        <SheetTrigger asChild>
          <Button className="px-4 py-2 outline-btn-light bg-light_green text-white ">
            Filters
          </Button>
        </SheetTrigger>
  
        {/* Popover Content */}
        <SheetContent className="w-full max-w-xs p-6 bg-black shadow-lg ">
          <div className="space-y-4 mt-6">
            {/* Search Bar */}
            <div className="relative">
              <Input
                type="search"
                placeholder="Search Products..."
                className="small-search-input"
              />
              <IoSearchSharp className="absolute text-lg font-extrabold right-4 top-1/2 transform -translate-y-1/2 text-light_green pointer-events-none" />
            </div>
  
            {/* Product Categories */}
            <div>
              <h3 className="base-bold uppercase my-4">Product Categories</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center gap-3">
                    <div className="border-y-4 border-l-2 border-r-4 border-light_green size-3"></div>
                    <h3 className="base-bold">{category}</h3>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Price Filter */}
            <div>
              <h3 className="base-bold uppercase mb-4">Filter Price</h3>
              <RangeSlider
                id="range-slider-ab"
                className="h-4 bg-gray-700"
                min={0}
                max={1000}
                step={1}
                value={values}
                onInput={handleSliderChange}
                thumbClassName="w-8 h-8 rounded"
                rangeClassName="bg-light_green"
              />
              <div className="flex-between mt-4 text-light-2 small-medium">
                <div>From ${values[0]}</div>
                <div>To ${values[1]}</div>
              </div>
              <Button className="outline-btn-light mt-4 w-full px-6 py-3 base-bold">
                Apply Filter
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  };
  
  export default RightSideMobile;
  