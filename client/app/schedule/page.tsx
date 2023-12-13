"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CreateTaskModal } from "@/components/modal/createTaskModal";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

import { convertTaskSchedule } from "../../utils/task";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { DetailTaskModal } from "@/components/modal/detailTaskModal";

function Schedule() {
  const eventContent = (arg) => {
    const isMonthView = arg.view.type === "dayGridMonth";
    if (isMonthView) {
      return (
        <DetailTaskModal
          key={arg.event.extendedProps.task._id}
          task={arg.event.extendedProps.task}
        >
          <DialogTrigger asChild>
            <div className="cursor-pointer">
              <div>{arg.event.title}</div>
            </div>
          </DialogTrigger>
        </DetailTaskModal>
      );
    }

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

  return (
    <div className="p-10">
      <div className="text-4xl font-bold">Schedule</div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          start: "prev,next",
          center: "title",
          end: "timeGridWeek,dayGridMonth   ",
        }}
        allDaySlot={false}
        height={530}
        events={convertTaskSchedule(tasks.data, categories.data)}
        eventContent={eventContent}
        eventDisplay="block"
        scrollTime={"00:00:00"}
      />

      <div className="fixed" style={{ top: "146px", right: "35px" }}>
        <CreateTaskModal>
          <DialogTrigger asChild>
            <Button className="bg-blue-400 rounded-2xl w-[100px]">
              Create
            </Button>
          </DialogTrigger>
        </CreateTaskModal>
      </div>
    </div>
  );
}

export default Schedule;
