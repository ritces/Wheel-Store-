import { MouseEventHandler, ReactNode } from 'react';
import { Button } from './ui/button';

type ActionsType = {
  label: string;
  onClick: MouseEventHandler;
};

interface PageViewProps {
  title: string;
  actions: Array<ActionsType>;
  children?: ReactNode;
  subtitle?: string;
  mode?: 'subpage' | null;
}

const PageView = ({ children, title, actions, mode }: PageViewProps) => {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="flex flex-row items-center">
        <div className="flex flex-col py-4">
          <p
            className={`font-bold ${
              mode === 'subpage' ? 'text-2xl' : 'text-3xl'
            }`}
          >
            {title}
          </p>
        </div>
        <div className="ml-auto flex gap-x-2">
          {actions.map(({ label, onClick }, index) => {
            return (
              <Button
                className="w-full p-4"
                onClick={onClick}
                key={`${label}-${index}`}
              >
                {label}
              </Button>
            );
          })}
        </div>
      </div>
      {children}
    </div>
  );
};

export default PageView;
