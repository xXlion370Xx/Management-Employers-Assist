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

//Editar 
function updateWorker(id, name, rol) {
 // Crear los elementos de la modal
 const modalContainer = document.createElement('div');
 modalContainer.className = 'modal';
 modalContainer.id = 'dynamicModal';

 const modalDialog = document.createElement('div');
 modalDialog.className = 'modal-dialog';

 const modalContent = document.createElement('div');
 modalContent.className = 'modal-content';

 const modalHeader = document.createElement('div');
 modalHeader.className = 'modal-header modal-title fs-5';
 modalHeader.textContent = 'Actualizar Usuario';

 const modalBody = document.createElement('div');
 modalBody.className = 'modal-body col-10';

 
 //Crear los titulos de cada input
 const nombreTitulo = document.createElement('label')
 nombreTitulo.textContent= 'Nombre'

 const nombreRol = document.createElement('label')
 nombreRol.textContent= 'Rol'

 // Crear los campos de entrada (input)
 const nombreInput = document.createElement('input');
 nombreInput.type = 'text';
 nombreInput.className = 'form-control m-2';
 nombreInput.value = name;
 nombreInput.name = 'name';

   // Crear los campos de entrada (input)
   const idInput = document.createElement('input');
   idInput.type = 'hidden';
   idInput.value = id;
   idInput.name = 'id';

   const rolInput = document.createElement('select');
   rolInput.className = 'form-select m-2';
   rolInput.name = 'rol';
   
   const option1 = document.createElement('option');
   option1.textContent = 'worker';
   option1.value = 'worker';
   
   const option2 = document.createElement('option');
   option2.value = 'admin';
   option2.textContent = 'admin';
   
   if (rol === 'worker') {
     option1.selected = true;
   } else if (rol === 'admin') {
     option2.selected = true;
   }
   
   rolInput.appendChild(option1);
   rolInput.appendChild(option2);

const buttom = document.createElement('button');
buttom.type = 'submit';
buttom.className = 'btn btn-primary m-2';
buttom.textContent = 'Actualizar';

 
 buttom.addEventListener('click', function() {
   const id = idInput.value;
   const usuario = nombreInput.value;
   const rol = rolInput.value;

   const url = '/admin/updateWorker/' + id  + '/' + usuario + '/' + rol

   fetch(url, {
     method: 'POST'
   })
   .then(response => {
    console.log(response)
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'La actualización se realizó correctamente',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      window.location.href = '/admin/';
    })
   })
   .catch(error => {
     console.log(error)
   });
 });
 
 // Agregar los campos de entrada a la modal

 modalBody.appendChild(idInput);

 modalBody.appendChild(nombreTitulo);
 modalBody.appendChild(nombreInput);

 modalBody.appendChild(nombreRol);
 rolInput.appendChild(option1);

 rolInput.appendChild(option2);

 modalBody.appendChild(rolInput);

 modalBody.appendChild(buttom);


 const modalFooter = document.createElement('div');
 modalFooter.className = 'modal-footer';
 const closeButton = document.createElement('button');
 closeButton.type = 'button';
 closeButton.className = 'btn btn-secondary';
 closeButton.textContent = 'Cerrar';
 closeButton.setAttribute('data-bs-dismiss', 'modal');
 modalFooter.appendChild(closeButton);


 // Construir la estructura de la modal
 modalContent.appendChild(modalHeader);
 modalContent.appendChild(modalBody);
 modalContent.appendChild(modalFooter);
 

 modalDialog.appendChild(modalContent);

 modalContainer.appendChild(modalDialog);

 // Agregar la modal al documento
 document.body.appendChild(modalContainer);

 // Mostrar la modal (si estás utilizando Bootstrap)
 const modal = new bootstrap.Modal(modalContainer);
 modal.show();
}