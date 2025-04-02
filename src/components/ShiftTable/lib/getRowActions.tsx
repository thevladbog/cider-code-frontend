import { IShiftData } from '@/app/lib/types';
import { TableActionConfig } from '@gravity-ui/uikit';

export const getRowActions = (): TableActionConfig<IShiftData>[] => {
  return [
    {
      text: 'Открыть',
      handler: () => {},
    },
    {
      text: 'Удалить',
      handler: () => {},
      theme: 'danger',
    },
  ];
};
