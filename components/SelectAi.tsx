import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Box, PackageOpen } from "lucide-react";

export function SelectAi() {
  return (
    <Select>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Mode" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="ask">
            Ask <Box />
          </SelectItem>
          <SelectItem value="agent">
            Agent <PackageOpen />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
