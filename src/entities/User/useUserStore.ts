import { CreatedUserDto } from "@/lib/types/openapi";
import { createStore } from "@/lib/zustand";

interface IUserState {
  data: CreatedUserDto | null;
  isLoading: boolean;
}

const initialState: IUserState = {
  data: null,
  isLoading: false,
};

export const useUserStore = createStore(initialState, (setState) => {
  const setUserData = (isLoading?: boolean, data?: CreatedUserDto) => {
    setState({
      isLoading,
      data,
    });
  };

  return { setUserData };
});

export const { setUserData } = useUserStore.getState();
