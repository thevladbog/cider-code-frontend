import { Footer } from "@gravity-ui/navigation";

import { useNavigate } from "@tanstack/react-router";

export const FooterWrapper = () => {
  const navigate = useNavigate();
  return (
    <Footer
      withDivider={true}
      moreButtonTitle="Show more"
      copyright={`@ ${new Date().getFullYear()} "BOTTLE [CODE]"`}
      menuItems={[
        {
          text: "Поддержка",
          href: "mailto:rebelapple@bottlecode.app",
          target: "blank",
        },
        {
          text: "Конфиденциальность",
          onClick: () => navigate({ to: "/privacy" }),
        },
      ]}
    />
  );
};
