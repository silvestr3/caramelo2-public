"use client";
import React, { Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { getDate } from "@/util/GetDateString";

interface DateSelectorProps {
	date: Date;
	setDate: Dispatch<SetStateAction<Date>>;
}

const DateSelector = ({ date, setDate }: DateSelectorProps) => {
	return (
		<div className="flex items-center justify-between">
			<label className="text-xs opacity-70" htmlFor="date-picker">
				Date of birth
			</label>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date-picker"
						variant={"outline"}
						className={cn(
							"w-[70%] justify-start text-left font-normal",
							!date && "text-muted-foreground"
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date ? getDate(date) : <span>Pick a date</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent align="start" className=" w-auto p-0">
					<Calendar
						mode="single"
						captionLayout="dropdown-buttons"
						selected={date}
						//@ts-expect-error
						onSelect={setDate}
						fromYear={1960}
						toYear={2024}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default DateSelector;
