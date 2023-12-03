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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

import { DetailTaskModal } from "../modal/detailTaskModal";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { deleteTask } from "@/redux/taskSlice";
import { toast } from "react-toastify";

import { EditTaskModal } from "@/components/modal/editTaskModal.jsx";

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
          <Button
            onClick={() => handleDeleteTask(task._id)}
            className="bg-background hover:bg-secondary text-foreground"
          >
            <Trash2 />
          </Button>
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

export default TaskComponent;
