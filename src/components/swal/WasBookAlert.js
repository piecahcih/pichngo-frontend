import Swal from 'sweetalert2'

export function WasBookSwal(navigate){
    
    Swal.fire({
      title: "This room has already been book!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Re-booking with different dates",
      cancelButtonText: "Explore more option",
      customClass:{
        htmlContainer: 'font-[Whitney-Book]',
        cancelButton: 'border border-gray-400 text-gray-600 bg-transparent hover:bg-gray-50 px-6 py-2 rounded-[8px]',
        confirmButton: 'bg-primary px-6 py-2 rounded-[8px] text-white mr-4'
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) navigate(-1);
      if(result.isDismissed) navigate(-3)
    });

}
