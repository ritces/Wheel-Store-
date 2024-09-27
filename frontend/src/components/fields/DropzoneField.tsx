import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { CloudUploadIcon, FileCheck2 } from 'lucide-react';
import { Button } from '../ui/button';

const DropzoneField = ({ name, label, formControl, schema, accept }) => {
  const file = schema.getValues(name)
    ? URL.createObjectURL(schema.getValues(name))
    : undefined;

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      schema.setValue(name, acceptedFiles?.[0]);
      if (schema) {
        await schema.trigger(name);
      }
    },
    [schema, name],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ?? {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    maxFiles: 1,
    maxSize: 3 * 1024 * 1024, // 3MB
  });

  const clearFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    schema.resetField(name);
  };

  const { error } = schema.getFieldState(name);

  return (
    <div
      className={`${
        !error && file ? 'grid sm:grid-cols-2' : ''
      } justify-self-center w-full`}
    >
      <FormField
        control={formControl}
        name={name}
        render={() => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div
                {...getRootProps()}
                className="group relative flex h-28 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-gray-400 dark:border-gray-600 dark:bg-gray-900"
              >
                <div className="px-8 pointer-events-none z-10 flex flex-col items-center space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <CloudUploadIcon className="h-8 w-8" />
                  <p>
                    {isDragActive
                      ? 'Drop your attachment here'
                      : 'Drag and drop your attachment or click to upload'}
                  </p>
                </div>
                <input
                  {...getInputProps()}
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {!error && file && (
        <div className="pl-6 space-y-2 justify-self-center content-center">
          {accept['application/pdf'] ? (
            <div className="flex flex-col space-y-2 items-center">
              <FileCheck2 height={48} width={48} />
              <p className="text-muted-foreground">
                File uploaded successfully.
              </p>
            </div>
          ) : (
            <>
              <FormLabel className="">Preview</FormLabel>
              <div className="flex flex-row items-center">
                <img
                  src={file}
                  className="h-32"
                  onLoad={() => {
                    URL.revokeObjectURL(file);
                  }}
                />
                <div className="pl-4">
                  <Button onClick={clearFile} className="p-3">
                    Clear
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DropzoneField;
