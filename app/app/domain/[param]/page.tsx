import { Response } from "@/components/response";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default async function DomainPage({
  params,
}: {
  params: Promise<{ param: string }>;
}) {
  const { param } = await params;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">
            A brief Description on {param}{" "}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Response>{``}</Response>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
