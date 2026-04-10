import Swal from 'sweetalert2'

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn bg-[#D44A1B] text-white",
    cancelButton: "btn btn-danger mr-3"
  },
  buttonsStyling: false
});

export function DeleteSwal ({tvl,deleteOnSubmit}) {

    swalWithBootstrapButtons.fire({
      title: `Delete ${tvl.firstName} ${tvl.lastName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true
    }).then(async(result) => {
      if (result.isConfirmed){
        await deleteOnSubmit()
          swalWithBootstrapButtons.fire({
          title: "This Traveler has been deleted.",
          icon: "success"
        });
      } 
      else if (result.dismiss === Swal.DismissReason.cancel) swalWithBootstrapButtons.fire({
        title: "Cancelled",
        icon: "error"
      });
    });
}

