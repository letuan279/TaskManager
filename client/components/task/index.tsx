import { TaskType } from "@/app/task/page";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Clock, Trash2, Eye, Pencil } from "lucide-react";
import { Button } from "../ui/button";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

import { DetailTaskModal } from "../modal/detailTaskModal";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { deleteTask } from "@/redux/taskSlice";
import { toast } from "react-toastify";

import { EditTaskModal } from "@/components/modal/editTaskModal.jsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { CategoryType } from "@/app/category/[slug]/page";

type InputType = {
  task: TaskType;
};

const PriorityBadge = ({ num }: { num: number }) => {
  if (num === 1) return <Badge variant={"high"}>HIGH</Badge>;
  if (num === 2) return <Badge variant={"medium"}>MEDIUM</Badge>;
  if (num === 3) return <Badge variant={"low"}>LOW</Badge>;
  return <Badge variant={"outline"}>UNKNOWN</Badge>;
};

const TaskComponent = ({ task }: InputType) => {
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector((state: RootState) => state.categories);
  const category: CategoryType = categories.data?.filter(
    (item: CategoryType) => item._id === task.category
  )[0];

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id))
      .unwrap()
      .then(() => {
        toast.success("Delete successfull");
      })
      .catch((error) => {
        toast.error(error.message || "Something was wrong!");
      });
  };

  return (
    <Card
      className={`border-t-4`}
      style={{ borderTopColor: task.color }}
      key={task._id}
    >
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>{task.name}</CardTitle>
        <div className="flex gap-1">
          <EditTaskModal key={task._id + "1"} task={task}>
            <DialogTrigger asChild>
              <span className="block cursor-pointer">
                <Button className="bg-background hover:bg-secondary text-foreground">
                  <Pencil />
                </Button>
              </span>
            </DialogTrigger>
          </EditTaskModal>
          <DetailTaskModal key={task._id} task={task}>
            <DialogTrigger asChild>
              <span className="block cursor-pointer">
                <Button className="bg-background hover:bg-secondary text-foreground">
                  <Eye />
                </Button>
              </span>
            </DialogTrigger>
          </DetailTaskModal>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-background hover:bg-secondary text-foreground">
                <Trash2 />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                {" "}
                <AlertDialogTitle>
                  ⚠️ Are you absolutely sure?
                </AlertDialogTitle>{" "}
                <AlertDialogDescription>
                  {" "}
                  This action cannot be undone. This will permanently delete
                  your <b>category</b> and remove all its <b>tasks</b>.
                </AlertDialogDescription>{" "}
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-400"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: task.description }}></div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-priority-high flex flex-row items-center space-x-2">
          <Clock />
          <div>
            {moment(new Date(task.end_day)).format("DD/MM/YYYY hh:mm:ss")}
          </div>
        </div>
        <PriorityBadge num={task.priority} />
      </CardFooter>
    </Card>
  );
};

export const MiniTaskComponent = ({ task }: InputType) => {
  return (
    <Card key={task._id}>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>{task.name}</CardTitle>
        <Button className="bg-background hover:bg-secondary text-foreground">
          <Trash2 />
        </Button>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="flex gap-3">
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full`}
              style={{ backgroundColor: category?.color }}
            ></div>
            <span
              className={
                "font-medium w-fit ml-3 text-sm overflow-hidden transition-all"
              }
            >
              {category?.name}
            </span>
          </div>
          <div className="text-priority-high flex flex-row items-center space-x-2 gap-2">
            <Clock />
            {moment(new Date(task.end_day)).format("DD/MM/YYYY hh:mm:ss")}
          </div>
        </div>
        <PriorityBadge num={task.priority} />
      </CardFooter>
    </Card>
  );
};

export default TaskComponent;
