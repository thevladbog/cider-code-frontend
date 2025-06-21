import { $api } from "@/lib/api";
import { CreatedUserDto, IUserFindMany } from "@/lib/types/openapi";
import { createStore } from "@/lib/zustand";
import { showErrorToast, showSuccessToast } from "@/lib/toaster";

// Validation function to check if data conforms to IUserFindMany structure
const validateUserFindManyResponse = (data: unknown): data is IUserFindMany => {
  if (!data || typeof data !== "object") {
    return false;
  }

  const obj = data as Record<string, unknown>;

  // Check required properties and their types
  return (
    Array.isArray(obj.result) &&
    typeof obj.total === "number" &&
    typeof obj.page === "number" &&
    typeof obj.limit === "number" &&
    typeof obj.totalPage === "number" &&
    // Basic validation that result contains objects (more detailed validation could be added)
    obj.result.every((item) => item && typeof item === "object")
  );
};

// Validation function to check if data conforms to single user response structure
const validateUserResponse = (
  data: unknown,
): data is { result: CreatedUserDto } => {
  if (!data || typeof data !== "object") {
    return false;
  }

  const obj = data as Record<string, unknown>;
  const result = obj.result;

  if (!result || typeof result !== "object") {
    return false;
  }

  const user = result as Record<string, unknown>;

  // Check required CreatedUserDto properties
  return (
    typeof user.id === "string" &&
    typeof user.email === "string" &&
    typeof user.firstName === "string" &&
    typeof user.lastName === "string" &&
    typeof user.role === "string" &&
    (user.picture === null || typeof user.picture === "string")
  );
};

interface IUsersState {
  data: IUserFindMany | null;
  isLoading: boolean;
  search?: string;
  oneUser: CreatedUserDto | null;
  isOneUserLoading: boolean;
}

const initialState: IUsersState = {
  data: null,
  isLoading: false,
  search: undefined,
  oneUser: null,
  isOneUserLoading: false,
};

export const useUsersStore = createStore(
  initialState,
  (setState, getState) => {
    const setSearch = (search?: string) => {
      setState({ search });
    };

    const getUsers = async (params: { page: number; limit: number }) => {
      try {
        setState({ isLoading: true });

        // eslint-disable-next-line new-cap
        const { data, error } = await $api.GET("/user", {
          params: {
            query: {
              page: params.page,
              limit: params.limit,
            },
          },
        });

        if (error) {
          throw new Error("Ошибка при загрузке пользователей");
        }

        if (!validateUserFindManyResponse(data)) {
          throw new Error("Некорректные данные от сервера");
        }

        setState({ data, isLoading: false });
      } catch (error) {
        showErrorToast("Не удалось загрузить список пользователей", error);
        setState({ isLoading: false });
      }
    };

    const searchUsers = async (params: {
      page: number;
      limit: number;
      search?: string;
    }) => {
      try {
        setState({ isLoading: true });

        // eslint-disable-next-line new-cap
        const { data, error } = await $api.GET("/user", {
          params: {
            query: {
              page: params.page,
              limit: params.limit,
              search: params.search,
            },
          },
        });

        if (error) {
          throw new Error("Ошибка при поиске пользователей");
        }

        if (!validateUserFindManyResponse(data)) {
          throw new Error("Некорректные данные от сервера");
        }

        setState({ data, isLoading: false });
      } catch (error) {
        showErrorToast("Не удалось найти пользователей", error);
        setState({ isLoading: false });
      }
    };

    const getOneUser = async (userId: string) => {
      try {
        setState({ isOneUserLoading: true });

        // eslint-disable-next-line new-cap
        const { data, error } = await $api.GET("/user/{id}", {
          params: {
            path: { id: userId },
          },
        });

        if (error) {
          throw new Error("Ошибка при загрузке пользователя");
        }

        if (!validateUserResponse(data)) {
          throw new Error("Некорректные данные пользователя от сервера");
        }

        setState({
          oneUser: data.result,
          isOneUserLoading: false,
        });
      } catch (error) {
        showErrorToast("Не удалось загрузить данные пользователя", error);
        setState({ isOneUserLoading: false });
      }
    };

    const deleteUser = async (userId: string) => {
      try {
        // eslint-disable-next-line new-cap
        const { error } = await $api.DELETE("/user/{id}", {
          params: {
            path: { id: userId },
          },
        });

        if (error) {
          throw new Error("Ошибка при удалении пользователя");
        }

        // Перезагружаем данные после удаления
        const currentState = getState();
        if (currentState.search) {
          await searchUsers({
            page: 1,
            limit: 10,
            search: currentState.search,
          });
        } else {
          await getUsers({ page: 1, limit: 10 });
        }

        showSuccessToast("Пользователь успешно удален");
      } catch (error) {
        showErrorToast("Не удалось удалить пользователя", error);
      }
    };

    const updateUser = async (
      userId: string,
      updateData: {
        firstName?: string;
        lastName?: string;
        email?: string;
        role?: CreatedUserDto["role"];
        picture?: string;
      },
    ) => {
      try {
        // eslint-disable-next-line new-cap
        const { data, error } = await $api.PATCH("/user/{id}", {
          params: {
            path: { id: userId },
          },
          body: updateData,
        });

        if (error) {
          throw new Error("Ошибка при обновлении пользователя");
        }

        if (!validateUserResponse(data)) {
          throw new Error("Некорректные данные пользователя от сервера");
        }

        // Обновляем данные в store
        setState({
          oneUser: data.result,
        });

        // Перезагружаем список пользователей
        const currentState = getState();
        if (currentState.search) {
          await searchUsers({
            page: 1,
            limit: 10,
            search: currentState.search,
          });
        } else {
          await getUsers({ page: 1, limit: 10 });
        }

        showSuccessToast("Пользователь успешно обновлен");
        return data.result;
      } catch (error) {
        showErrorToast("Не удалось обновить пользователя", error);
        throw error;
      }
    };

    return {
      getUsers,
      searchUsers,
      deleteUser,
      setSearch,
      getOneUser,
      updateUser,
    };
  },
  "users-store",
);
