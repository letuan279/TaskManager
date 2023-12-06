import * as React from "react";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const curDate = new Date();
const randomDate =
  curDate.getFullYear() +
  "-" +
  (curDate.getMonth() + 1) +
  "-" +
  curDate.getDate() +
  " " +
  curDate.getHours() +
  ":" +
  curDate.getMinutes();
const notifications = [
  { name: "ITSS", time: randomDate, start: "Starts in 2 hours" },
  { name: "Nihongo", time: randomDate, start: "1Starts in 10 hours" },
  { name: "GR2", time: randomDate, start: "Starts in 8 hours" },
];
export default function Notification() {
  return (
    <Popover>
      <PopoverTrigger>
        <Bell size={25} />
      </PopoverTrigger>
      <div style={{ left: "-10px" }}>
        <PopoverContent className="left-[-90%] transform translate-x-[-90%]">
          <div>
            {notifications.map((task) => (
              <div className="py-3 px-2 bg-[#D9D9D9] my-2">
                <div className="flex flex-row justify-between">
                  <p>{task.name}</p>
                  <p>{task.time}</p>
                </div>
                <p>{task.start}</p>
              </div>
            ))}
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
}
