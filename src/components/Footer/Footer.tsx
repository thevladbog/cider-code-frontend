import { Footer } from "@gravity-ui/navigation";

import s from "./Footer.module.scss";

export const FooterWrapper = () => {
  return (
    <>
      <Footer
        className={s.footer}
        withDivider={true}
        moreButtonTitle="Show more"
        copyright={`@ ${new Date().getFullYear()} "BOTTLE [CODE]"`}
        menuItems={[
          {
            text: "Поддержка",
            href: "https://gravity-ui.com/",
            target: "blank",
          },
          {
            text: "Конфиденциальность",
            href: "https://gravity-ui.com/",
            target: "blank",
          },
        ]}
      />
    </>
  );
};
