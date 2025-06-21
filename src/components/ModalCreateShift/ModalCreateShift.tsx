import { useShiftStore } from "@/entities/Shift";
import { useProductStore } from "@/entities/Product/useProductStore";
import { CreateShiftDto } from "@/lib/types/openapi";
import { useForm } from "@tanstack/react-form";
import {
  Button,
  Checkbox,
  Modal,
  Select,
  TextInput,
  Text as TextWrapper,
} from "@gravity-ui/uikit";
import { DatePicker } from "@gravity-ui/date-components";
import { dateTime } from "@gravity-ui/date-utils";
import React from "react";
import { useShallow } from "zustand/react/shallow";

import s from "./ModalCreateShift.module.scss";

export interface IModalCreateShiftProps {
  visible: boolean;
  onClose: () => void;
}

export const ModalCreateShift = (props: IModalCreateShiftProps) => {
  const { visible, onClose } = props;

  const [createShiftWithIdCheck, generateShiftId, isChangeLoading] =
    useShiftStore(
      useShallow((store) => [
        store.createShiftWithIdCheck,
        store.generateShiftId,
        store.isChangeLoading,
      ]),
    );

  const products = useProductStore((store) => store.data);
  const getProducts = useProductStore((store) => store.getProducts);

  // Загружаем продукты при открытии модального окна
  React.useEffect(() => {
    if (visible && !products) {
      getProducts({ page: 1, limit: 100 });
    }
  }, [visible, products, getProducts]);

  const form = useForm({
    defaultValues: {
      plannedDate: dateTime(), // сегодняшняя дата как DateTime объект
      productId: "",
      plannedCount: 1,
      packing: true,
      countInBox: 1,
      shiftId: generateShiftId ? generateShiftId(dateTime()) : "", // ID смены
    },
    onSubmit: async (formProps) => {
      const { value } = formProps;
      try {
        const baseBody = {
          status: CreateShiftDto.status.PLANNED,
          plannedDate: value.plannedDate
            ? value.plannedDate.toISOString()
            : dateTime().toISOString(),
          productId: value.productId,
          plannedCount: value.plannedCount,
          factCount: null,
          packing: value.packing,
          countInBox: value.packing ? value.countInBox : null,
        };

        await createShiftWithIdCheck(baseBody, value.plannedDate);

        // Успешно создано - закрываем модальное окно и сбрасываем форму
        onClose();
        form.reset();
      } catch {
        // Ошибка уже обработана в сторе через тостеры
      }
    },
  });

  const countInBoxOptions = [
    { value: "1", content: "1 шт" },
    { value: "6", content: "6 шт" },
    { value: "20", content: "20 шт" },
  ];

  const productOptions = React.useMemo(() => {
    if (!products?.result) return [];

    return products.result.map((product) => ({
      value: product.id,
      content: product.fullName,
    }));
  }, [products]);

  return (
    <Modal open={visible} onClose={onClose} qa="modal.createShift">
      <div className={s.root}>
        <div className={s.header}>
          <TextWrapper
            variant="header-2"
            className={s.title}
            qa="modal.createShift.title"
          >
            Создание новой смены
          </TextWrapper>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className={s.formField}>
            <form.Field
              name="plannedDate"
              children={(field) => (
                <>
                  <TextWrapper
                    as="label"
                    qa="modal.createShift.plannedDate.label"
                  >
                    Дата смены *
                  </TextWrapper>
                  <DatePicker
                    value={field.state.value}
                    onUpdate={(value) => {
                      const newDate = value || dateTime();
                      field.handleChange(newDate);
                      // Обновляем ID смены при изменении даты
                      if (generateShiftId) {
                        const newId = generateShiftId(newDate);
                        form.setFieldValue("shiftId", newId);
                      }
                    }}
                    size="l"
                    format="DD.MM.YYYY г."
                  />
                </>
              )}
            />
          </div>

          <div className={s.formField}>
            <form.Field
              name="shiftId"
              children={(field) => (
                <>
                  <TextWrapper as="label" qa="modal.createShift.shiftId.label">
                    ID смены
                  </TextWrapper>
                  <TextInput
                    value={field.state.value}
                    onUpdate={(value) => field.handleChange(value)}
                    qa="modal.createShift.shiftId.input"
                    size="l"
                    placeholder="BC-MMDD"
                    disabled // Поле только для чтения, обновляется автоматически
                  />
                </>
              )}
            />
          </div>

          <div className={s.formField}>
            <form.Field
              name="productId"
              children={(field) => (
                <>
                  <TextWrapper
                    as="label"
                    qa="modal.createShift.productId.label"
                  >
                    Продукт *
                  </TextWrapper>
                  <Select
                    value={field.state.value ? [field.state.value] : []}
                    onUpdate={(value) => field.handleChange(value[0] || "")}
                    options={productOptions}
                    placeholder="Выберите продукт"
                    qa="modal.createShift.productId.select"
                    size="l"
                  />
                </>
              )}
            />
          </div>

          <div className={s.formField}>
            <form.Field
              name="plannedCount"
              children={(field) => (
                <>
                  <TextWrapper
                    as="label"
                    qa="modal.createShift.plannedCount.label"
                  >
                    Запланированное количество *
                  </TextWrapper>
                  <TextInput
                    type="number"
                    value={String(field.state.value)}
                    onUpdate={(value) => field.handleChange(Number(value) || 1)}
                    qa="modal.createShift.plannedCount.input"
                    size="l"
                  />
                </>
              )}
            />
          </div>

          <div className={s.formField}>
            <form.Field
              name="packing"
              children={(field) => (
                <Checkbox
                  checked={field.state.value}
                  onUpdate={(checked) => field.handleChange(checked)}
                  className={s.checkbox}
                  qa="modal.createShift.packing.checkbox"
                  size="l"
                >
                  Упаковка
                </Checkbox>
              )}
            />
          </div>

          <form.Field
            name="packing"
            children={(packingField) =>
              packingField.state.value && (
                <div className={s.formField}>
                  <form.Field
                    name="countInBox"
                    children={(field) => (
                      <>
                        <TextWrapper
                          as="label"
                          qa="modal.createShift.countInBox.label"
                        >
                          Количество в коробе
                        </TextWrapper>
                        <Select
                          value={[String(field.state.value)]}
                          onUpdate={(value) =>
                            field.handleChange(Number(value[0]))
                          }
                          options={countInBoxOptions}
                          qa="modal.createShift.countInBox.select"
                          size="l"
                        />
                      </>
                    )}
                  />
                </div>
              )
            }
          />

          <div className={s.actions}>
            <Button
              type="button"
              view="outlined"
              onClick={onClose}
              qa="modal.createShift.cancel"
              size="l"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              view="action"
              loading={isChangeLoading}
              qa="modal.createShift.submit"
              size="l"
            >
              Создать смену
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
