import { useContext } from 'react';
import { DialogContext } from '../contexts/dialogContext.tsx';

export const useDialog = () => {
  return useContext(DialogContext);
};
