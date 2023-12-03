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
import { DialogClose } from "@radix-ui/react-dialog";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import { Check } from "lucide-react";
import { useDispatch } from "react-redux";
import { editCategory } from "@/redux/categoriesSlice";
import { toast } from "react-toastify";

export function EditCategoryModal({ children, category }) {
  const [name, setName] = React.useState(category.name);
  const [description, setDescription] = React.useState(category.description);
  const [colorCategory, setColorCategory] = React.useState(category.color);
  const colors = ["red", "green", "blue", "yellow", "purple", "pink"];

  const handleColorChange = (e) => {
    setColorCategory(e.target.id);
  };

  const dispatch = useDispatch()

  const handleSendData = () => {

    const payload = {
      name,
      description,
      color: colorCategory,
    }

    dispatch(editCategory({id: category._id, payload})).then(() => {
      toast.success("Edit category successfully!");
    })
    .catch((error) => {
      toast.error(error.message || "Something was wrong!");
    });

  };

  const handleClearData = () => {
    setName(category.name)
    setDescription(category.description)
    setColorCategory(category.color)
  }

  return (
    <Dialog onOpenChange={handleClearData}>
      {children}
      <DialogContent className="sm:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>
            <h1>Update Category</h1>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <Input
            color="blue"
            label="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div>
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <Textarea
              placeholder="Enter the description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              {colors.map((color, i) => {
                const isChecked = colorCategory === color;
                return (
                  <div className="flex-6" key={i}>
                    <input
                      class="sr-only peer"
                      id={color}
                      type="radio"
                      name="color"
                      onChange={handleColorChange}
                      defaultChecked={isChecked}
                    />
                    <label
                      className={`flex flex-col h-10 w-10 border-2 bg-${color}-500 border-${color}-500 text-${color}-500 cursor-pointer rounded-full justify-center items-center  peer-checked:ring-${color}-500 peer-checked:bg-${color}-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:text-white`}
                      for={color}
                    >
                      <Check />
                    </label>
                  </div>
                );
              })}
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
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}