import { Category } from "@/app/category/page";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2, Pencil } from "lucide-react";
import { Progress } from "../ui/progress";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { TaskType } from "@/app/task/page";
import { useEffect, useState } from "react";
import { EditCategoryModal } from "../modal/editCategoryModal";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { deleteCategory } from "@/redux/categoriesSlice";
import { toast } from "react-toastify";
import { fetchTasks } from "@/redux/taskSlice";

import { useRouter } from "next/navigation";

const CategoryComponent = ({ category }: { category: Category }) => {
  const router = useRouter();

  const [finished, setFinished] = useState(0);
  const [processing, setProcessing] = useState(0);

  const tasks = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    const taskInCategory = tasks.data.filter(
      (task: TaskType) => task.category === category._id
    );
    const taskDone = taskInCategory.filter(
      (task: TaskType) => task.status === 3
    );

    if (taskInCategory.length === 0) return;

    setFinished(Math.round((taskDone.length / taskInCategory.length) * 100));
    setProcessing(
      Math.round((1 - taskDone.length / taskInCategory.length) * 100)
    );
  }, [category._id, tasks.data]);

  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteCategory(category._id))
      .then(() => {
        toast.success("Delete category successfully!");
        dispatch(fetchTasks());
      })
      .catch((error) => {
        toast.error(error.message || "Something was wrong!");
      });
  };

  return (
    <Card className="w-1/4 shadow-xl">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle style={{ color: category.color.toLowerCase() }}>
          {category.name}
        </CardTitle>
        <div className="flex">
          <EditCategoryModal key={category._id} category={category}>
            <DialogTrigger asChild>
              <span className="block cursor-pointer">
                <Button className="bg-background hover:bg-secondary text-foreground">
                  <Pencil />
                </Button>
              </span>
            </DialogTrigger>
          </EditCategoryModal>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-background hover:bg-secondary text-foreground">
                <Trash2 />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>⚠️ Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your <b>category</b> and remove all its <b>tasks</b>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent className="text-blue-400 space-y-2">
        <div>
          <div className="flex flex-row justify-between">
            <div>Processing</div>
            <div>{processing}%</div>
          </div>
          <Progress value={processing} />
        </div>
        <div>
          <div className="flex flex-row justify-between">
            <div>Finished</div>
            <div>{finished}%</div>
          </div>
          <Progress value={finished} />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => router.push("/category/" + category._id)}
          size={"blue"}
          variant={"outline-blue"}
        >
          More details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CategoryComponent;
