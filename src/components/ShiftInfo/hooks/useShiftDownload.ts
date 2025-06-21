import { $api } from "@/lib/api";
import { OperatorShiftDto } from "@/lib/types/openapi";

export const useShiftDownload = () => {
  const downloadCodes = async (
    shift: OperatorShiftDto,
    includeBoxes = false,
  ) => {
    if (!shift?.id) return;

    try {
      // eslint-disable-next-line new-cap
      const response = await $api.GET("/code/download", {
        params: {
          query: {
            shiftId: shift.id,
            includeBoxes: includeBoxes,
          },
        },
        parseAs: "text",
      });

      if (response.error) {
        // eslint-disable-next-line no-console
        console.error("Ошибка при скачивании кодов:", response.error);
        return;
      }

      // Создаем blob и скачиваем файл
      const blob = new Blob([response.data as string], {
        type: "text/plain; charset=utf-8",
      });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `codes_${shift.id}${includeBoxes ? "_with_boxes" : ""}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Ошибка при скачивании кодов:", error);
    }
  };

  return {
    downloadCodes,
  };
};
