
export default function getFormattedDateTime() {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, 0);
  const month = (date.getMonth() + 1).toString().padStart(2, 0);
  const year = date.getFullYear();

  const hour = (date.getHours() % 12 || 12).toString();
  const meridiem = date.getHours() >= 12 ? "PM" : "AM";
  const minute = date.getMinutes().toString().padStart(2, 0);

  return `${day}/${month}/${year} ${hour}:${minute} ${meridiem}`;
}