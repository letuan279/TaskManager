"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid/index.js";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

import { convertTaskSchedule } from "@/utils/task";
import { DetailTaskModal } from "@/components/modal/detailTaskModal";
import { DialogTrigger } from "@/components/ui/dialog";

export default function Home() {
  const eventContent = (arg) => {
    return (
      <DetailTaskModal
        key={arg.event.extendedProps.task._id}
        task={arg.event.extendedProps.task}
      >
        <DialogTrigger asChild>
          <div className="cursor-pointer">
            <div style={{ fontWeight: 400 }}>{arg.timeText}</div>
            <div>{arg.event.title}</div>
            <div
              style={{
                backgroundColor: `${arg.event.extendedProps.categoryColor}`,
                padding: "3px 5px",
                borderRadius: "10px",
                width: "fit-content",
                fontSize: "10px",
              }}
            >
              {arg.event.extendedProps.category}
            </div>
          </div>
        </DialogTrigger>
      </DetailTaskModal>
    );
  };

  const tasks = useSelector((state: RootState) => state.tasks);
  const categories = useSelector((state: RootState) => state.categories);
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="p-10">
      <div className="text-4xl font-bold">Hello {user.data.name} ☕</div>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridDay"
        headerToolbar={{
          start: "prev,next",
          center: "title",
          end: "today",
        }}
        allDaySlot={false}
        slotMinTime={"00:00"}
        height={530}
        events={convertTaskSchedule(tasks.data, categories.data)}
        eventDisplay="block"
        eventContent={eventContent}
        scrollTime={"00:00:00"}
      />
    </div>
  );
}
