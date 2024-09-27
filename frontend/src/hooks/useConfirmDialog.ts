import { useContext } from 'react';
import { ConfirmDialogContext } from '../contexts/confirmDialogContext.tsx';

export const useConfirmDialog = () => {
  return useContext(ConfirmDialogContext);
};
