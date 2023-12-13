"use client";
import * as React from "react";
import { Search, Bell, ChevronDown, Check, EyeOff, Eye } from "lucide-react";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { Collapsible } from "@radix-ui/react-collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { CollapsibleContent } from "./ui/collapsible";
import { ScrollArea } from "./ui/scroll-area";
import { DetailTaskModal } from "./modal/detailTaskModal";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { DateTimePicker } from "./ui/date-time-picker";

import Notification from "./notification";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "./ui/button";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { edit } from "@/redux/userSlice";

function Navbar() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="w-full h-fit p-2 flex items-center justify-between border-b-2">
      <div></div>
      <SearchBar />
      <div className="flex items-center gap-4">
        <Notification />
        <div className="flex items-center gap-4">
          <div className="flex flex-col place-items-end">
            <span className="font-bold">{user.data.name}</span>
            <span className="text-green-500 font-bold">🟢 online</span>
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden border">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5556/5556468.png"
              alt=""
            />
          </div>
          <DropdownMenuCustom />
        </div>
      </div>
    </div>
  );
}

function SearchBar() {
  const tasks = useSelector((state: RootState) => state.tasks);
  const categories = useSelector((state: RootState) => state.categories);
  const [open, setOpen] = React.useState(false);
  const [searchedValue, setSearchedValue] = React.useState("");
  const searchRef = React.useRef(null);
  const colors = ["red", "green", "blue", "yellow", "purple", "pink"];
  const [task, setTask] = React.useState(tasks.data[0]);
  const [openModal, setOpenModal] = React.useState(false);

  React.useEffect(() => {
    function handleClickOutSide(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  const cutArray = (number = 3, array) => {
    if (array.length <= number) return array;

    return array.slice(0, number);
  };

  const handleDetailModal = (task) => {
    setTask(task);
    setOpenModal(true);
  };

  return (
    <>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="sm:max-w-[65%]">
          <DialogHeader>
            <DialogTitle>タスク詳細 </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-6">
            <Input
              color="blue"
              label="タスクのタイトル"
              value={task?.name}
              // className="w-[80px]"
              disabled="True"
            />

            <div className="flex flex-row gap-5">
              <div>
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  優先度
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
                      <span className="text-xs font-bold uppercase">高</span>
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
                      <span className="text-xs font-bold uppercase">中</span>
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
                      <span className="text-xs font-bold uppercase">低</span>
                    </label>
                  </div>
                </form>
              </div>
              <div className="">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  カテゴリ
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
                  開始日
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
                  終了日
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
                説明
              </label>
              {/* <FroalaEditorComponent
                            tag="textarea"
                            config={{
                                // Cấu hình tại đây
                                placeholderText: "説明を追加",
                                // ...
                            }}
                            model={task?.description}
                            skipReset={true}
                        /> */}
              <div
                dangerouslySetInnerHTML={{ __html: task?.description }}
              ></div>
            </div>
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                色
              </label>
              <form className="flex items-center w-1/3 gap-x-5">
                {colors.map((color, i) => (
                  <div className="flex-6" key={i}>
                    <input
                      className="sr-only peer"
                      id={color}
                      type="radio"
                      name="color"
                      // onChange={handleColorChange}
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
      <Collapsible className="w-96" open={open}>
        <Command className="border max-w-xl rounded-md">
          <CommandInput
            placeholder="search for..."
            onValueChange={(search) => setSearchedValue(search)}
            onFocus={() => setOpen(true)}
            ref={searchRef}
          />
          <CollapsibleContent className="">
            <CommandList className="absolute z-10 bg-background w-96 max-h-96 overflow-y-auto">
              <CommandEmpty>No data</CommandEmpty>
              <CommandGroup heading="Task">
                {tasks &&
                  cutArray(
                    3,
                    tasks.data.filter(
                      (task) => task.name.search(searchedValue) > -1
                    )
                  ).map((task, index) => (
                    <CommandItem key={task._id} value={task.name}>
                      <div onClick={() => handleDetailModal(task)}>
                        {task.name}
                      </div>
                    </CommandItem>
                  ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Category">
                {categories &&
                  cutArray(
                    3,
                    categories.data.filter(
                      (cate) => cate.name.search(searchedValue) > -1
                    )
                  ).map((cate, index) => (
                    <CommandItem key={cate._id} value={task.name}>
                      <Link href={`/category/${cate._id}`}>{cate.name}</Link>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </CollapsibleContent>
        </Command>
      </Collapsible>
    </>
  );
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  oldPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

function DropdownMenuCustom() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      oldPassword: "",
      newPassword: "",
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("auth/login");
    toast.success("Logout was successful");
  };

  const handleOpen = (e) => {
    e.preventDefault();
    form.setValue("name", user.data.name);
    form.setValue("email", user.data.email);
    form.setValue("oldPassword", "");
    form.setValue("newPassword", "");
    setOpen((value) => !value);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(edit(values))
      .unwrap()
      .then(() => {
        router.push("/");
        toast.success("Update was successful");
      })
      .catch((error) => {
        toast.error(
          error.message || "It seems like something error is happening!"
        );
      });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ChevronDown size={25} className="hover:cursor-pointer"></ChevronDown>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={(e) => handleOpen(e)}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[40%]">
          <DialogHeader>
            <DialogTitle>Update profile</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Previous password</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} type={"password"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} type={"password"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="float-right">
                <Button
                  onClick={(e) => handleOpen(e)}
                  className="bg-white text-red-500 rounded-full border-red-500 border-2 mr-6"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-purple-500 text-white rounded-full border-purple-500"
                >
                  Update
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Navbar;
