"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FilePlusIcon, Loader2Icon } from "lucide-react";
import { useScroll } from "motion/react";
import * as React from "react";
import { toast } from "sonner";
const page = () => {
  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );
  const [loadData, setLoadData] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [uploadProgress, setUploadProgress] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  return (
    <div className="flex ">
      <ScrollArea className="h-[80vh] w-48 rounded-md border ">
        <div className="p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">
            <label className="flex items-center gap-2 cursor-pointer">
              <FilePlusIcon className="size-4" />
              <input
                type="file"
                accept=".txt"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setUploadProgress(true);
                    setFileName(file.name);
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const text = event.target?.result;
                      setLoadData(text as string);
                    };
                    reader.readAsText(file);
                  }
                }}
              />
            </label>
          </h4>
          {tags.map((tag) => (
            <React.Fragment key={tag}>
              <div className="text-sm">{tag}</div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
      <ScrollArea className="w-full h-[80vh] rounded-md border">
        {uploadProgress && (
          <div className="sticky top-0 bg-primary-foreground z-10 flex justify-end p-2">
            <Button
              disabled={uploading}
              onClick={async () => {
                setUploading(true);
                try {
                  const token = localStorage.getItem("token");
                  const res = await fetch("/api/knowledge", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      fileName,
                      content: loadData,
                      creator: token,
                    }),
                  });

                  const data = await res.json();
                  if (res.ok) {
                    toast.success("uploaded successfully");
                    setUploading(false);
                    setLoadData("");
                    setUploadProgress(false);
                  } else {
                    toast.error("uploading faliled");
                    setUploading(false);
                    setLoadData("");
                    setUploadProgress(false);
                  }
                } catch (err) {
                  console.error(err);
                  alert("Upload failed");
                }
              }}
            >
              {uploading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <>
                  <FilePlusIcon />
                  Upload
                </>
              )}
            </Button>
          </div>
        )}
        <pre className="bg-primary-foreground text-wrap p-7 leading-7 text-justify selection:bg-secondary mt-2">
          {loadData}
        </pre>
      </ScrollArea>
    </div>
  );
};
export default page;
