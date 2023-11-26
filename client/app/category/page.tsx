"use client";
import React, { useEffect, useState } from "react";
import { TaskType, Tasks } from "../task/page";
import { sample_tasks_data } from "../task/sample-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import TaskComponent, { MiniTaskComponent } from "@/components/task";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sample_categories_data } from "./sample-data";
import CategoryComponent from "@/components/category";

import { ScrollArea } from "@/components/ui/scroll-area";

export type Category = {
  id: number;
  name: string;
  color: string;
  processing?: number;
  finished?: number;
};

function Category() {
  return (
    <div className="pt-8 px-12 space-y-6 h-4/5">
      <div className="flex flex-row justify-between items-center">
        <div className="text-4xl">Category</div>
        <div>
          <Button>Create</Button>
        </div>
      </div>
      <ScrollArea className="h-full">
        <div
          className="flex flex-row flex-wrap gap-12"
          style={{ columnGap: "10%" }}
        >
          {sample_categories_data.map((category) => (
            <CategoryComponent category={category} key={category.id} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default Category;
