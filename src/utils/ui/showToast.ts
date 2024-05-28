import { ExternalToast, toast } from 'sonner'

type Toast = {
  title: string
  description?: string
  type: 'success' | 'info' | 'warning' | 'error'
  options?: ExternalToast
}

const ToastTypes = {
  success: (args: Toast) => toast.success(args.title, { ...args.options }),
  info: (args: Toast) => toast.info(args.title, { ...args.options }),
  warning: (args: Toast) => toast.warning(args.title, { ...args.options }),
  error: (args: Toast) => toast.error(args.title, { ...args.options }),
}

const defaultOptions: ExternalToast = {
  position: 'top-center',
}

export const showToast = ({ title, description, type, options }: Toast) => {
  return ToastTypes[type]({
    title,
    type,
    options: { ...defaultOptions, ...options, description },
  })
}
