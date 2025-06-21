import { OperatorShiftDto, UpdateShiftDto } from "@/lib/types/openapi";
import { Drawer, DrawerItem } from "@gravity-ui/navigation";
import { Pencil, XmarkShape } from "@gravity-ui/icons";
import {
  Button,
  Dialog,
  Icon,
  Label,
  Loader,
  Overlay,
  Text as TextComponent,
} from "@gravity-ui/uikit";
import { useEffect, useState } from "react";
import { useShiftStore } from "@/entities/Shift";
import { useShallow } from "zustand/shallow";
import { useShiftPermissions } from "./hooks";
import { ShiftEditForm, ShiftViewDisplay, UpdateShiftData } from "./components";

import s from "./ShiftInfo.module.scss";

// Маппинг статусов для OperatorShiftDto
const STATUS_MAP: Record<OperatorShiftDto.status, string> = {
  [OperatorShiftDto.status.PLANNED]: "Запланирована",
  [OperatorShiftDto.status.INPROGRESS]: "В работе",
  [OperatorShiftDto.status.PAUSED]: "Приостановлена",
  [OperatorShiftDto.status.DONE]: "Завершена",
  [OperatorShiftDto.status.CANCELED]: "Отменена",
};

type LabelTheme =
  | "normal"
  | "info"
  | "danger"
  | "warning"
  | "success"
  | "utility"
  | "unknown"
  | "clear";

const STATUS_COLOR_MAP: Record<OperatorShiftDto.status, LabelTheme> = {
  [OperatorShiftDto.status.PLANNED]: "normal",
  [OperatorShiftDto.status.INPROGRESS]: "info",
  [OperatorShiftDto.status.PAUSED]: "warning",
  [OperatorShiftDto.status.DONE]: "success",
  [OperatorShiftDto.status.CANCELED]: "danger",
};

export interface IShiftInfoProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  shiftId: string;
}

