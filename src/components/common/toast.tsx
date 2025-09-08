import { type ExternalToast, toast } from 'sonner'

interface IToastProps extends ExternalToast {
  label?: React.ReactNode | string
  description?: React.ReactNode | string
  message?: string
  duration?: number
  children?: React.ReactNode
}

export const Toast = {
  success: ({ label = '', description = '', style = {}, ...props }: IToastProps) => {
    return toast.success(label, {
      description: (
        <div className="text-secondary-foreground-light" dangerouslySetInnerHTML={{ __html: description as string }} />
      ),
      style: {
        borderColor: '#05965433',
        color: 'var(--success)',
        ...style,
      },
      ...props,
    })
  },
  error: ({ label = '!', description = '', style = {}, ...props }: IToastProps) => {
    return toast.error(label, {
      description: (
        <div className="text-secondary-foreground-light" dangerouslySetInnerHTML={{ __html: description as string }} />
      ),
      style: {
        borderColor: '#D230431F',
        color: 'var(--error)',
        ...style,
      },
      ...props,
    })
  },
  loading: ({ label = '', description = '', ...props }: IToastProps) => {
    return toast.loading(label, {
      description: (
        <div className="text-secondary-foreground-light" dangerouslySetInnerHTML={{ __html: description as string }} />
      ),
      ...props,
    })
  },
}
