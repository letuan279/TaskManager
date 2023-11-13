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
import { Textarea } from "@/components/ui/textarea";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import { Check } from "lucide-react";

export function CreateCategoryModal({ children }) {
  return (
    <Dialog>
      {children}
      <DialogContent className="sm:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>
            <h1>New category</h1>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <Input color="blue" label="Category name" />
          <div>
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <Textarea placeholder="Enter the description" />
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
