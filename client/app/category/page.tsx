import { Button } from "@/components/ui/button";
import React from "react";
import { sample_categories_data } from "./sample-data";
import CategoryComponent from "@/components/category";

export type Category = {
  id: number;
  name: string;
  color: string;
  processing?: number;
  finished?: number;
};

function Category() {
  return (
    <div className="pt-8 px-12 space-y-6 h-4/6">
      <div className="flex flex-row justify-between items-center">
        <div className="text-4xl">Category</div>
        <div>
          <Button>Create</Button>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-12 justify-between">
        {sample_categories_data.map((category) => (
          <CategoryComponent category={category} key={category.id} />
        ))}
      </div>
    </div>
  );
}

export default Category;
