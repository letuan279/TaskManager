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
import Category from "./../../app/category/page";
import { DatePicker } from "@/components/ui/date-picker.jsx";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import {
    DialogTrigger,
  } from "@/components/ui/dialog";

import FroalaEditorComponent from "react-froala-wysiwyg";
import { Check } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { DateTimePicker } from "../ui/date-time-picker";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "@/redux/taskSlice";
import { toast } from "react-toastify";

export function EditTaskModal({ children, task }) {
    const [start_day, setStart_day] = React.useState({date: new Date(task.start_day), hasTime: true});
    const [end_day, setEnd_day] = React.useState({date: new Date(task.end_day), hasTime: true});
    const [name, setName] = React.useState(task.name);
    const [category, setCategory] = React.useState(task.category);
    const [priority, setPriority] = React.useState(task.priority);
    const [description, setDescription] = React.useState(task.description);
    const [color, setColor] = React.useState(task.color);
    const [status, setStatus] = React.useState(task.status)
    const colors = ["red", "green", "blue", "yellow", "purple", "pink"];

    const categories = useSelector(
        (state) => state.categories
      );

    const dispatch = useDispatch();

    const handlePriorityChange = (value) => {
        setPriority(value);
    };
    const handleStatusChange = (value) => {
        setStatus(value);
    };
    const handleColorChange = (e) => {
        setColor(e.target.id);
    };
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleClearData = () => {
        setStart_day({date: new Date(task.start_day), hasTime: true})
        setEnd_day({date: new Date(task.end_day), hasTime: true})
        setName(task.name)
        setCategory(task.category)
        setPriority(task.priority)
        setDescription(task.description)
        setColor(task.color)
      }

    const handleSendData = () => {
        const payload = {
            name,
            category,
            priority,
            start_day: start_day.date.toISOString(),
            end_day: end_day.date.toISOString(),
            description,
            color,
            status,
        }

        dispatch(editTask({id: task._id, payload})).unwrap()
          .then(() => {
            toast.success("Edit task successfully!");
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
                    <DialogTitle>Update task</DialogTitle>
                </DialogHeader>
                <div className="flex justify-end space-x-4">
                </div>
                <div className="flex flex-col gap-6">
                    <Input
                        color="blue"
                        label="Task title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <div className="flex flex-row gap-5">
                        <div>
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
                                        checked={priority === 1}
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
                                        checked={priority === 2}
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
                                        checked={priority === 3}
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
                        <div className="">
                            <label
                                for="countries"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Category
                            </label>
                            <select
                                id="countries"
                                value={category}
                                className="border border-blue-gray-200 text-blue-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-200 p-2.5 pr-72 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={handleCategoryChange}
                                placeholder="Choose category"
                            >
                                {categories.data.map((item, i) => (
                                    <option key={i + "sdsd"} value={item._id}>{item.name}</option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-row gap-5">
                        <div>
                            <label
                                for="countries"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Start date
                            </label>
                            <DateTimePicker value={start_day} onChange={(e) => setStart_day(e)}  />
                        </div>
                        <div>
                            <label
                                for="countries"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                End date
                            </label>
                            <DateTimePicker value={end_day} onChange={(e) => setEnd_day(e)} />
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Status
                            </label>
                            <form className="flex items-center w-1/3 gap-x-5">
                                <div className="flex-1">
                                    <input
                                        className="sr-only peer"
                                        id="status_radio_1"
                                        type="radio"
                                        name="status"
                                        checked={status === 1}
                                        onChange={() => handleStatusChange(1)}
                                    />
                                    <label
                                        className="flex flex-col h-10 w-24 border-2 border-red-500 text-red-500 cursor-pointer rounded-full justify-center items-center  peer-checked:ring-red-500 peer-checked:bg-red-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:text-white"
                                        for="status_radio_1"
                                    >
                                        <span className="text-xs font-bold uppercase">TODO</span>
                                    </label>
                                </div>
                                <div className="flex-2">
                                    <input
                                        className="sr-only peer"
                                        id="status_radio_2"
                                        type="radio"
                                        name="status"
                                        checked={status === 2}
                                        onChange={() => handleStatusChange(2)}
                                    />
                                    <label
                                        className="flex flex-col h-10 w-24 border-2 border-blue-600 text-blue-600 cursor-pointer rounded-full justify-center items-center  peer-checked:ring-blue-600 peer-checked:bg-blue-600 peer-checked:ring-2 peer-checked:border-transparent peer-checked:text-white"
                                        for="status_radio_2"
                                    >
                                        <span className="text-xs font-bold uppercase">PROCESS</span>
                                    </label>
                                </div>
                                <div className="flex-3">
                                    <input
                                        className="sr-only peer"
                                        id="status_radio_3"
                                        type="radio"
                                        name="status"
                                        checked={status === 3}
                                        onChange={() => handleStatusChange(3)}
                                    />
                                    <label
                                        className="flex flex-col h-10 w-24 border-2 border-green-500 text-green-500 cursor-pointer rounded-full justify-center items-center  peer-checked:ring-green-500 peer-checked:bg-green-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:text-white"
                                        for="status_radio_3"
                                    >
                                        <span className="text-xs font-bold uppercase">DONE</span>
                                    </label>
                                </div>
                            </form>
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
                            onModelChange={(newModel) => {
                                setDescription(newModel);
                              }}
                            model={description}
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
                            {colors.map((item, i) => (
                                <div className="flex-6" key={i}>
                                    <input
                                        className="sr-only peer"
                                        id={item}
                                        type="radio"
                                        name="color"
                                        onChange={handleColorChange}
                                        checked={item === color}
                                    />
                                    <label
                                        className={`flex flex-col h-10 w-10 border-2 bg-${item}-500 border-${item}-500 text-${item}-500 cursor-pointer rounded-full justify-center items-center  peer-checked:ring-${item}-500 peer-checked:bg-${item}-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:text-white`}
                                        for={item}
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
                            Update
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}