import { NULL_DATE } from "@/constants/table";

export const formatDate = (dateString: string, withTime: boolean = false) => {
  if (dateString === NULL_DATE) {
    return "No data";
  }

  const options: Intl.DateTimeFormatOptions = withTime
    ? {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "UTC",
      }
    : {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};
