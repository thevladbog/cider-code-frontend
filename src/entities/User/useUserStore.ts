import { $api } from "@/lib/api";
import { createAbortSignalFactory } from "@/lib/getAbortSignal";
import { CreatedUserDto } from "@/lib/types/openapi";
import { createStore } from "@/lib/zustand";
import { useToaster } from "@gravity-ui/uikit";

interface IUserState {
  data: CreatedUserDto | null;
  isLoading: boolean;
}

const initialState: IUserState = {
  data: null,
  isLoading: false,
};

const abortSignal = createAbortSignalFactory();

export const useUserStore = createStore(initialState, (setState) => {
  const { add } = useToaster();

  const loginUser = (email: string, password: string) => {
    setState({ isLoading: true });

    try {
      const { data } = $api.useQuery("post", "/user/auth/sign-in", {
        body: {
          email,
          password,
        },
        signal: abortSignal("loginUser"),
      });
      setState({ data });
    } catch (error) {
      add({
        name: "getUserInfo",
        title: `Что-то пошло не так ...`,
        content: `Ошибка: ${error}`,
        autoHiding: 5000,
        theme: "danger",
        isClosable: true,
      });
    } finally {
      setState({ isLoading: false });
    }
  };

  const getUserInfo = () => {
    setState({ isLoading: true });

    try {
      const { data } = $api.useQuery("get", "/user/me", {
        signal: abortSignal("getUserInfo"),
      });

      if (data) {
        setState({ data: data.result });
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      add({
        name: "getUserInfo",
        title: `Что-то пошло не так ...`,
        content: `Ошибка: ${error}`,
        autoHiding: 5000,
        theme: "danger",
        isClosable: true,
      });
    } finally {
      setState({ isLoading: false });
    }
  };

  return { getUserInfo, loginUser };
});

export const { getUserInfo, loginUser } = useUserStore.getState();
