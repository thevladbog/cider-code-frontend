import { OperatorShiftDto } from "@/lib/types/openapi";
import {
  Button,
  Checkbox,
  Icon,
  Select,
  Text as TextComponent,
  TextInput,
} from "@gravity-ui/uikit";
import { ArrowDownToLine } from "@gravity-ui/icons";
import { useShiftDownload } from "../hooks/useShiftDownload";

import s from "../ShiftInfo.module.scss";

interface UpdateShiftData {
  plannedDate?: string;
  plannedCount?: number;
  packing?: boolean;
  countInBox?: number;
  status?: OperatorShiftDto.status;
}

interface ShiftEditFormProps {
  shift: OperatorShiftDto | null;
  editForm: UpdateShiftData;
  setEditForm: (data: UpdateShiftData) => void;
}

const COUNT_IN_BOX_OPTIONS = [
  { value: "1", content: "1" },
  { value: "6", content: "6" },
  { value: "20", content: "20" },
];

export const ShiftEditForm = ({
  shift,
  editForm,
  setEditForm,
}: ShiftEditFormProps) => {
  const { downloadCodes } = useShiftDownload();

  const formatDateForInput = (dateString?: unknown) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString as string);
      return date.toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  const getProgressPercentage = () => {
    if (!shift?.plannedCount || !shift?.factCount) return 0;
    return Math.round((shift.factCount / shift.plannedCount) * 100);
  };

  if (!shift) return null;

  return (
    <div className={s.content}>
      <div className={s.field}>
        <TextComponent className={s.fieldLabel} variant="subheader-1">
          ID смены
        </TextComponent>
        <TextComponent className={s.fieldValue} variant="body-2">
          {shift.id || "—"}
        </TextComponent>
      </div>

      <div className={`${s.field} ${s.editField}`}>
        <TextComponent className={s.fieldLabel} variant="subheader-1">
          Дата смены
        </TextComponent>
        <input
          type="date"
          value={formatDateForInput(editForm.plannedDate)}
          onChange={(e) =>
            setEditForm({ ...editForm, plannedDate: e.target.value })
          }
          className={s.dateInput}
        />
      </div>

      <div className={s.field}>
        <TextComponent className={s.fieldLabel} variant="subheader-1">
          Продукция
        </TextComponent>
        <TextComponent className={s.fieldValue} variant="body-2">
          {shift.product?.shortName || shift.product?.fullName || "—"}
        </TextComponent>
      </div>

      <div className={s.field}>
        <TextComponent className={s.fieldLabel} variant="subheader-1">
          Объем (л)
        </TextComponent>
        <TextComponent className={s.fieldValue} variant="body-2">
          {shift.product?.volume || "—"}
        </TextComponent>
      </div>

      {shift.product?.pictureUrl && (
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

      <div className={`${s.field} ${s.editField}`}>
        <TextComponent className={s.fieldLabel} variant="subheader-1">
          Запланированное количество
        </TextComponent>
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
      </div>

      {shift.factCount !== undefined && shift.factCount !== null && (
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
            checked={editForm.packing || false}
            content="Требуется упаковка"
            onUpdate={(checked) =>
              setEditForm({ ...editForm, packing: checked })
            }
          />
        </div>
      </div>

      {editForm.packing && (
        <div className={`${s.field} ${s.editField}`}>
          <TextComponent className={s.fieldLabel} variant="subheader-1">
            Количество в коробе
          </TextComponent>
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
            size="l"
          />
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
            onClick={() => shift && downloadCodes(shift, false)}
            qa="shift.info.download.codes"
          >
            <Icon data={ArrowDownToLine} size={18} />
            Скачать коды
          </Button>
          <Button
            view="outlined"
            size="l"
            onClick={() => shift && downloadCodes(shift, true)}
            disabled={!editForm.packing}
            qa="shift.info.download.codesWithBoxes"
          >
            <Icon data={ArrowDownToLine} size={18} />
            Скачать коды с коробами
          </Button>
        </div>
      </div>
    </div>
  );
};

export type { UpdateShiftData };
