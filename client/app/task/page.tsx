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
  SelectItem,
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
import { fetchCategories } from "@/redux/categoriesSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { DatePicker } from "@/components/ui/date-picker";

export type TaskType = {
  _id: string;
  name: string;
  start_day: string;
  end_day: string;
  color: string;
  description: string;
  user: string;
  category: string;
  status: number;
  priority: number;
  createdAt: string;
  updatedAt: string;
};

export type Tasks = {
  todo: TaskType[];
  doing: TaskType[];
  done: TaskType[];
};

function Task() {
  const [filterDay, setFilterDay] = useState(null);

  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (error) {
    toast.error(error);
  }

  const handleFilterTasks = (task: TaskType) => {
    const startDate = new Date(task.start_day);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(task.end_day);
    endDate.setHours(0, 0, 0, 0);

    const currDate = filterDay;
    if (!currDate) return true;

    return (
      startDate.getTime() <= currDate.getTime() &&
      currDate.getTime() <= endDate.getTime()
    );
  };

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
            <div className="h-min">
              <DatePicker date={filterDay} setDate={setFilterDay} />
            </div>
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
                  .filter(handleFilterTasks)
                  .map((task: TaskType) => (
                    <TaskComponent key={task._id} task={task} />
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
                  .filter(handleFilterTasks)
                  .map((task: TaskType) => (
                    <TaskComponent key={task._id} task={task} />
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
                  .filter(handleFilterTasks)
                  .map((task: TaskType) => (
                    <TaskComponent key={task._id} task={task} />
                  ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Task;
