import dayjs from "dayjs";
import "dayjs/locale/es";

//convertir una fecha ISO en formato UTC (hora universal) a un formato relativo (hace 5m, hace 2h, hace 3d, 20 jul) que se adapta a la zona horaria de cada usuario
export function formatDate(isoDate: string): string {
  dayjs.locale("es")
  const now = dayjs();
  const date = dayjs(isoDate);
  //Se calcula la diferencia entre la fecha actual y la fecha dada en segundos, minutos, horas y días
  const seconds = now.diff(date, "second");
  const minutes = now.diff(date, "minute");
  const hours = now.diff(date, "hour");
  const days = now.diff(date, "day");

  if (seconds < 60) return `${seconds}s`;
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days <= 30) return `${days}d`;

  // Más de 30 días - "20 jul"
  return date.format("D MMM");
}