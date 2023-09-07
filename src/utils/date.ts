import dayjs from "dayjs";

export const displayHumanFriendlyDateAndTime = (date: string) =>
  `${dayjs(date).format("dddd, MMMM D, YYYY")} at ${dayjs(date).format("h:mm A")}`;
