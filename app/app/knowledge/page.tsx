"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { File, FilePlusIcon, Loader2, Loader2Icon } from "lucide-react";
import { useScroll } from "motion/react";
import * as React from "react";
import { toast } from "sonner";
import axios from "axios";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const page = () => {
  const [loadData, setLoadData] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [uploadProgress, setUploadProgress] = React.useState(false);
  const [isFilesLoading, setIsfilesLoading] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);
  const [uploads, setUploads] = React.useState([{ fileName: "", _id: "" }]);
  const [isContentLoading, setIscontentLoading] = React.useState(false);
  const [iscsv, setIsCsv] = React.useState(false);
  React.useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch(
          "/api/knowledge?token=" + localStorage.getItem("token"),
          { method: "GET" }
        );
        const data = await res.json();

        if (res.ok) {
          // assuming API returns { files: [ { fileName: "abc.txt" }, ... ] }
          setIsfilesLoading(false);
          setUploads(data.files);
        } else {
          setIsfilesLoading(false);
          console.error("Error:", data.error);
        }
      } catch (err) {
        setIsfilesLoading(false);
        console.error("Fetch failed:", err);
      }
    };
    console.log(uploads);
    fetchFiles();
  }, [uploadProgress]);
  React.useEffect(() => {
    console.log(iscsv);
  });
  return (
    <div className="flex ">
      <ScrollArea className="h-[80vh] w-48 rounded-md border ">
        <div className="p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">
            <label className="items-center gap-2 cursor-pointer inline-block">
              <FilePlusIcon className="size-4" />
              <input
                type="file"
                accept=".txt"
                className="hidden"
                onChange={(e) => {
                  setUploadProgress(true);
                  const file = e.target.files?.[0];
                  if (file) {
                    setFileName(file.name);
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const text = event.target?.result;
                      setLoadData(text as string);
                      setIsCsv(file.name.toLowerCase().endsWith(".csv"));
                    };
                    reader.readAsText(file);
                  }
                }}
              />
            </label>
          </h4>

          {/* <h5 className="font-medium text-xs my-2">
            CSV Files (
            {
              uploads.filter((u) => u.fileName.toLowerCase().endsWith(".csv"))
                .length
            }
            )
          </h5>
          {uploads
            .filter((u) => u.fileName.toLowerCase().endsWith(".csv"))
            .map(({ fileName, _id }) => (
              <div key={_id}>
                <Button
                  className="text-[0.8rem] w-full flex justify-start"
                  variant="ghost"
                  onClick={async () => {
                    try {
                      setIscontentLoading(true);
                      const res = await axios.get(`/api/knowledge/${_id}`);
                      const file = res.data.file;
                      setIsCsv(file.fileName.endsWith(".csv"));
                      setLoadData(file.content);
                      setIscontentLoading(false);
                    } catch (err) {
                      console.error(err);
                      alert("Failed to fetch file");
                      setIscontentLoading(false);
                    }
                  }}
                >
                  <File className="size-4" />
                  {fileName}
                </Button>
                <Separator className="my-2" />
              </div>
            ))} */}
          {/* 
          <h5 className="font-medium text-xs my-2">
            TXT Files (
            {
              uploads.filter((u) => u.fileName.toLowerCase().endsWith(".txt"))
                .length
            }
            )
          </h5> */}
          {isFilesLoading ? (
            <Loader2 className="animate-spin mx-auto" />
          ) : (
            uploads
              .filter((u) => u.fileName.toLowerCase().endsWith(".txt"))
              .map(({ fileName, _id }) => (
                <div key={_id}>
                  <Button
                    className="text-[0.8rem] w-full flex justify-start"
                    variant="ghost"
                    onClick={async () => {
                      try {
                        setIscontentLoading(true);
                        const res = await axios.get(`/api/knowledge/${_id}`);
                        const file = res.data.file;
                        setIsCsv(false);
                        setLoadData(file.content);
                        setIscontentLoading(false);
                      } catch (err) {
                        console.error(err);
                        alert("Failed to fetch file");
                        setIscontentLoading(false);
                      }
                    }}
                  >
                    <File className="size-4" />
                    {fileName}
                  </Button>
                  <Separator className="my-2" />
                </div>
              ))
          )}
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
                    // setLoadData("");
                    setUploadProgress(false);
                  } else {
                    toast.error("uploading faliled");
                    setUploading(false);
                    // setLoadData("");
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
        {iscsv ? (
          <CsvTable data={loadData} /> // custom CSV table component
        ) : (
          <pre
            className={cn(
              "bg-primary-foreground text-wrap p-7 leading-7 text-justify selection:bg-secondary mt-2",
              isContentLoading && "animate-pulse"
            )}
          >
            {loadData}
          </pre>
        )}
      </ScrollArea>
    </div>
  );
};
export default page;

interface CsvTableProps {
  data: string; // raw CSV string
}

const CsvTable: React.FC<CsvTableProps> = ({ data }) => {
  if (!data) return null;

  const rows = data
    .trim()
    .split("\n")
    .map((row) => row.split(","));

  return (
    <div className="overflow-x-auto mt-2">
      <Table>
        <TableCaption>CSV Data</TableCaption>
        <TableHeader>
          <TableRow>
            {rows[0].map((cell, i) => (
              <TableHead key={i}>{cell}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.slice(1).map((row, rIndex) => (
            <TableRow key={rIndex}>
              {row.map((cell, cIndex) => (
                <TableCell key={cIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
