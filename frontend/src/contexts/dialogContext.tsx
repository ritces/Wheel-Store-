import { createContext, useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';

export const DialogProvider = ({ children }) => {
  const [
    { children: dialogChildren, props: dialogProps, ...dialogParams },
    setDialog,
  ] = useState({ children: null });
  const [open, setOpen] = useState(false);

  const openDialog = (dialog) => {
    setDialog(dialog);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const contextValue = useRef({ openDialog, closeDialog });

  return (
    <DialogContext.Provider value={contextValue.current}>
      {children}
      <Dialog
        open={open}
        modal
        onClose={closeDialog}
        {...dialogProps}
        onOpenChange={closeDialog}
      >
        <DialogContent>
          <DialogHeader>
            {dialogParams?.title && (
              <DialogTitle>{dialogParams?.title}</DialogTitle>
            )}
            {dialogParams?.description && (
              <DialogDescription>{dialogParams?.description}</DialogDescription>
            )}
          </DialogHeader>
          <div className="grid gap-4">{dialogChildren}</div>
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};

export const DialogContext = createContext();
