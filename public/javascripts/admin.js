function confirmAcction(id, status){
    if (status == 'Active') {
        Swal.fire({
            icon: 'warning',
            text: 'Seguro que quieres Inctivar este registro '+ id +'?' ,
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
          }).then((result) => {
            if (result.isConfirmed) {
                const url = `/admin/inactiveWorker/${id}/${status}`;
                window.location.href = url;            }
        })
    }else{
        Swal.fire({
            icon: 'warning',
            text: 'Seguro que quieres Activar este registro '+ id +'?' ,
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
          }).then((result) => {
            if (result.isConfirmed) {
                const url = `/admin/inactiveWorker/${id}/${status}`;
                window.location.href = url;            }
        })
    }
   
}