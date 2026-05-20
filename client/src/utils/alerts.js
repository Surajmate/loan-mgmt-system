import Swal from 'sweetalert2'

// SUCCESS
export const successAlert = (
  title,
  text
) => {

  Swal.fire({
    icon: 'success',

    title,

    text,

    confirmButtonColor:
      '#2563eb',

    timer: 2500,

    showConfirmButton: false,
  })
}

// ERROR
export const errorAlert = (
  title,
  text
) => {

  Swal.fire({
    icon: 'error',

    title,

    text,

    confirmButtonColor:
      '#dc2626',
  })
}

// WARNING
export const warningAlert = (
  title,
  text
) => {

  Swal.fire({
    icon: 'warning',

    title,

    text,

    confirmButtonColor:
      '#f59e0b',
  })
}

// CONFIRM
export const confirmAlert =
  async (
    title,
    text
  ) => {

    return await Swal.fire({
      title,

      text,

      icon: 'question',

      showCancelButton: true,

      confirmButtonColor:
        '#2563eb',

      cancelButtonColor:
        '#64748b',

      confirmButtonText:
        'Yes',

      cancelButtonText:
        'Cancel',
    })
  }

// LOADING
export const loadingAlert = (
  title = 'Processing...'
) => {

  Swal.fire({
    title,

    allowOutsideClick: false,

    didOpen: () => {
      Swal.showLoading()
    },
  })
}

// CLOSE
export const closeAlert = () => {
  Swal.close()
}

// TEXTAREA INPUT ALERT
export const textareaAlert =
  async (
    title,
    confirmButtonText
  ) => {

    return await Swal.fire({
      title,

      input: 'textarea',

      inputLabel:
        'Remarks',

      inputPlaceholder:
        'Enter remarks...',

      inputAttributes: {
        'aria-label':
          'Remarks',
      },

      showCancelButton: true,

      confirmButtonText,

      confirmButtonColor:
        confirmButtonText ===
        'Approve'
          ? '#16a34a'
          : '#dc2626',
    })
  }