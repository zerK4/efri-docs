"use client";
import * as React from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

export function DateTimePicker({
  cb,
  defaultDate,
  disabled = {
    date: new Date(),
    operator: ">",
  },
}: {
  cb: (date: Date | undefined) => void;
  defaultDate?: Date;
  disabled?: {
    date: Date;
    operator: ">" | "<" | ">=" | "<=";
  };
}) {
  const [date, setDate] = React.useState<Date | undefined>(defaultDate);
  const [time, setTime] = React.useState(() => {
    if (defaultDate) {
      return format(defaultDate, "HH:mm");
    }
    return "00:00";
  });
  const [isOpen, setIsOpen] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const timeSlotRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    if (date) {
      const [hours, minutes] = time.split(":");
      const updatedDate = new Date(date);
      updatedDate.setHours(parseInt(hours), parseInt(minutes));
      cb(updatedDate);
    } else {
      cb(undefined);
    }
  }, [date, time]);

  const generateTimeSlots = () => {
    const slots: string[] = [];
    for (let i = 0; i < 96; i++) {
      const hour = Math.floor(i / 4)
        .toString()
        .padStart(2, "0");
      const minute = ((i % 4) * 15).toString().padStart(2, "0");
      const timeValue = `${hour}:${minute}`;
      slots.push(timeValue);
    }
    return slots;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start gap-2 flex text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className='w-4 h-4' />
          {date
            ? `${format(date, "PPP", { locale: enUS })}, ${time}`
            : "Select a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='flex w-auto p-0 h-fit z-[100000]'>
        <Calendar
          mode='single'
          locale={enUS}
          selected={date}
          disabled={(d) => {
            const isDisabled = (d: Date) => {
              const { operator, date } = disabled;

              switch (operator) {
                case ">":
                  return d > date;
                case "<":
                  return d < date;
                case ">=":
                  return d >= date;
                case "<=":
                  return d <= date;
                default:
                  return false;
              }
            };

            return isDisabled(d);
          }}
          onSelect={(selectedDate) => {
            setDate(selectedDate);
          }}
          initialFocus
        />
        <div className='border-t max-h-[20rem] p-2'>
          <ScrollArea ref={scrollAreaRef} className='w-full h-full p-2 text-sm'>
            <div className='flex flex-col space-y-1'>
              {generateTimeSlots().map((timeSlot, index) => (
                <div
                  ref={(el) => {
                    timeSlotRefs.current[index] = el;
                    if (time === timeSlot && el) {
                      el.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                      });
                    }
                  }}
                  key={timeSlot}
                  className={cn(
                    "px-2 py-1 rounded-sm cursor-pointer hover:bg-accent hover:text-accent-foreground",
                    time === timeSlot && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => {
                    setTime(timeSlot);
                  }}
                >
                  {timeSlot}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}
