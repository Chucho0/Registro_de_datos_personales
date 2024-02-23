let informacion = [];
let op = null;
let indice = null;

function validar() {
  let nombre = document.getElementById("minombre").value;
  let apellido = document.getElementById("miapellido").value;
  let tipoDocumento = document.getElementById("identificacion").value;
  let numeroDocumento = document.getElementById("numeroidentificacion").value;
  let genero = document.querySelector('input[name="genero"]:checked');
  let fecha = document.getElementById("fecha").value;
  let telefono = document.getElementById("numerodetelefono").value;
  let correo = document.getElementById("correoeletronico").value;

  if (nombre === "") {
    mostrarAlerta("Ingrese su nombre");
    return;
  }
  if (apellido === "") {
    mostrarAlerta("Ingrese su apellido");
    return;
  }
  if (tipoDocumento === "") {
    mostrarAlerta("Seleccione el tipo de documento");
    return;
  }
  if (numeroDocumento === "") {
    mostrarAlerta("Ingrese el número de documento");
    return;
  }
  if (fecha === "") {
    mostrarAlerta("Ingrese la fecha de nacimiento");
    return;
  } else {
    let fechaNacimiento = new Date(fecha);
    let hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    let mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    if (edad < 13) {
      mostrarAlerta("Debe ser mayor de 13 años para registrarse.");
      return;
    }
  }
  if (genero === null) {
    mostrarAlerta("Seleccione su genero");
    return;
  }
  if (telefono === "") {
    mostrarAlerta("Ingrese su número de teléfono");
    return;
  } else if (telefono.length !== 10 || isNaN(telefono)) {
    mostrarAlerta("El número de teléfono debe tener 10 dígitos.");
    return;
  }
  if (correo === "") {
    mostrarAlerta("Ingrese una dirección de correo electrónico");
    return;
  } else {
    let correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo)) {
      mostrarAlerta("Introduzca una dirección de correo válida.");
      return;
    }
  }

  if (op === true) {
    informacion[indice] = {
      nombre,
      apellido,
      tipoDocumento,
      numeroDocumento,
      genero: genero ? genero.value : "",
      fechaNacimiento: fecha,
      telefono,
      correo,
    };
  } else {
    let persona = {
      nombre,
      apellido,
      tipoDocumento,
      numeroDocumento,
      genero: genero ? genero.value : "",
      fechaNacimiento: fecha,
      telefono,
      correo,
    };
    informacion.push(persona);
  }

  resetFormFields();

  pintar();
}

function resetFormFields() {
  const campos = [
    "minombre",
    "miapellido",
    "identificacion",
    "numeroidentificacion",
    "genero",
    "fecha",
    "numerodetelefono",
    "correoeletronico",
  ];

  campos.forEach((campo) => {
    if (campo === "genero") {
      document.querySelectorAll(`input[name="${campo}"]:checked`).forEach((radio) => {
        radio.checked = false;
      });
    } else {
      document.getElementById(campo).value = "";
    }
  });
}

function pintar() {
  let tabla = document.getElementById("tabla");
  tabla.innerHTML = "";

  informacion.forEach((item, index) => {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");
    let td8 = document.createElement("td");
    let td9 = document.createElement("td");
    let editar = document.createElement("button");
    let eliminar = document.createElement("button");

    editar.textContent = "📝";
    editar.addEventListener("click", () => {
      edita(item, index);
    });

    eliminar.textContent = "❌";
    eliminar.addEventListener("click", () => {
      eliminarPersona(index);
    });

    td1.textContent = item.nombre;
    td2.textContent = item.apellido;
    td3.textContent = item.tipoDocumento;
    td4.textContent = item.numeroDocumento;
    td5.textContent = item.genero;
    td6.textContent = item.fechaNacimiento;
    td7.textContent = item.telefono;
    td8.textContent = item.correo;
    td9.appendChild(editar);
    td9.appendChild(eliminar);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);
    tr.appendChild(td9);

    tabla.appendChild(tr);
  });
}

function edita(persona, index) {
  indice = index;
  op = true;
  document.getElementById("minombre").value = persona.nombre;
  document.getElementById("miapellido").value = persona.apellido;
  document.getElementById("identificacion").value = persona.tipoDocumento;
  document.getElementById("numeroidentificacion").value = persona.numeroDocumento;
  document.querySelector(`input[name="genero"][value="${persona.genero}"]`).checked = true;
  document.getElementById("fecha").value = persona.fechaNacimiento;
  document.getElementById("numerodetelefono").value = persona.telefono;
  document.getElementById("correoeletronico").value = persona.correo;
}

function eliminarPersona(index) {
  informacion.splice(index, 1);
  pintar();
}

function mostrarAlerta(mensaje) {
  let alerta = document.getElementById("alert");
  alerta.textContent = mensaje;
  alerta.classList.remove("alert2");
  alerta.classList.add("alert2");
  setTimeout(() => {
    alerta.textContent = "";
    alerta.classList.remove("alert2");
  }, 1000);
}