import { TaskType } from "@/app/task/page";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Clock, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

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
  return (
    <Card key={task.id}>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>{task.name}</CardTitle>
        <Button className="bg-background hover:bg-secondary text-foreground">
          <Trash2 />
        </Button>
      </CardHeader>
      <CardContent>Sample category</CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-priority-high flex flex-row items-center space-x-2">
          <Clock />
          <div>{task.end_day}</div>
        </div>
        <PriorityBadge num={task.priority} />
      </CardFooter>
    </Card>
  );
};

export const MiniTaskComponent = ({ task }: InputType) => {
  return (
    <Card key={task.id}>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>{task.name}</CardTitle>
        <Button className="bg-background hover:bg-secondary text-foreground">
          <Trash2 />
        </Button>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="text-priority-high flex flex-row items-center space-x-2">
          <Clock />
          <div>{task.end_day}</div>
        </div>
        <PriorityBadge num={task.priority} />
      </CardFooter>
    </Card>
  );
};

export default TaskComponent;
