import { OperatorShiftDto } from "@/lib/types/openapi";
import { Button, Icon, Text as TextComponent } from "@gravity-ui/uikit";
import { ArrowDownToLine } from "@gravity-ui/icons";
import { dateTime } from "@gravity-ui/date-utils";
import { useShiftDownload } from "../hooks/useShiftDownload";

import s from "../ShiftInfo.module.scss";

interface ShiftViewDisplayProps {
  shift: OperatorShiftDto | null;
}

export const ShiftViewDisplay = ({ shift }: ShiftViewDisplayProps) => {
  const { downloadCodes } = useShiftDownload();

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

      <div className={s.field}>
        <TextComponent className={s.fieldLabel} variant="subheader-1">
          Дата смены
        </TextComponent>
        <TextComponent className={s.fieldValue} variant="body-2">
          {formatDate(shift.plannedDate)}
        </TextComponent>
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

      <div className={s.field}>
        <TextComponent className={s.fieldLabel} variant="subheader-1">
          Запланированное количество
        </TextComponent>
        <TextComponent className={s.fieldValue} variant="body-2">
          {shift.plannedCount || "—"}
        </TextComponent>
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
        <TextComponent className={s.fieldValue} variant="body-2">
          {shift.packing ? "Требуется" : "Не требуется"}
        </TextComponent>
      </div>

      {shift.packing && (
        <div className={s.field}>
          <TextComponent className={s.fieldLabel} variant="subheader-1">
            Количество в коробе
          </TextComponent>
          <TextComponent className={s.fieldValue} variant="body-2">
            {shift.countInBox || "—"}
          </TextComponent>
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
            onClick={() => downloadCodes(shift, false)}
            qa="shift.info.download.codes"
          >
            <Icon data={ArrowDownToLine} size={18} />
            Скачать коды
          </Button>
          <Button
            view="outlined"
            size="l"
            onClick={() => downloadCodes(shift, true)}
            disabled={!shift.packing}
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
