import Swal from 'sweetalert2'

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn bg-[#D44A1B] text-white",
    cancelButton: "btn btn-danger mr-3"
  },
  buttonsStyling: false
});

export function AdminUpdateBKSwal ({booking,updateStatusOnSubmit}) {

    swalWithBootstrapButtons.fire({
      title: `Updated Booking No: ${booking.id}?`,
      text: 'Change to confirmed status',
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Updated?",
      cancelButtonText: "Cancel",
      reverseButtons: true
    }).then(async(result) => {
      if (result.isConfirmed){
        await updateStatusOnSubmit()
          swalWithBootstrapButtons.fire({
          title: "This Booking Status has been updated.",
          icon: "success"
        });
      } 
    //   else if (result.dismiss === Swal.DismissReason.cancel) swalWithBootstrapButtons.fire({
    //     title: "Cancelled",
    //     icon: "error"
    //   });
    });
}

