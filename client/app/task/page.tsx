"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { sample_tasks_data } from "./sample-data";
import { Button } from "@/components/ui/button";
import TaskComponent from "@/components/task";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogTrigger } from "@/components/ui/dialog";
import { SelectLabel } from "@radix-ui/react-select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateTaskModal } from "@/components/modal/createTaskModal.jsx";

export type TaskType = {
  id: number;
  name: string;
  start_day: string;
  end_day: string;
  color: string;
  user_id: number;
  category_id: number;
  status: number;
  priority: number;
};

type Tasks = {
  todo: TaskType[];
  doing: TaskType[];
  done: TaskType[];
};

function Task() {
  const [tasks, setTasks] = useState<Tasks>();

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleOpenCreateModal = () => setOpenCreateModal(!openCreateModal);

  useEffect(() => {
    async function getTasks() {
      const data: Tasks = {
        todo: [],
        doing: [],
        done: [],
      };
      sample_tasks_data.forEach((task) => {
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
      });

      setTasks(data);
    }

    getTasks();
  }, []);

  console.log(tasks);

  return (
    <div className="pt-8 px-12 space-y-6 h-4/6">
      <div className="text-4xl">TASK</div>
      <Tabs defaultValue="todo" className="space-y-8 h-full">
        <div className="h-fit flex flex-row justify-between items-center">
          <TabsList>
            <TabsTrigger value="todo">To do</TabsTrigger>
            <TabsTrigger value="doing">Doing</TabsTrigger>
            <TabsTrigger value="done">Done</TabsTrigger>
          </TabsList>
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
            <CreateTaskModal>
              <DialogTrigger asChild>
                <Button>Create</Button>
              </DialogTrigger>
            </CreateTaskModal>
          </div>
        </div>
        <TabsContent value="todo" className="h-full">
          <ScrollArea className="h-full">
            <div className="space-y-6">
              {tasks?.todo.map((task) => (
                <TaskComponent task={task} key={task.id} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="doing" className="h-full">
          <ScrollArea className="h-full">
            <div className="space-y-6">
              {tasks?.doing.map((task) => (
                <TaskComponent task={task} key={task.id} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="done" className="h-full">
          <ScrollArea className="h-full">
            <div className="space-y-6">
              {tasks?.done.map((task) => (
                <TaskComponent task={task} key={task.id} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Task;
