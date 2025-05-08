import { $api } from "@/lib/api";
import { CreateUserDto, CreatedUserDto } from "@/lib/types/openapi";
import { createStore } from "@/lib/zustand";
import { Toaster } from "@gravity-ui/uikit";

interface IUserState {
  data: CreatedUserDto | null;
  isLoading: boolean;
  isLogoutLoading: boolean;
}

const initialState: IUserState = {
  data: null,
  isLoading: false,
  isLogoutLoading: false,
};

const toaster = new Toaster();

export const useUserStore = createStore(initialState, (setState, getState) => {
  const login = async (email: string, password: string) => {
    setState({ isLoading: true });

    try {
      // eslint-disable-next-line new-cap
      const { data } = await $api.POST("/user/auth/sign-in", {
        body: {
          email,
          password,
        },
      });

      setState({ data });

      return data;
    } catch (error) {
      toaster.add({
        name: "login",
        title: "Что-то пошло не так ...",
        content: `При входе в систему произошла ошибка. Пожалуйста, проверьте свои учетные данные и попробуйте еще раз.`,
        isClosable: true,
        theme: "danger",
      });
      throw new Error("Something went wrong: " + error);
    } finally {
      setState({ isLoading: false });
    }
  };

  const register = async (props: CreateUserDto) => {
    try {
      // eslint-disable-next-line new-cap
      const { data } = await $api.POST("/user", {
        body: props,
      });

      setState({ data: data?.result });

      return data;
    } catch (error) {
      toaster.add({
        name: "register",
        title: "Что-то пошло не так ...",
        content: `При регистрации произошла ошибка. Пожалуйста, попробуйте еще раз.`,
        isClosable: true,
        theme: "danger",
      });
      throw new Error("Something went wrong: " + error);
    }
  };

  const logout = async () => {
    setState({ isLogoutLoading: true });
    try {
      // eslint-disable-next-line new-cap
      await $api.POST("/user/auth/revoke-token");

      setState(initialState);
    } catch (error) {
      toaster.add({
        name: "logout",
        title: "Что-то пошло не так ...",
        content: `При выходе из системы произошла ошибка. Пожалуйста, попробуйте еще раз.`,
        isClosable: true,
        theme: "danger",
      });
      throw new Error("Something went wrong: " + error);
    } finally {
      setState({ isLogoutLoading: false });
      document.location.assign("/");
    }
  };

  const getDataAboutMe = async () => {
    setState({ isLoading: true });
    try {
      // eslint-disable-next-line new-cap
      const { data } = await $api.GET("/user/auth/me");

      setState({ data: data?.result });

      return data;
    } catch (error) {
      toaster.add({
        name: "getDataAboutMe",
        title: "Что-то пошло не так ...",
        content: `При получении данных произошла ошибка. Вы будете разлогинены!`,
        isClosable: true,
        theme: "danger",
      });
      throw new Error("Something went wrong: " + error);
    } finally {
      setState({ isLoading: false });
    }
  };

  const isAuth = () => {
    const state = getState();
    return Boolean(state.data);
  };

  return { login, logout, getDataAboutMe, isAuth, register };
});

export const { login, logout, getDataAboutMe, isAuth, register } =
  useUserStore.getState();

export const user = {
  login,
  logout,
  getDataAboutMe,
  isAuth,
  register,
};
