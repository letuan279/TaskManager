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

export type CategoryType = {
  id: number;
  name: string;
  color: string;
  user_id: number;
};

const category_id = 2001;

function CategoryDetail() {
  const [tasks, setTasks] = useState<Tasks>();

  useEffect(() => {
    async function getTasks() {
      const data: Tasks = {
        todo: [],
        doing: [],
        done: [],
      };
      sample_tasks_data.forEach((task) => {
        if (task.category_id == category_id) {
          switch (task.status) {
            case 1:
              data.todo = [...data.todo, task];
              break;
            case 2:
              data.doing = [...data.doing, task];
              break;
            case 3:
              data.done = [...data.done, task];
              break;
            default:
              break;
          }
        }
      });

      setTasks(data);
    }

    getTasks();
  }, []);

  return (
    <div className="pt-8 px-12 space-y-6 h-4/6">
      <div className="text-4xl">HUST</div>
      <Tabs defaultValue="todo" className="space-y-8 h-full">
        <div className="h-fit flex flex-row justify-between items-center">
          <div className="flex flex-row space-x-4">
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter..." />
              </SelectTrigger>
              <SelectContent></SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select date..." />
              </SelectTrigger>
              <SelectContent></SelectContent>
            </Select>
            <Button>Create</Button>
          </div>
        </div>
        <ScrollArea className="h-full w-1/3 inline-block">
          <div className="space-y-6">
            {tasks?.todo.map((task) => (
              <MiniTaskComponent task={task} key={task.id} />
            ))}
          </div>
        </ScrollArea>

        <ScrollArea className="h-full w-1/3 inline-block ">
          <div className="space-y-6">
            {tasks?.doing.map((task) => (
              <MiniTaskComponent task={task} key={task.id} />
            ))}
          </div>
        </ScrollArea>

        <ScrollArea className="h-full w-1/3 inline-block">
          <div className="space-y-6">
            {tasks?.done.map((task) => (
              <MiniTaskComponent task={task} key={task.id} />
            ))}
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
export default CategoryDetail;
