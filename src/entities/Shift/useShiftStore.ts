import { $api } from "@/lib/api";
import {
  CreateShiftDto,
  IShiftFindMany,
  IShiftFindOne,
  OperatorShiftDto,
  UpdateShiftDto,
} from "@/lib/types/openapi";
import { createStore } from "@/lib/zustand";
import { Toaster } from "@gravity-ui/uikit";
import { dateTime } from "@gravity-ui/date-utils";

interface IShiftState {
  data: IShiftFindMany | null;
  isLoading: boolean;
  search: string | undefined;
  oneShift: OperatorShiftDto | null;
  isChangeLoading: boolean;
  isError: boolean;
}

const initialState: IShiftState = {
  data: null,
  isLoading: false,
  search: undefined,
  oneShift: null,
  isChangeLoading: false,
  isError: false,
};

const toaster = new Toaster();

export const useShiftStore = createStore(initialState, (setState) => {
  const getShifts = async ({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }) => {
    setState({ isLoading: true });

    // eslint-disable-next-line new-cap
    const { data, error } = await $api.GET("/shift", {
      params: {
        query: {
          page,
          limit,
        },
      },
    });

    if (error) {
      toaster.add({
        name: "getShifts",
        title: "Что-то пошло не так ...",
        content: `При запросе смен произошла ошибка`,
        isClosable: true,
        theme: "danger",
      });
      setState({ isLoading: false });
      throw new Error("Something went wrong: " + error);
    }

    setState({
      data: data as IShiftFindMany,
      isLoading: false,
    });
  };
  const getOneShift = async (id: string) => {
    setState({ isLoading: true });

    // eslint-disable-next-line new-cap
    const { data, error } = await $api.GET("/shift/{id}", {
      params: {
        path: { id },
      },
    });

    if (error) {
      toaster.add({
        name: "getOneShift",
        title: "Что-то пошло не так ...",
        content: `При запросе смены произошла ошибка`,
        isClosable: true,
        theme: "danger",
      });
      setState({ isLoading: false });
      throw new Error("Something went wrong: " + error);
    }

    setState({ oneShift: (data as IShiftFindOne)?.result, isLoading: false });
  };

  // Метод для проверки существования смены по ID (без показа ошибки)
  const checkShiftExists = async (id: string): Promise<boolean> => {
    // eslint-disable-next-line new-cap
    const response = await $api.GET("/shift/{id}", {
      params: {
        path: { id },
      },
    });

    // В openapi-fetch ошибки возвращаются в response.error
    if (response.error) {
      // Проверяем статус ошибки
      if (response.response?.status === 404) {
        return false; // Смена не найдена
      }
      // Если другая ошибка - пробрасываем её
      throw new Error(`HTTP ${response.response?.status}: ${response.error}`);
    }

    // Если нет ошибки, значит смена найдена
    return true;
  };

  // Генерация ID смены (перенесено из компонента)
  const generateShiftId = (date?: ReturnType<typeof dateTime>, counter = 0) => {
    const targetDate = date || dateTime();
    const nativeDate = new Date(targetDate.toISOString());
    const month = String(nativeDate.getMonth() + 1).padStart(2, "0");
    const day = String(nativeDate.getDate()).padStart(2, "0");
    const suffix = counter > 0 ? `-${counter}` : "";
    return `BC-${month}${day}${suffix}`;
  };

  // Метод для создания смены с автоматической проверкой уникальности ID
  const createShiftWithIdCheck = async (
    baseBody: Omit<CreateShiftDto, "id">,
    plannedDate: ReturnType<typeof dateTime>,
  ): Promise<void> => {
    setState({ isChangeLoading: true, isError: false });

    let counter = 0;
    const maxRetries = 10;

    while (counter <= maxRetries) {
      const shiftId = generateShiftId(plannedDate, counter);
      const exists = await checkShiftExists(shiftId);

      if (!exists) {
        // Смена с таким ID не существует, можно создавать
        const body: CreateShiftDto = {
          ...baseBody,
          id: shiftId,
        };

        // eslint-disable-next-line new-cap
        const { error } = await $api.POST("/shift", { body });

        if (error) {
          setState({ isChangeLoading: false, isError: true });
          toaster.add({
            name: "createShift",
            title: "Что-то пошло не так ...",
            content: `При создании смены произошла ошибка`,
            isClosable: true,
            theme: "danger",
          });
          throw new Error("Something went wrong: " + error);
        }

        toaster.add({
          name: "createShift",
          title: "Успешно!",
          content: `Смена была успешно создана с ID: ${shiftId}`,
          isClosable: true,
          theme: "success",
        });

        setState({ isChangeLoading: false });
        return; // Успешно создано
      }

      // Смена с таким ID уже существует, пробуем следующий
      counter++;
    }

    // Если превышено максимальное количество попыток
    setState({ isChangeLoading: false, isError: true });
    const errorMessage = `Не удалось создать смену: превышено максимальное количество попыток (${maxRetries})`;
    toaster.add({
      name: "createShift",
      title: "Ошибка создания смены",
      content: errorMessage,
      isClosable: true,
      theme: "danger",
    });
    throw new Error(errorMessage);
  };
  const createShift = async (body: CreateShiftDto) => {
    setState({ isChangeLoading: true, isError: false });

    // eslint-disable-next-line new-cap
    const { error } = await $api.POST("/shift", { body });

    if (error) {
      setState({ isChangeLoading: false, isError: true });
      return;
    }

    toaster.add({
      name: "createShift",
      title: "Успешно!",
      content: `Смена была успешно создана`,
      isClosable: true,
      theme: "success",
    });

    setState({ isChangeLoading: false });
  };
  const updateShift = async (id: string, body: UpdateShiftDto) => {
    setState({ isChangeLoading: true });

    // eslint-disable-next-line new-cap
    const { error } = await $api.PATCH("/shift/{id}", {
      params: { path: { id } },
      body,
    });

    if (error) {
      toaster.add({
        name: "updateShift",
        title: "Что-то пошло не так ...",
        content: `При обновлении смены произошла ошибка`,
        isClosable: true,
        theme: "danger",
      });
      setState({ isChangeLoading: false });
      throw new Error("Something went wrong: " + error);
    }

    toaster.add({
      name: "updateShift",
      title: "Успешно!",
      content: `Смена была успешно обновлена`,
      isClosable: true,
      theme: "success",
    });

    setState({ isChangeLoading: false });
  };
  const deleteShift = async (id: string) => {
    setState({ isChangeLoading: true });

    // eslint-disable-next-line new-cap
    const { error } = await $api.DELETE("/shift/{id}", {
      params: { path: { id } },
    });

    if (error) {
      toaster.add({
        name: "deleteShift",
        title: "Что-то пошло не так ...",
        content: `При удалении смены произошла ошибка`,
        isClosable: true,
        theme: "danger",
      });
      setState({ isChangeLoading: false });
      throw new Error("Something went wrong: " + error);
    }

    toaster.add({
      name: "deleteShift",
      title: "Успешно!",
      content: `Смена была успешно удалена`,
      isClosable: true,
      theme: "success",
    });

    setState({ isChangeLoading: false });
  };

  const setSearch = (search: string | undefined) => {
    setState({ search });
  };

  const clearOneShift = () => {
    setState({ oneShift: null });
  };
  return {
    getShifts,
    getOneShift,
    createShift,
    updateShift,
    deleteShift,
    setSearch,
    clearOneShift,
    checkShiftExists,
    createShiftWithIdCheck,
    generateShiftId,
  };
});
