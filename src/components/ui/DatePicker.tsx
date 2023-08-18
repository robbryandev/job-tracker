import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type DatePickerProps = {
  onDateChange: (value: Date) => void;
  label: string;
};
export default function DatePicker({ onDateChange, label }: DatePickerProps) {
  const [date, setDate] = React.useState<Date>(new Date());

  return (
    <Popover>
      <p className="pl-2">{label}</p>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(day: Date | undefined) => {
            setDate(day!);
            onDateChange(day!);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
