import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input, Typography } from "@material-tailwind/react";
import Category from "../../app/category/page";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import FroalaEditorComponent from "react-froala-wysiwyg";
import { Check } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { DateTimePicker } from "../ui/date-time-picker";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "@/redux/taskSlice";
import { toast } from "react-toastify";

export function CreateTaskModal({ children }) {
  const [start_day, setStart_day] = React.useState(new Date());
  const [end_day, setEnd_day] = React.useState(new Date());
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [priority, setPriority] = React.useState();
  const [description, setDescription] = React.useState("");
  const [color, setColor] = React.useState("");
  const colors = ["red", "green", "blue", "yellow", "purple", "pink"];

  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.categories
  );

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  const handleClearData = () => {
    setStart_day(new Date())
    setEnd_day(new Date())
    setName("")
    setCategory("")
    setPriority("")
    setDescription("")
    setColor("")
  }

  const handleColorChange = (e) => {
    setColor(e.target.id);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSendData = () => {
    dispatch(addTask({
      name,
      category,
      priority,
      start_day: start_day.date.toISOString(),
      end_day: end_day.date.toISOString(),
      description,
      color,
    })).unwrap()
    .then(() => {
      toast.success("Create task successfully!");
    })
    .catch((error) => {
      toast.error(error.message || "Something was wrong!");
    });
  };


  return (
    <Dialog onOpenChange={handleClearData}>
      {children}
      <DialogContent className="sm:max-w-[65%]">
        <DialogHeader>
          <DialogTitle>New task</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <Input
            color="blue"
            label="Task title"
            onChange={(e) => setName(e.target.value)}
            className="w-[100px]"
          />
          <div className="flex flex-row">
            <div className="w-1/2">
              <label
                for="countries"
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
                    onChange={() => handlePriorityChange(1)}
                  />
                  <label
                    className="flex flex-col h-10 w-24 border-2 border-red-500 text-red-500 cursor-pointer rounded-full justify-center items-center  peer-checked:ring-red-500 peer-checked:bg-red-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:text-white"
                    for="radio_1"
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
                    onChange={() => handlePriorityChange(2)}
                  />
                  <label
                    className="flex flex-col h-10 w-24 border-2 border-yellow-600 text-yellow-600 cursor-pointer rounded-full justify-center items-center  peer-checked:ring-yellow-600 peer-checked:bg-yellow-600 peer-checked:ring-2 peer-checked:border-transparent peer-checked:text-white"
                    for="radio_2"
                  >
                    <span className="text-xs font-bold uppercase">normal</span>
                  </label>
                </div>
                <div className="flex-3">
                  <input
                    className="sr-only peer"
                    id="radio_3"
                    type="radio"
                    name="priority"
                    onChange={() => handlePriorityChange(3)}
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
            <div className="w-1/2">
              <label
                for="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                id="countries"
                className=" border border-blue-gray-200 text-blue-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-200 p-2.5 pr-72 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={category}
                onChange={handleCategoryChange}
                placeholder="Enter category"
              >
                {categories.data.map(item => (
                  <option selected={false} value={item._id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-1/2">
              <label
                for="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Start date
              </label>
              <DateTimePicker value={start_day} onChange={(e) => setStart_day(e)}/>
            </div>
            <div className="w-1/2">
              <label
                for="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                End date
              </label>
              <DateTimePicker value={end_day} onChange={(e) => setEnd_day(e)}/>
            </div>
          </div>
          <div>
            <label
              for="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <FroalaEditorComponent
              tag="textarea"
              config={{
                placeholderText: "Enter the description",
              }}
              model={""}
              onModelChange={(newModel) => {
                setDescription(newModel);
              }}
            />
          </div>
          <div>
            <label
              for="countries"
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
                      onChange={handleColorChange}
                    />
                    <label
                      className={`flex flex-col h-10 w-10 border-2 bg-${color}-500 border-${color}-500 text-${color}-500 cursor-pointer rounded-full justify-center items-center  peer-checked:ring-${color}-500 peer-checked:bg-${color}-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:text-white`}
                      for={color}
                    >
                      <Check />
                    </label>
                  </div>
                ))}
            </form>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
              <Button
                type="submit"
                className="bg-white text-red-500 rounded-full border-red-500 border-2 mr-6"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-500 text-white rounded-full border-purple-500"
                onClick={handleSendData}
              >
                Add
              </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
