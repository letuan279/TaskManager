"use client";
import React, { useEffect, useState } from "react";
import { TaskType, Tasks } from "../../task/page";
import { sample_tasks_data } from "../../task/sample-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import TaskComponent, { MiniTaskComponent } from "@/components/task";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

export type CategoryType = {
  _id: string;
  name: string;
  color: string;
  user: string;
};

const category_id = "2001";

function CategoryDetail({ params }: { params: { slug: string } }) {
  console.log("ID:::", params);
  const [category, setCategory] = useState<CategoryType>();
  const [task, setTask] = useState<TaskType[]>();

  const categories = useSelector((state: RootState) => state.categories);
  const tasks = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    const _: CategoryType = categories.data.filter(
      (item: CategoryType) => item._id === params.slug
    )[0];
    console.log(categories);

    setCategory(_);
    setTask(tasks.data.filter((item: TaskType) => item.category === _._id));
  }, [categories, categories.data, params.slug, tasks.data]);

  return (
    <div className="pt-8 px-12 space-y-6 h-4/6">
      <div className="text-4xl">{category?.name}</div>
      <Tabs defaultValue="todo" className="space-y-8 h-full">
        <div className="h-fit flex flex-row justify-between items-center">
          <div className="flex flex-row space-x-4">
            {/* <Button>Create</Button> */}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-7 place-items-stretch mt-10 m-auto">
          <div className="w-full">
            <p className="block mb-3 font-semibold text-2xl">To Do</p>
            <ScrollArea className="bg-indigo-700/50 rounded-xl">
              <div className="space-y-4 p-4">
                {task
                  ?.filter((item) => item.status === 1)
                  ?.map((task) => (
                    <MiniTaskComponent task={task} key={task._id} />
                  ))}
              </div>
            </ScrollArea>
          </div>

          <div className="w-full">
            <p className="block mb-3 font-semibold text-2xl">Doing</p>
            <ScrollArea className="bg-indigo-700/50 rounded-xl">
              <div className="space-y-4 p-4">
                {task
                  ?.filter((item) => item.status === 2)
                  ?.map((task) => (
                    <MiniTaskComponent task={task} key={task._id} />
                  ))}
              </div>
            </ScrollArea>
          </div>

          <div className="w-full">
            <p className="block mb-3 font-semibold text-2xl">Done</p>
            <ScrollArea className="bg-indigo-700/50 rounded-xl">
              <div className="space-y-4 p-4">
                {task
                  ?.filter((item) => item.status === 3)
                  ?.map((task) => (
                    <MiniTaskComponent task={task} key={task._id} />
                  ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
export default CategoryDetail;
