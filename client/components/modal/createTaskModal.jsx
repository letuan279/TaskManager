import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input, Typography } from "@material-tailwind/react";
import Category from "../../app/category/page";
import { DatePicker } from "@/components/ui/date-picker.jsx";
import { Textarea } from "@/components/ui/textarea";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import FroalaEditorComponent from "react-froala-wysiwyg";
import { Check } from "lucide-react";

export function CreateTaskModal({ children }) {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  return (
    <Dialog>
      {children}
      <DialogContent className="sm:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>New task</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <Input color="blue" label="タスクのタイトル" />

          <div className="flex flex-row justify-between">
            <div>
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                priority
              </label>
              <form className="flex items-center w-1/3 gap-x-5">
                <div className="flex-1">
                  <input
                    class="sr-only peer"
                    id="radio_1"
                    type="radio"
                    name="priority"
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
                    class="sr-only peer"
                    id="radio_2"
                    type="radio"
                    name="priority"
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
                    class="sr-only peer"
                    id="radio_3"
                    type="radio"
                    name="priority"
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
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                id="countries"
                class=" border border-blue-gray-200 text-blue-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-200 p-2.5 pr-72 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose category</option>
                <option value="Hust">Hust</option>
                <option value="Intern">Intern</option>
                <option value="Home">Home</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Start date
              </label>
              <DatePicker date={startDate} setDate={setStartDate} />
            </div>
            <div className="pr-40">
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                End date
              </label>
              <DatePicker date={startDate} setDate={setStartDate} />
            </div>
          </div>
          <div>
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                console.log(newModel);
              }}
            />
          </div>
          <div>
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Color
            </label>
            <form className="flex items-center w-1/3 gap-x-5">
              <div className="flex-1">
                <input
                  class="sr-only peer"
                  id="color_1"
                  type="radio"
                  name="color"
                />
                <label
                  className="flex flex-col h-10 w-10 border-2 bg-red-500 border-red-500 text-red-500 cursor-pointer rounded-full justify-center items-center  peer-checked:ring-red-500 peer-checked:bg-red-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:text-white"
                  for="color_1"
                >
                  <Check />
                </label>
              </div>
              <div className="flex-2">
                <input
                  class="sr-only peer"
                  id="color_2"
                  type="radio"
                  name="color"
                />
                <label
                  className="flex flex-col h-10 w-10 border-2 bg-yellow-600 border-yellow-600 text-yellow-600 cursor-pointer rounded-full justify-center items-center  peer-checked:ring-yellow-600 peer-checked:bg-yellow-600 peer-checked:ring-2 peer-checked:border-transparent peer-checked:text-white"
                  for="color_2"
                >
                  <Check />
                </label>
              </div>
              <div className="flex-3">
                <input
                  class="sr-only peer"
                  id="color_3"
                  type="radio"
                  name="color"
                />
                <label
                  className="flex flex-col h-10 w-10 border-2 bg-green-500 border-green-500 text-green-500 cursor-pointer rounded-full justify-center items-center  peer-checked:ring-green-500 peer-checked:bg-green-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:text-white"
                  for="color_3"
                >
                  <Check />
                </label>
              </div>
              <div className="flex-4">
                <input
                  class="sr-only peer"
                  id="color_4"
                  type="radio"
                  name="color"
                />
                <label
                  className="flex flex-col h-10 w-10 border-2 bg-pink-500 border-pink-500 text-pink-500 cursor-pointer rounded-full justify-center items-center  peer-checked:ring-pink-500 peer-checked:bg-pink-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:text-white"
                  for="color_4"
                >
                  <Check />
                </label>
              </div>
              <div className="flex-5">
                <input
                  class="sr-only peer"
                  id="color_5"
                  type="radio"
                  name="color"
                />
                <label
                  className="flex flex-col h-10 w-10 border-2 bg-purple-500 border-purple-500 text-purple-500 cursor-pointer rounded-full justify-center items-center  peer-checked:ring-purple-500 peer-checked:bg-purple-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:text-white"
                  for="color_5"
                >
                  <Check />
                </label>
              </div>
              <div className="flex-6">
                <input
                  class="sr-only peer"
                  id="color_6"
                  type="radio"
                  name="color"
                />
                <label
                  className="flex flex-col h-10 w-10 border-2 bg-blue-500 border-blue-500 text-blue-500 cursor-pointer rounded-full justify-center items-center  peer-checked:ring-blue-500 peer-checked:bg-blue-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:text-white"
                  for="color_6"
                >
                  <Check />
                </label>
              </div>
            </form>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-white text-red-500 rounded-full border-red-500 border-2"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-purple-500 text-white rounded-full border-purple-500"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
