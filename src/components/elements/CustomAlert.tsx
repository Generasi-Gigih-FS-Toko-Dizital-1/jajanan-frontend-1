import Swal from 'sweetalert2'

export const errorAlert = (title: string, text: string): void => {
  void Swal.fire({
    icon: 'error',
    title,
    text
  })
}

export const successAlert = (title: string, text: string): void => {
  void Swal.fire({
    icon: 'success',
    title,
    text
  })
}

export const confirmAlert = async (title: string, text: string, confirmButtonText: string, cancelButtonText: string): Promise<any> => {
  return await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor: '#424242',
    cancelButtonColor: '#d33'
  })
}
