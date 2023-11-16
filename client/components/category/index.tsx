import { Category } from "@/app/category/page";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Progress } from "../ui/progress";

const CategoryComponent = ({ category }: { category: Category }) => {
  return (
    <Card className="w-1/4 shadow-xl">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle style={{ color: category.color.toLowerCase() }}>
          {category.name}
        </CardTitle>
        <Button className="bg-background hover:bg-secondary text-foreground">
          <Trash2 />
        </Button>
      </CardHeader>
      <CardContent className="text-blue-400 space-y-2">
        <div>
          <div className="flex flex-row justify-between">
            <div>Processing</div>
            <div>{category?.processing || 0}%</div>
          </div>
          <Progress value={category?.processing || 0} />
        </div>
        <div>
          <div className="flex flex-row justify-between">
            <div>Finished</div>
            <div>{category?.finished || 0}%</div>
          </div>
          <Progress value={category?.finished || 0} />
        </div>
      </CardContent>
      <CardFooter>
        <Button size={"blue"} variant={"outline-blue"}>
          More details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CategoryComponent;
