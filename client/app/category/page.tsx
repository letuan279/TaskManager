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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchCategories } from "@/redux/categoriesSlice";
import { toast } from "react-toastify";
import { fetchTasks } from "@/redux/taskSlice";
import { CreateCategoryModal } from "@/components/modal/createCategoryModal";
import { DialogTrigger } from "@radix-ui/react-dialog";

export type Category = {
  _id: string;
  name: string;
  color: string;
  user: string;
  createdAt: string;
  updatedAt: string;
};

function Category() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTasks());
  }, [dispatch]);

  if (error) {
    toast.error(error);
  }

  return (
    <div className="pt-8 px-12 space-y-6 h-4/5">
      <div className="flex flex-row justify-between items-center">
        <div className="text-4xl">Category</div>
        <div>
          <CreateCategoryModal>
            <DialogTrigger asChild>
              <span className="block cursor-pointer">
                <Button>Create</Button>
              </span>
            </DialogTrigger>
          </CreateCategoryModal>
        </div>
      </div>
      <ScrollArea className="h-full">
        <div
          className="flex flex-row flex-wrap gap-12"
          style={{ columnGap: "10%" }}
        >
          {data.map((category: Category) => (
            <CategoryComponent category={category} key={category._id} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default Category;
