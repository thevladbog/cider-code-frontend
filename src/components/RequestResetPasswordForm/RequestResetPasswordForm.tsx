import { useForm } from "@tanstack/react-form";
import {
  Button,
  TextInput,
  Text as TextWrapper,
  useToaster,
} from "@gravity-ui/uikit";
import { getRequestResetPasswordFormSchema } from "./lib/getScheme";

import s from "./RequestResetPasswordForm.module.scss";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { sleep } from "@/entities/User/utils";
import { useUserStore } from "@/entities/User/useUserStore";

export const RequestResetPasswordForm = () => {
  const scheme = getRequestResetPasswordFormSchema();
  const router = useRouter();
  const navigate = useNavigate();

  const { add } = useToaster();

  const sendResetRequest = useUserStore((state) => state.sendResetRequest);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: scheme,
    },
    onSubmit: async ({ value }) => {
      try {
        await sendResetRequest(value.email);
        await router.invalidate();

        await sleep(1);

        await navigate({ to: "/" });
      } catch (error) {
        add({
          name: "RequestResetPasswordForm",
          title: "Что-то пошло не так ...",
          content: `При попытке сделать запрос на сброс пароля произошла ошибка: ${JSON.stringify(error)}`,
          isClosable: true,
        });
      }
    },
  });

  return (
    <div className={s.body}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit().then();
        }}
      >
        <form.Field
          name="email"
          children={(field) => {
            return (
              <div className={s.fieldWrapper}>
                <label htmlFor={field.name}>
                  <TextWrapper
                    variant="body-1"
                    qa={`resetReq.${field.name}.label`}
                  >
                    Email:
                  </TextWrapper>
                </label>
                <TextInput
                  size={"l"}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className={s.field}
                  hasClear={true}
                  placeholder="Введите email"
                  qa={`auth.${field.name}.field`}
                  errorMessage={field.state.meta.errors
                    .map((err) => err?.message)
                    .join(", ")}
                  validationState={
                    field.state.meta.isTouched && field.state.meta.errors.length
                      ? "invalid"
                      : undefined
                  }
                />
              </div>
            );
          }}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className={s.buttons}>
              <Button
                type="reset"
                onClick={() => form.reset()}
                size="l"
                view="outlined"
                qa={`resetReq.button.reset`}
              >
                Сбросить данные формы
              </Button>
              <Button
                type="submit"
                disabled={!canSubmit}
                view={"action"}
                loading={isSubmitting}
                size="l"
                qa={`resetReq.button.submit`}
              >
                Сбросить пароль
              </Button>
            </div>
          )}
        />
      </form>
    </div>
  );
};
