import { OperatorShiftDto } from "@/lib/types/openapi";
import { IShiftData } from "@/lib/types";

// Мапинг статусов из API в формат компонента
const statusMapping: Record<OperatorShiftDto.status, IShiftData["status"]> = {
  [OperatorShiftDto.status.PLANNED]: "planned",
  [OperatorShiftDto.status.INPROGRESS]: "inProgress",
  [OperatorShiftDto.status.PAUSED]: "paused",
  [OperatorShiftDto.status.DONE]: "done",
  [OperatorShiftDto.status.CANCELED]: "canceled",
};

// Адаптер для преобразования данных из API в формат компонента
export const adaptShiftData = (shift: OperatorShiftDto): IShiftData => {
  return {
    id: shift.id,
    status: statusMapping[shift.status],
    date: new Date(shift.plannedDate).toLocaleDateString("ru-RU"),
    product: shift.product.fullName,
    volume: Number(shift.product.volume) || 0,
    plannedCount: shift.plannedCount || 0,
    packing: shift.packing,
    countInBox: shift.countInBox || undefined,
    doneCount: shift.factCount || undefined,
    doneBoxes:
      shift.factCount && shift.countInBox
        ? Math.floor(shift.factCount / shift.countInBox)
        : undefined,
  };
};