// eslint-disable-next-line complexity
export const ShiftInfo = (props: IShiftInfoProps) => {
  const { visible, setVisible, shiftId } = props;
  const [currentState, setCurrentState] = useState<"view" | "edit">("view");
  const [editForm, setEditForm] = useState<UpdateShiftData>({});
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const [getOneShift, shift, isLoading, updateShift, isChangeLoading] =
    useShiftStore(
      useShallow((state) => [
        state.getOneShift,
        state.oneShift,
        state.isLoading,
        state.updateShift,
        state.isChangeLoading,
      ]),
    );

  const { canChangeData } = useShiftPermissions();

  useEffect(() => {
    if (visible && shiftId) {
      getOneShift(shiftId);
    }
  }, [getOneShift, shiftId, visible]);

  // Инициализация формы редактирования при открытии режима редактирования
  useEffect(() => {
    if (currentState === "edit" && shift) {
      setEditForm({
        plannedDate: shift.plannedDate,
        plannedCount: shift.plannedCount || 0,
        packing: shift.packing,
        countInBox: shift.countInBox || 1,
      });
    }
  }, [currentState, shift]);

  const handleCancelShift = () => {
    setShowCancelDialog(true);
  };

  const handleConfirmCancel = async () => {
    if (!shift?.id) return;

    try {
      const updateData: UpdateShiftDto = {
        status: OperatorShiftDto.status.CANCELED,
      };
      await updateShift(shift.id, updateData);
      await getOneShift(shift.id);
      setShowCancelDialog(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Ошибка при отмене смены:", error);
    }
  };

  const formatDateForInput = (dateString?: unknown) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString as string);
      return date.toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  const formatDateToISO = (dateString?: string) => {
    if (!dateString) return undefined;
    try {
      // Если дата уже в ISO формате, возвращаем как есть
      if (dateString.includes("T")) {
        return dateString;
      }
      // Если дата в формате YYYY-MM-DD, создаем дату в локальном времени
      // и затем преобразуем в ISO, сохраняя правильную дату
      const parts = dateString.split("-").map(Number);
      if (parts.length !== 3 || parts.some((part) => isNaN(part))) {
        return undefined;
      }
      const [year, month, day] = parts as [number, number, number];
      const date = new Date(year, month - 1, day, 12, 0, 0); // Используем полдень для избежания проблем с часовыми поясами
      return date.toISOString();
    } catch {
      return undefined;
    }
  };

  const handleSaveEdit = async () => {
    if (!shift?.id) return;
    try {
      const updateData: Partial<UpdateShiftDto> = {};
      // Для даты сравниваем форматированные значения
      const currentFormattedDate = formatDateForInput(shift.plannedDate);
      if (editForm.plannedDate !== currentFormattedDate) {
        updateData.plannedDate = formatDateToISO(editForm.plannedDate);
      }
      if (editForm.plannedCount !== shift.plannedCount) {
        updateData.plannedCount = editForm.plannedCount;
      }
      if (editForm.packing !== shift.packing) {
        updateData.packing = editForm.packing;
      }
      if (editForm.countInBox !== shift.countInBox) {
        updateData.countInBox = editForm.countInBox;
      }
      if (Object.keys(updateData).length > 0) {
        await updateShift(shift.id, updateData as UpdateShiftDto);
        await getOneShift(shift.id); // Обновляем данные смены
      }
      setCurrentState("view");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Ошибка при сохранении изменений:", error);
    }
  };

  return (
    <Drawer
      onEscape={() => setVisible(false)}
      onVeilClick={() => setVisible(false)}
      hideVeil={false}
      keepMounted={false}
      key={shift?.id}
    >
      <DrawerItem
        id="shiftInfo"
        direction="right"
        visible={visible}
        className={s.root}
      >
        <div className={s.wrapper}>
          <div className={s.header}>
            <div className={s.statusesGroup}>
              <Label
                theme={
                  shift?.status ? STATUS_COLOR_MAP[shift.status] : "normal"
                }
                interactive
                qa="shift.info.label.status"
                size="m"
              >
                {shift?.status ? STATUS_MAP[shift.status] : "Неизвестно"}
              </Label>
              {canChangeData &&
                shift?.status !== OperatorShiftDto.status.CANCELED &&
                shift?.status !== OperatorShiftDto.status.DONE && (
                  <Button
                    view="outlined-danger"
                    onClick={handleCancelShift}
                    size="m"
                    disabled={isChangeLoading}
                  >
                    Отменить смену
                  </Button>
                )}
            </div>
            {currentState === "view" ? (
              <Button
                view="flat"
                onClick={() => setCurrentState("edit")}
                size="m"
                disabled={!canChangeData}
              >
                <Icon data={Pencil} size={18} />
                Изменить
              </Button>
            ) : (
              <div className={s.editButtons}>
                <Button
                  view="action"
                  onClick={handleSaveEdit}
                  size="m"
                  disabled={isChangeLoading}
                >
                  Сохранить
                </Button>
                <Button
                  view="flat"
                  onClick={() => setCurrentState("view")}
                  size="m"
                  disabled={isChangeLoading}
                >
                  <Icon data={XmarkShape} size={18} />
                  Отмена
                </Button>
              </div>
            )}
          </div>

          {currentState === "view" ? (
            <ShiftViewDisplay shift={shift} />
          ) : (
            <ShiftEditForm
              shift={shift}
              editForm={editForm}
              setEditForm={setEditForm}
            />
          )}
        </div>

        <Overlay visible={isLoading}>
          <Loader />
        </Overlay>
      </DrawerItem>

      <Dialog
        open={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        size="s"
      >
        <Dialog.Header caption="Подтверждение действия" />
        <Dialog.Body>
          <TextComponent>
            Вы уверены, что хотите отменить смену? Это действие нельзя отменить.
          </TextComponent>
        </Dialog.Body>
        <Dialog.Footer
          onClickButtonCancel={() => setShowCancelDialog(false)}
          onClickButtonApply={handleConfirmCancel}
          textButtonApply="Отменить смену"
          textButtonCancel="Отмена"
          propsButtonApply={{ view: "outlined-danger" }}
          loading={isChangeLoading}
        />
      </Dialog>
    </Drawer>
  );
};
