import { $api } from "@/lib/api";
import {
  CreateProductDto,
  IProductFindMany,
  SelectProductDto,
  UpdateProductDto,
} from "@/lib/types/openapi";
import { createStore } from "@/lib/zustand";
import { Toaster } from "@gravity-ui/uikit";
import { sleep } from "../User/utils";

interface IProductState {
  data: IProductFindMany | null;
  isLoading: boolean;
  search: string | undefined;
  oneProduct: SelectProductDto | null;
  isChangeLoading: boolean;
}

const initialState: IProductState = {
  data: null,
  isLoading: false,
  search: undefined,
  oneProduct: null,
  isChangeLoading: false,
};

const toaster = new Toaster();

export const useProductStore = createStore(
  initialState,
  (setState, getState) => {
    const getProducts = async ({
      page,
      limit,
    }: {
      page: number;
      limit: number;
    }) => {
      setState({ isLoading: true });
      const { search } = getState();

      // eslint-disable-next-line new-cap
      const { data, error } = await $api.GET("/product", {
        params: {
          query: {
            page,
            limit,
            search,
          },
        },
      });

      if (error) {
        toaster.add({
          name: "getProducts",
          title: "Что-то пошло не так ...",
          content: `При запросе продукции произошла ошибка`,
          isClosable: true,
          theme: "danger",
        });
        setState({ isLoading: false });
        throw new Error("Something went wrong: " + error);
      }

      setState({
        data: data as IProductFindMany,
        isLoading: false,
      });
    };

    const getOneProduct = async (id: string) => {
      setState({ isLoading: true });

      // eslint-disable-next-line new-cap
      const { data, error } = await $api.GET("/product/{id}", {
        params: {
          path: { id },
        },
      });

      if (error) {
        toaster.add({
          name: "getOneProduct",
          title: "Что-то пошло не так ...",
          content: `При запросе продукции произошла ошибка`,
          isClosable: true,
          theme: "danger",
        });
        setState({ isLoading: false });
        throw new Error("Something went wrong: " + error);
      }

      setState({ oneProduct: data as SelectProductDto, isLoading: false });
    };

    const createProduct = async (body: CreateProductDto) => {
      // eslint-disable-next-line new-cap
      const { error } = await $api.POST("/product", { body });

      if (error) {
        toaster.add({
          name: "createProduct",
          title: "Что-то пошло не так ...",
          content: `При создании продукции произошла ошибка`,
          isClosable: true,
          theme: "danger",
        });
        throw new Error("Something went wrong: " + error);
      }

      const currentState = getState();
      await getProducts({ page: 1, limit: currentState.data?.limit ?? 5 });
    };

    const deleteProduct = async (id: string) => {
      setState({ isLoading: true });

      // eslint-disable-next-line new-cap
      const { error } = await $api.DELETE("/product/{id}", {
        params: {
          path: {
            id,
          },
        },
      });

      if (error) {
        toaster.add({
          name: "deleteProduct",
          title: "Что-то пошло не так ...",
          content: `При удалении продукции произошла ошибка`,
          isClosable: true,
          theme: "danger",
        });
        setState({ isLoading: false });
        throw new Error("Something went wrong: " + error);
      }

      const currentState = getState();
      await getProducts({ page: 1, limit: currentState.data?.limit ?? 5 });
      setState({ isLoading: false });
    };

    const setSearch = async (search: string) => {
      setState({ search });

      await sleep(3);

      const currentState = getState();

      await getProducts({ page: 1, limit: currentState.data?.limit ?? 5 });
    };

    const changeProduct = async (id: string, body: UpdateProductDto) => {
      setState({ isChangeLoading: true });

      // eslint-disable-next-line new-cap
      const { data, error } = await $api.PATCH("/product/{id}", {
        params: {
          path: { id },
        },
        body,
      });

      if (error) {
        toaster.add({
          name: "changeProduct",
          title: "Что-то пошло не так ...",
          content: `При изменении продукции произошла ошибка`,
          isClosable: true,
          theme: "danger",
        });
        setState({ isChangeLoading: false });
        throw new Error("Something went wrong: " + error);
      }

      const currentState = getState();
      setState({
        oneProduct: data as SelectProductDto,
        isChangeLoading: false,
      });
      await getProducts({ page: 1, limit: currentState.data?.limit ?? 5 });
    };

    const changeProductStatus = async (
      id: string,
      status: SelectProductDto["status"],
    ) => {
      setState({ isChangeLoading: true });

      // eslint-disable-next-line new-cap
      const { data, error } = await $api.PATCH("/product/{id}/status", {
        params: {
          path: { id },
        },
        body: { status },
      });

      if (error) {
        toaster.add({
          name: "changeProduct",
          title: "Что-то пошло не так ...",
          content: `При изменении продукции произошла ошибка`,
          isClosable: true,
          theme: "danger",
        });
        setState({ isChangeLoading: false });
        throw new Error("Something went wrong: " + error);
      }

      setState({
        oneProduct: data as SelectProductDto,
        isChangeLoading: false,
      });
      const currentState = getState();
      await getProducts({ page: 1, limit: currentState.data?.limit ?? 5 });
    };

    return {
      getProducts,
      createProduct,
      deleteProduct,
      setSearch,
      changeProduct,
      getOneProduct,
      changeProductStatus,
    };
  },
);

export const {
  getProducts,
  createProduct,
  deleteProduct,
  setSearch,
  changeProduct,
  getOneProduct,
  changeProductStatus,
} = useProductStore.getState();

export const product = {
  getProducts,
  createProduct,
  deleteProduct,
  setSearch,
  changeProduct,
  getOneProduct,
  changeProductStatus,
};
