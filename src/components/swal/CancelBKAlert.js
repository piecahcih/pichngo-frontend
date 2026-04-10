import Swal from 'sweetalert2'

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn bg-[#D44A1B] text-white",
    cancelButton: "btn btn-danger mr-3"
  },
  buttonsStyling: false
});

export function CancelBKSwal ({booking,cancelOnSubmit}) {

    swalWithBootstrapButtons.fire({
      title: `Cancel Booking No: ${booking.id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Cancel this booking",
      cancelButtonText: "Cancel",
      reverseButtons: true
    }).then(async(result) => {
      if (result.isConfirmed){
        await cancelOnSubmit()
          swalWithBootstrapButtons.fire({
          title: "This Booking has been cancelled.",
          icon: "success"
        });
      } 

    });
}

