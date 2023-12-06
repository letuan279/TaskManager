import { CategoryType } from "@/app/category/[slug]/page";
import { TaskType } from "@/app/task/page";

const changeColor = (color: string) => {
  switch (color) {
    case "red":
      return "#ef4444";
    case "purple":
      return "#9333ea";
    case "blue":
      return "#2563eb";
    default:
      return color;
  }
};

export const convertTaskSchedule = (
  tasks: TaskType[],
  categories: CategoryType[]
) => {
  return tasks.map((task) => {
    const category = categories.filter(
      (item: CategoryType) => item._id === task.category
    )[0];
    return {
      ...task,
      className: `bg-${task.color}-100 text-white font-bold`,
      end: task.end_day,
      start: task.start_day,
      title: task.name,
      category: category?.name,
      categoryColor: category?.color,
      color: changeColor(task.color),
      backgroundColor: changeColor(task.color),
      task: task,
    };
  });
};
