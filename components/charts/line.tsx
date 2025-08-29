"use client";

import { TrendingUp } from "lucide-react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A line chart for average salary by department";

const chartData = [
  { dept: "HR", salary: 50000 },
  { dept: "HR", salary: 500 },
  { dept: "HR", salary: 5000 },
  { dept: "IT", salary: 64500 },
  { dept: "Finance", salary: 62000 },
  { dept: "Marketing", salary: 68000 },
];

const chartConfig = {
  salary: {
    label: "Average Salary",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function LineChartDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>Average Salary by Department</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="dept" tickLine={false} axisLine={false} />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="salary"
              stroke="var(--color-salary)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending salaries by department <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
