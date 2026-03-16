import { months } from "@/constant";

 export function formatDate(dateString: string) {
  if (!dateString) return "Tarix seç";

  const date = new Date(dateString);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} - ${year}-ci il`;
}