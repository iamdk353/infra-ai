"use client";

import React, { use, useEffect, useState } from "react";
import { Response } from "@/components/response";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DomainPage({
  params,
}: {
  params: Promise<{ param: string }>;
}) {
  const { param } = use(params);
  const [aiData, setAiData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAI = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/ai/suggestions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ domain: param, token }),
        });
        const data = await res.json();
        setAiData(data.data || "No data received");
      } catch (e) {
        setAiData("Error loading AI suggestions");
      } finally {
        setLoading(false);
      }
    };
    fetchAI();
  }, [param]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-600">Loading suggestions...</p>
        </div>
      ) : (
        <Card className="max-w-3xl w-full">
          <CardHeader>
            <CardTitle className="capitalize text-lg">
              AI Suggestions on {param}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Response>{aiData}</Response>
          </CardContent>
          <CardFooter>
            <Link href={"/app/ai-chat"}>
            <Button>
              Chat with Agent about {param}
            </Button></Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
