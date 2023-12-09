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
import { EditTaskModal } from "@/components/modal/editTaskModal.jsx";
import { DateTimePicker } from "../ui/date-time-picker";
import { useSelector } from "react-redux";

export function DetailTaskModal({ children, task }) {
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [title, setTitle] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [priority, setPriority] = React.useState();
    const [description, setDescription] = React.useState("");
    const [color, setColor] = React.useState("");
    const colors = ["red", "green", "blue", "yellow", "purple", "pink"];

    const categories = useSelector(
        (state) => state.categories
      );

    return (
        <Dialog>
            {children}
            <DialogContent className="sm:max-w-[65%]">
                <DialogHeader>
                    <DialogTitle>Task detail</DialogTitle>
                </DialogHeader>
                <div className="flex justify-end space-x-4">
                </div>
                <div className="flex flex-col gap-6">
                    <Input
                        color="blue"
                        label="Task title"
                        value={task.name}
                        disabled="True"
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
                                        disabled="True"
                                        checked={task.priority === 1}
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
                                        disabled="True"
                                        checked={task.priority === 2}
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
                                        disabled="True"
                                        checked={task.priority === 3}
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
                                disabled
                                id="countries"
                                className="border border-blue-gray-200 text-blue-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-200 p-2.5 pr-72 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option selected>{categories.data.filter(item => item._id === task.category)[0]?.name}</option>
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
                            <DateTimePicker value={{date: new Date(task.start_day), hasTime: true}} isDisabled />
                        </div>
                        <div>
                            <label
                                for="countries"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                End date
                            </label>
                            <DateTimePicker value={{date: new Date(task.end_day), hasTime: true}} isDisabled/>
                        </div>
                    </div>
                    <div>
                        <label
                            for="countries"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Description
                        </label>
                        <div dangerouslySetInnerHTML={{__html: task.description}}></div>
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
                                        checked={color === task.color}
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
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}