import dayjs from "dayjs";

export const displayHumanFriendlyDateAndTime = (date: number) => {
  const parsedDate = dayjs.unix(date);

  return `${parsedDate.format("dddd, MMMM D, YYYY")} at ${parsedDate.format("h:mm A")}`;
};
