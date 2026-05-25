import Swal from 'sweetalert2'

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn bg-[#D44A1B] text-white",
    cancelButton: "btn btn-danger mr-3"
  },
  buttonsStyling: false
});

export function DeleteReviewSwal({ review, deleteOnSubmit }) {
  swalWithBootstrapButtons.fire({
    title: `Delete this review?`,
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteOnSubmit()
      swalWithBootstrapButtons.fire({
        title: "Your review has been deleted.",
        icon: "success"
      });
    }
  });
}
