import Swal from 'sweetalert2'



export function LoginSwal(navigate){
    
    Swal.fire({
      title: "Authentication Required",
      text: "Please log in to continue",
      showCancelButton: true,
      confirmButtonText: "Log in",
      cancelButtonText: "Stay on this page",
      customClass:{
        htmlContainer: 'font-[Whitney-Book]',
        cancelButton: 'border border-gray-400 text-gray-600 bg-transparent hover:bg-gray-50 px-6 py-2 rounded-[8px]',
        confirmButton: 'bg-primary px-6 py-2 rounded-[8px] text-white mr-4'
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) navigate('/login');
    });

}
