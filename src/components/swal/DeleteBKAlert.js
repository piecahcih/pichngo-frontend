import Swal from 'sweetalert2'

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn bg-[#D44A1B] text-white",
    cancelButton: "btn btn-danger mr-3"
  },
  buttonsStyling: false
});

export function DeleteBKSwal ({booking,deleteOnSubmit}) {

    swalWithBootstrapButtons.fire({
      title: `Delete Booking No: ${booking.id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true
    }).then(async(result) => {
      if (result.isConfirmed){
        await deleteOnSubmit()
          swalWithBootstrapButtons.fire({
          title: "This Booking has been deleted.",
          icon: "success"
        });
      } 
    });
}

