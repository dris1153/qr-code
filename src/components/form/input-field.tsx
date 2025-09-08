import type { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form'
import { Show } from '../common/show'
import { Input, InputProps } from '../common'
import { cn } from '@/libs'

interface Props<T extends FieldValues = FieldValues> extends InputProps {
  control: Control<T>
  name: FieldPath<T>
  defaultValue?: FieldPathValue<T, FieldPath<T>>
  label?: string
  labelClassName?: string
  required?: boolean
  containerClassName?: string
  requiredClassName?: string
}

const InputField = <T extends FieldValues>({
  className,
  labelClassName,
  control,
  defaultValue,
  label,
  required,
  containerClassName,
  requiredClassName,
  ...props
}: Props<T>) => {
  return (
    <FormField
      defaultValue={defaultValue}
      control={control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className={cn(containerClassName)}>
              <Show when={!!label}>
                <FormLabel className={labelClassName}>
                  {label} {required && <span className={cn('text-error-500', requiredClassName)}>*</span>}
                </FormLabel>
              </Show>
              <Input {...field} {...props} className={className} />

              {/* TODO: NEED FIGMA UPDATE */}
              <FormMessage className="text-button-danger mt-1 text-xs" />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export { InputField }
