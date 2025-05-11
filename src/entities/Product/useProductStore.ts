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

      try {
        // eslint-disable-next-line new-cap
        const { data } = await $api.GET("/product", {
          params: {
            query: {
              page,
              limit,
              search,
            },
          },
        });

        setState({
          data: data as IProductFindMany,
        });
      } catch (error) {
        toaster.add({
          name: "getProducts",
          title: "Что-то пошло не так ...",
          content: `При запросе продукции произошла ошибка`,
          isClosable: true,
          theme: "danger",
        });
        throw new Error("Something went wrong: " + error);
      } finally {
        setState({ isLoading: false });
      }
    };

    const getOneProduct = async (id: string) => {
      setState({ isLoading: true });
      try {
        // eslint-disable-next-line new-cap
        const { data } = await $api.GET("/product/{id}", {
          params: {
            path: { id },
          },
        });

        setState({ oneProduct: data as SelectProductDto });
      } catch (error) {
        toaster.add({
          name: "getOneProduct",
          title: "Что-то пошло не так ...",
          content: `При запросе продукции произошла ошибка`,
          isClosable: true,
          theme: "danger",
        });
        throw new Error("Something went wrong: " + error);
      } finally {
        setState({ isLoading: false });
      }
    };

    const createProduct = async (body: CreateProductDto) => {
      try {
        // eslint-disable-next-line new-cap
        await $api.POST("/product", { body });

        const currentState = getState();

        await getProducts({ page: 1, limit: currentState.data?.limit ?? 5 });
      } catch (error) {
        toaster.add({
          name: "createProduct",
          title: "Что-то пошло не так ...",
          content: `При создании продукции произошла ошибка`,
          isClosable: true,
          theme: "danger",
        });
        throw new Error("Something went wrong: " + error);
      }
    };

    const deleteProduct = async (id: string) => {
      setState({ isLoading: true });
      try {
        // eslint-disable-next-line new-cap
        await $api.DELETE("/product/{id}", {
          params: {
            path: {
              id,
            },
          },
        });

        const currentState = getState();

        await getProducts({ page: 1, limit: currentState.data?.limit ?? 5 });
      } catch (error) {
        toaster.add({
          name: "deleteProduct",
          title: "Что-то пошло не так ...",
          content: `При удалении продукции произошла ошибка`,
          isClosable: true,
          theme: "danger",
        });
        throw new Error("Something went wrong: " + error);
      } finally {
        setState({ isLoading: false });
      }
    };

    const setSearch = async (search: string) => {
      setState({ search });

      await sleep(3);

      const currentState = getState();

      await getProducts({ page: 1, limit: currentState.data?.limit ?? 5 });
    };

    const changeProduct = async (id: string, body: UpdateProductDto) => {
      setState({ isChangeLoading: true });
      try {
        // eslint-disable-next-line new-cap
        const { data } = await $api.PATCH("/product/{id}", {
          params: {
            path: { id },
          },
          body,
        });

        const currentState = getState();
        setState({ oneProduct: data as SelectProductDto });
        await getProducts({ page: 1, limit: currentState.data?.limit ?? 5 });
      } catch (error) {
        toaster.add({
          name: "changeProduct",
          title: "Что-то пошло не так ...",
          content: `При изменении продукции произошла ошибка`,
          isClosable: true,
          theme: "danger",
        });
        throw new Error("Something went wrong: " + error);
      } finally {
        setState({ isChangeLoading: false });
      }
    };

    const changeProductStatus = async (
      id: string,
      status: SelectProductDto["status"],
    ) => {
      setState({ isChangeLoading: true });
      try {
        // eslint-disable-next-line new-cap
        const { data } = await $api.PATCH("/product/{id}/status", {
          params: {
            path: { id },
          },
          body: { status },
        });

        setState({ oneProduct: data as SelectProductDto });
        const currentState = getState();
        await getProducts({ page: 1, limit: currentState.data?.limit ?? 5 });
      } catch (error) {
        toaster.add({
          name: "changeProduct",
          title: "Что-то пошло не так ...",
          content: `При изменении продукции произошла ошибка`,
          isClosable: true,
          theme: "danger",
        });
        throw new Error("Something went wrong: " + error);
      } finally {
        setState({ isChangeLoading: false });
      }
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
