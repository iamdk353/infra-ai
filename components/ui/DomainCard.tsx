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
}: {
  title: string;
  link: string;
  desc: string;
}) => {
  return (
    <Card className="min-h-[15rem]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardAction>
          <Link href={link}>
            <Badge>
              <Link2 />
            </Badge>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>{desc}</p>
      </CardContent>
    </Card>
  );
};
export default DomainCard;
