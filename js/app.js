const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHTML(); // Elimina todo el HTML
    });
}

//Funciones
function agregarCurso (e){
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito'));{
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

}

// Elimina curso(s) del carrito
function eliminarCurso(e){
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId );

        carritoHTML(); // iterar sobre el carrito y mostrar HTML
    }
}

//Lee el contenido del HTML al click y extrae info del curso

function  leerDatosCurso (curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisar si un elemento ya existe en el carrito

    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if (existe) {
        //Actualizamos cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            } else {
                return curso; // retorna los objetos que no estan duplicados
            }
        })
        articulosCarrito = [...cursos];
    } else {
        //Agregamos curso
         //Agregar elemetos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

   

    console.log(articulosCarrito);

    carritoHTML();
}

//Mostrar el carrito de compras en el HTML

function carritoHTML (){

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id}  = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);

    })
}

// Elimina los cursos del tbody

function limpiarHTML(){
    //forma lenta
    // contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}