"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import apiClient from "@/api/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { toast } from "react-toastify";
import { fetchTasks } from "@/redux/taskSlice";
import { fetchCategories } from "@/redux/categoriesSlice";

function Setting() {
  const responseGoogle = async () => {
    const res = await apiClient.get("/tasks/auth-google");
    const resData = await res.data;
    window.location.replace(resData);
  };

  const { data } = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const dispatch = useDispatch<AppDispatch>();

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  useEffect(() => {
    const asyncFunc = async () => {
      if (code && data?._id) {
        const res = await apiClient.get("/tasks/google-task" + "?code=" + code);
        const resData = await res.data;
        setTasks(resData);
        window.history.pushState({ a: 1 }, "Page", "/setting"); // return to /setting
        setOpen(true);
      }
    };
    asyncFunc();
  }, [data?._id, code]);

  const handleAddBulkTask = async () => {
    if (tasks.length === 0) return;

    try {
      const taskClean = tasks.map((item) => {
        return {
          name: item.summary,
          start_day: item.start.dateTime,
          end_day: item.end.dateTime,
          color: "green",
          description: item.description,
          status: 1,
          priority: 1,
        };
      });
      // const taskClean = tasks;
      // console.log(taskClean);

      function makeid(length) {
        let result = "";
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
          counter += 1;
        }
        return result;
      }

      const categoryName = "CATEGORY-" + makeid(5);
      const res = await apiClient.post(`tasks/createBulk/${categoryName}`, {
        tasks: taskClean,
      });

      const resData = await res.data;

      if (resData.code === "20100") {
        toast.success("Addition was successful!");
        dispatch(fetchTasks());
        dispatch(fetchCategories());
      }
    } catch (error) {
      console.log(error?.message);
      toast.error("Something is happening!");
    }
  };

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            {" "}
            <AlertDialogTitle>Task Synchronization</AlertDialogTitle>{" "}
            <AlertDialogDescription>
              {" "}
              {tasks.length > 0 && (
                <div>
                  <b className="text-lg">{tasks.length}</b>
                  Would you like to add?
                </div>
              )}
              {tasks.length === 0 && `There are no tasks!`}
            </AlertDialogDescription>{" "}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-400"
              onClick={handleAddBulkTask}
            >
              Add
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <h1 className="text-5xl p-5">Setting</h1>
      <div className="flex flex-col justify-center items-center pt-4 pb-6 ">
        <p className="text-lg font-bold ">
          Schedule work from other calendars
          <br />
          Sync modules:
        </p>
        <div className="flex flex-row justify-between items-center pt-4">
          <img
            className="w-20 h-20 mr-5"
            src="https://i.pinimg.com/originals/6e/09/90/6e099088b3deb805b68d83676af6f067.png"
          />
          <Button
            className="bg-blue-500 font-semibold"
            onClick={async () => await responseGoogle()}
          >
            Sync 🚀
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Setting;
