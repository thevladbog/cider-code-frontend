import {
  CreatedUserDto,
  OperatorShiftDto,
  UpdateShiftDto,
} from "@/lib/types/openapi";
import { Drawer, DrawerItem } from "@gravity-ui/navigation";
import { ArrowDownToLine, Pencil, XmarkShape } from "@gravity-ui/icons";
import {
  Button,
  Checkbox,
  Dialog,
  Icon,
  Label,
  Loader,
  Overlay,
  Select,
  Text as TextComponent,
  TextInput,
} from "@gravity-ui/uikit";
import { useEffect, useState } from "react";
import { useUserStore } from "@/entities/User/useUserStore";
import { useShiftStore } from "@/entities/Shift";
import { useShallow } from "zustand/shallow";
import { dateTime } from "@gravity-ui/date-utils";
import { $api } from "@/lib/api";

import s from "./ShiftInfo.module.scss";

// Интерфейс для обновления смены
interface UpdateShiftData {
  plannedDate?: string;
  plannedCount?: number;
  packing?: boolean;
  countInBox?: number;
  status?: OperatorShiftDto.status;
}

// Варианты для количества в коробе
const COUNT_IN_BOX_OPTIONS = [
  { value: "1", content: "1" },
  { value: "6", content: "6" },
  { value: "20", content: "20" },
];

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

  const user = useUserStore((store) => store.data);

  const canChangeData =
    user?.role === CreatedUserDto.role.ADMIN ||
    user?.role === CreatedUserDto.role.SUPERVISOR;

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

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    try {
      const date = dateTime({ input: dateString });
      return date.format("DD.MM.YYYY");
    } catch {
      return "—";
    }
  };
  const getProgressPercentage = () => {
    if (!shift?.plannedCount || !shift?.factCount) return 0;
    return Math.round((shift.factCount / shift.plannedCount) * 100);
  };
  const downloadCodes = async (includeBoxes = false) => {
    if (!shift?.id) return;

    try {
      // Используем $api с правильными настройками для текстовых данных
      // eslint-disable-next-line new-cap
      const response = await $api.GET("/code/download", {
        params: {
          query: {
            shiftId: shift.id,
            includeBoxes: includeBoxes,
          },
        },
        parseAs: "text", // Указываем, что ожидаем текст, а не JSON
      });

      if (response.error) {
        // eslint-disable-next-line no-console
        console.error("Ошибка при скачивании кодов:", response.error);
        return;
      }

      // Создаем blob и скачиваем файл
      const blob = new Blob([response.data as string], {
        type: "text/plain; charset=utf-8",
      });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `codes_${shift.id}${includeBoxes ? "_with_boxes" : ""}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Ошибка при скачивании кодов:", error);
    }
  };

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
        await updateShift(shift.id, updateData as any);
        Number(await updateShift(shift.id, updateData as UpdateShiftDto));
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

          <div className={s.content}>
            <div className={s.field}>
              <TextComponent className={s.fieldLabel} variant="subheader-1">
                ID смены
              </TextComponent>
              <TextComponent className={s.fieldValue} variant="body-2">
                {shift?.id || "—"}
              </TextComponent>
            </div>
            <div
              className={`${s.field} ${currentState === "edit" ? s.editField : ""}`}
            >
              <TextComponent className={s.fieldLabel} variant="subheader-1">
                Дата смены
              </TextComponent>
              {currentState === "edit" ? (
                <input
                  type="date"
                  value={formatDateForInput(editForm.plannedDate)}
                  onChange={(e) =>
                    setEditForm({ ...editForm, plannedDate: e.target.value })
                  }
                  className={s.dateInput}
                />
              ) : (
                <TextComponent className={s.fieldValue} variant="body-2">
                  {formatDate(shift?.plannedDate)}
                </TextComponent>
              )}
            </div>
            <div className={s.field}>
              <TextComponent className={s.fieldLabel} variant="subheader-1">
                Продукция
              </TextComponent>
              <TextComponent className={s.fieldValue} variant="body-2">
                {shift?.product?.shortName || shift?.product?.fullName || "—"}
              </TextComponent>
            </div>
            <div className={s.field}>
              <TextComponent className={s.fieldLabel} variant="subheader-1">
                Объем (л)
              </TextComponent>
              <TextComponent className={s.fieldValue} variant="body-2">
                {shift?.product?.volume || "—"}
              </TextComponent>
            </div>
            {shift?.product?.pictureUrl && (
              <div className={s.field}>
                <TextComponent className={s.fieldLabel} variant="subheader-1">
                  Изображение продукции
                </TextComponent>
                <div className={s.imageContainer}>
                  <img
                    src={shift.product.pictureUrl}
                    alt={`${shift.product.fullName || shift.product.shortName} - Изображение продукции`}
                    className={s.productImage}
                  />
                </div>
              </div>
            )}
            <div
              className={`${s.field} ${currentState === "edit" ? s.editField : ""}`}
            >
              <TextComponent className={s.fieldLabel} variant="subheader-1">
                Запланированное количество
              </TextComponent>
              {currentState === "edit" ? (
                <TextInput
                  type="number"
                  value={String(editForm.plannedCount || "")}
                  onUpdate={(value) =>
                    setEditForm({
                      ...editForm,
                      plannedCount: value ? Number(value) : 0,
                    })
                  }
                  placeholder="Введите количество"
                />
              ) : (
                <TextComponent className={s.fieldValue} variant="body-2">
                  {shift?.plannedCount || "—"}
                </TextComponent>
              )}
            </div>
            {shift?.factCount !== undefined && shift?.factCount !== null && (
              <div className={s.progressField}>
                <TextComponent className={s.fieldLabel} variant="subheader-1">
                  Прогресс выполнения
                </TextComponent>
                <div className={s.progressContainer}>
                  <div className={s.progressInfo}>
                    <TextComponent variant="body-2">
                      Выполнено: {shift.factCount} из {shift.plannedCount}
                    </TextComponent>
                    <TextComponent variant="body-2" color="brand">
                      {getProgressPercentage()}%
                    </TextComponent>
                  </div>
                  <div className={s.progressBar}>
                    <div
                      className={s.progressFill}
                      style={{ width: `${getProgressPercentage()}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className={s.field}>
              <TextComponent className={s.fieldLabel} variant="subheader-1">
                Упаковка
              </TextComponent>
              <div className={s.checkboxField}>
                <Checkbox
                  checked={
                    currentState === "edit"
                      ? editForm.packing || false
                      : shift?.packing || false
                  }
                  disabled={currentState !== "edit"}
                  content="Требуется упаковка"
                  onUpdate={(checked) =>
                    currentState === "edit" &&
                    setEditForm({ ...editForm, packing: checked })
                  }
                />
              </div>
            </div>
            {((currentState === "edit" && editForm.packing) ||
              (currentState === "view" && shift?.packing)) && (
              <div
                className={`${s.field} ${currentState === "edit" ? s.editField : ""}`}
              >
                <TextComponent className={s.fieldLabel} variant="subheader-1">
                  Количество в коробе
                </TextComponent>
                {currentState === "edit" ? (
                  <Select
                    value={[String(editForm.countInBox || "1")]}
                    options={COUNT_IN_BOX_OPTIONS}
                    onUpdate={(value) =>
                      setEditForm({
                        ...editForm,
                        countInBox: Number(value[0]) || 1,
                      })
                    }
                    placeholder="Выберите количество"
                  />
                ) : (
                  <TextComponent className={s.fieldValue} variant="body-2">
                    {shift?.countInBox || "—"}
                  </TextComponent>
                )}
              </div>
            )}
            <div className={s.downloadSection}>
              <TextComponent className={s.fieldLabel} variant="subheader-1">
                Скачать коды
              </TextComponent>
              <div className={s.downloadButtons}>
                <Button
                  view="normal"
                  size="l"
                  onClick={() => downloadCodes(false)}
                  qa="shift.info.download.codes"
                >
                  <Icon data={ArrowDownToLine} size={18} />
                  Скачать коды
                </Button>
                <Button
                  view="outlined"
                  size="l"
                  onClick={() => downloadCodes(true)}
                  disabled={
                    currentState === "edit"
                      ? !editForm.packing
                      : !shift?.packing
                  }
                  qa="shift.info.download.codesWithBoxes"
                >
                  <Icon data={ArrowDownToLine} size={18} />
                  Скачать коды с коробами
                </Button>
              </div>
            </div>
          </div>
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
