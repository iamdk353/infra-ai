import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUp, Link2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "./badge";
const DomainCard = ({
  title,
  link,
  desc,
  img
}: {
  title: string;
  link: string;
  desc: string;
  img:string;
}) => {
  return (
    <Link href={link}>
      <Card className="min-h-[25rem]">
        <CardHeader>
          <img src={img} alt={title} className="w-full h-[15rem] object-cover mb-2 rounded-md"/>
          <CardTitle>{title}</CardTitle>
          <CardAction></CardAction>
        </CardHeader>
        <CardContent>
          <p>{desc}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
export default DomainCard;
