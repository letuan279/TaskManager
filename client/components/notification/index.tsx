"use client";
import * as React from "react";
import { Bell, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import moment from "moment";
import { DateTimePicker } from "../ui/date-time-picker";
import { Input } from "../ui/input";
export default function Notification() {
  const { data } = useSelector((state: RootState) => state.tasks);
  const categories = useSelector((state: RootState) => state.categories);
  const [dates, setDates] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [task, setTask] = React.useState(null);
  const colors = ["red", "green", "blue", "yellow", "purple", "pink"];

  const handleDetailModal = (task) => {
    setTask(task);
    setOpenModal(true);
  };

  const handleOpen = () => {
    setOpen((value) => !value);
  };

  React.useEffect(() => {
    const current = new Date();
    const date = data.filter((item) => {
      const specificTime = new Date(item.start_day);
      const diffInMilliseconds = specificTime.getTime() - current.getTime();
      const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

      if (diffInHours > 0 && diffInHours <= 24) return true;
      return false;
    });
    const dateFiltered = date
      .map((item) => {
        let message = "";
        const specificTime = new Date(item.start_day);
        const diffInMilliseconds = specificTime.getTime() - current.getTime();
        const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
        if (diffInHours <= 10 && parseInt(diffInHours) !== 0) {
          message = `Starts in ${parseInt(diffInHours)} hours`;
        } else if (parseInt(diffInHours) === 0) {
          message = "It's starting soon";
        } else message = "Starts in a day";

        return {
          ...item,
          diffInHours,
          message,
          time: moment(current).format("YYYY/MM/DD hh:mm:ss"),
        };
      })
      .sort((a, b) => a.diffInHours - b.diffInHours);
    setDates(dateFiltered);
  }, [data]);

  return (
    <>
      <Popover open={open} onOpenChange={handleOpen}>
        <PopoverTrigger>
          <div style={{ position: "relative" }}>
            <Bell size={25} />
            {dates.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "14px",
                }}
              >
                {dates.length}
              </div>
            )}
          </div>
        </PopoverTrigger>
        <div style={{ left: "-10px" }}>
          <PopoverContent sideOffset={4} align="left">
            <div>
              {dates.map((task, index) => (
                <div
                  key={task.name + index}
                  className="py-3 px-2 bg-gray-300 my-2 hover:cursor-pointer hover:bg-gray-200 rounded-md"
                  onClick={() => handleDetailModal(task)}
                >
                  <div className="flex flex-row justify-between">
                    <p className="font-bold">{task.name}</p>
                    <p className="font-light text-xs italic">{task.time}</p>
                  </div>
                  <p className="mt-2">{task.message}</p>
                </div>
              ))}
            </div>
          </PopoverContent>
        </div>
      </Popover>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="sm:max-w-[65%]">
          <DialogHeader>
            <DialogTitle>Task detail</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-6">
            <Input
              color="blue"
              label="Task title"
              value={task?.name}
              disabled="True"
            />

            <div className="flex flex-row gap-5">
              <div>
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  priority
                </label>
                <form className="flex items-center w-1/3 gap-x-5">
                  <div className="flex-1">
                    <input
                      className="sr-only peer"
                      id="radio_1"
                      type="radio"
                      name="priority"
                      disabled="True"
                      checked={task?.priority === 1}
                    />
                    <label
                      className="flex flex-col h-10 w-24 border-2 border-red-500 text-red-500 cursor-pointer rounded-full justify-center items-center  peer-checked:ring-red-500 peer-checked:bg-red-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:text-white"
                      htmlFor="radio_1"
                    >
                      <span className="text-xs font-bold uppercase">high</span>
                    </label>
                  </div>
                  <div className="flex-2">
                    <input
                      className="sr-only peer"
                      id="radio_2"
                      type="radio"
                      name="priority"
                      disabled="True"
                      checked={task?.priority === 2}
                    />
                    <label
                      className="flex flex-col h-10 w-24 border-2 border-yellow-600 text-yellow-600 cursor-pointer rounded-full justify-center items-center  peer-checked:ring-yellow-600 peer-checked:bg-yellow-600 peer-checked:ring-2 peer-checked:border-transparent peer-checked:text-white"
                      htmlFor="radio_2"
                    >
                      <span className="text-xs font-bold uppercase">
                        normal
                      </span>
                    </label>
                  </div>
                  <div className="flex-3">
                    <input
                      className="sr-only peer"
                      id="radio_3"
                      type="radio"
                      name="priority"
                      disabled="True"
                      checked={task?.priority === 3}
                    />
                    <label
                      className="flex flex-col h-10 w-24 border-2 border-green-500 text-green-500 cursor-pointer rounded-full justify-center items-center  peer-checked:ring-green-500 peer-checked:bg-green-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:text-white"
                      for="radio_3"
                    >
                      <span className="text-xs font-bold uppercase">low</span>
                    </label>
                  </div>
                </form>
              </div>
              <div className="">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  disabled
                  id="countries"
                  className="border border-blue-gray-200 text-blue-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-200 p-2.5 pr-72 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>
                    {
                      categories.data.filter(
                        (item) => item._id === task?.category
                      )[0]?.name
                    }
                  </option>
                </select>
              </div>
            </div>
            <div className="flex flex-row gap-5">
              <div>
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Start date
                </label>
                <DateTimePicker
                  value={{ date: new Date(task?.start_day), hasTime: true }}
                  isDisabled
                />
              </div>
              <div>
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  End date
                </label>
                <DateTimePicker
                  value={{ date: new Date(task?.end_day), hasTime: true }}
                  isDisabled
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <div
                dangerouslySetInnerHTML={{ __html: task?.description }}
              ></div>
            </div>
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Color
              </label>
              <form className="flex items-center w-1/3 gap-x-5">
                {colors.map((color, i) => (
                  <div className="flex-6" key={i}>
                    <input
                      className="sr-only peer"
                      id={color}
                      type="radio"
                      name="color"
                      checked={color === task?.color}
                    />
                    <label
                      className={`flex flex-col h-10 w-10 border-2 bg-${color}-500 border-${color}-500 text-${color}-500 cursor-pointer rounded-full justify-center items-center  peer-checked:ring-${color}-500 peer-checked:bg-${color}-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:text-white`}
                      htmlFor={color}
                    >
                      <Check />
                    </label>
                  </div>
                ))}
              </form>
            </div>
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
