"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useRef, useState } from "react";
import { sample_tasks_data } from "./sample-data";
import { Button } from "@/components/ui/button";
import TaskComponent from "@/components/task";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectLabel } from "@radix-ui/react-select";
import { DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateTaskModal } from "@/components/modal/createTaskModal.jsx";
import { DetailTaskModal } from "@/components/modal/detailTaskModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "@/redux/taskSlice";
import { AppDispatch, RootState } from "@/redux/store";

export type TaskType = {
  _id: number;
  name: string;
  start_day: string;
  end_day: string;
  color: string;
  description: string;
  user_id: number;
  category_id: number;
  status: number;
  priority: number;
  createdAt: string;
  updatedAt: string;
};

export type Tasks = TaskType[];

function Task() {
  // const [tasks, setTasks] = useState<Tasks>();

  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (error) {
    toast.error(error);
  }

  console.log(data);

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
              {data.length > 0 &&
                data
                  .filter((task: TaskType) => task.status === 1)
                  .map((task: TaskType) => (
                    <DetailTaskModal key={task._id} task={task}>
                      <DialogTrigger asChild>
                        <span className="block cursor-pointer">
                          <TaskComponent task={task} />
                        </span>
                      </DialogTrigger>
                    </DetailTaskModal>
                  ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="doing" className="h-full">
          <ScrollArea className="h-full">
            <div className="space-y-6">
              {data.length > 0 &&
                data
                  .filter((task: TaskType) => task.status === 2)
                  .map((task: TaskType) => (
                    <DetailTaskModal key={task._id} task={task}>
                      <DialogTrigger asChild>
                        <span className="block cursor-pointer">
                          <TaskComponent task={task} />
                        </span>
                      </DialogTrigger>
                    </DetailTaskModal>
                  ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="done" className="h-full">
          <ScrollArea className="h-full">
            <div className="space-y-6">
              {data.length > 0 &&
                data
                  .filter((task: TaskType) => task.status === 3)
                  .map((task: TaskType) => (
                    <DetailTaskModal key={task._id} task={task}>
                      <DialogTrigger asChild>
                        <span className="block cursor-pointer">
                          <TaskComponent task={task} />
                        </span>
                      </DialogTrigger>
                    </DetailTaskModal>
                  ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Task;
