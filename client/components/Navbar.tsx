"use client";
import * as React from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
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
import { useSelector } from "react-redux";
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
import { DialogTrigger } from "@radix-ui/react-dialog";

import Notification from "./notification";

function Navbar() {
  return (
    <div className="w-full h-fit p-2 flex items-center justify-between border-b-2">
      <div></div>
      <SearchBar />
      <div className="flex items-center gap-4">
        <Notification />
        <div className="flex items-center gap-4">
          <div className="flex flex-col place-items-end">
            <span className="font-bold">Lê Anh Tuấn</span>
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

  return (
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
                tasks.data
                  .filter((task) => task.name.search(searchedValue) > -1)
                  .map((task, index) => (
                    <CommandItem key={task._id}>
                      <DetailTaskModal task={task} key={task._id}>
                        <DialogTrigger asChild>
                          <div>{task.name}</div>
                        </DialogTrigger>
                      </DetailTaskModal>
                    </CommandItem>
                  ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Category">
              {categories &&
                categories.data
                  .filter((cate) => cate.name.search(searchedValue) > -1)
                  .map((cate, index) => (
                    <CommandItem key={cate._id}>
                      <Link href={`category/${cate._id}`}>{cate.name}</Link>
                    </CommandItem>
                  ))}
            </CommandGroup>
          </CommandList>
        </CollapsibleContent>
      </Command>
    </Collapsible>
  );
}

function DropdownMenuCustom() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ChevronDown size={25} className="hover:cursor-pointer"></ChevronDown>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard className="mr-2 h-4 w-4" />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Github className="mr-2 h-4 w-4" />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Navbar;
