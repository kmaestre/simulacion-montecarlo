const tablaHtml = (headers, filas) => {
	return `<table class="table table-sm table-striped table-hover table-bordered">
	    <thead class="bg-dark text-white">
	       ${headers}
	    </thead>
	    <tbody>
	      ${filas}
	    </tbody>
	  </table>
	`
}

const filasHtmlGeneradores = (tabla) => {
	let filas = ''

	tabla.forEach((fila, i) => {
		let td = ''
		td += `<td>${i + 1}</td>`
		fila.forEach((el) => {
			td += `<td>${el}</td>`
		})

		filas += `<tr>${td}</tr>`
	})

	return filas;
}

const tablaCuadradoMedio = (tabla) => {
	let headers = `
    <tr>
      <th>N</th>
      <th>X<sub>n</sub></th>
      <th>X<sub>n</sub><sup>2</sup></th>
      <th>X<sub>n+1</sub></th>
      <th>R<sub>n+1</sub></th>
    </tr>
	`

	$('div#numeros').html(tablaHtml(headers, filasHtmlGeneradores(tabla)))
}

const tablaProductoMedio = (tabla) => {
	let headers = `<tr>
      <th>N</th>
      <th>X<sub>n-1</sub></th>
      <th>X<sub>n</sub></th>
      <th>X<sub>n</sub>*X<sub>n-1</sub></th>
      <th>X<sub>n+1</sub></th>
      <th>R<sub>n+1</sub></th>
    </tr>
	`

	$('div#numeros').html(tablaHtml(headers, filasHtmlGeneradores(tabla)))
}

const tablaProductoMedioVariado = (tabla) => {
	let headers = `<tr>
      <th>N</th>
      <th>X<sub>n</sub></th>
      <th>a*X<sub>n</sub></th>
      <th>X<sub>n+1</sub></th>
      <th>R<sub>n+1</sub></th>
    </tr>
	`

	$('div#numeros').html(tablaHtml(headers, filasHtmlGeneradores(tabla)))
}

const tablaCongruencialMixto = (tabla) => {
	let headers = `<tr>
      <th>N</th>
      <th>X<sub>n</sub></th>
      <th>a*X<sub>n</sub>+c</th>
      <th>(a*X<sub>n</sub>+c) mod m</th>
      <th>X<sub>n</sub>/m</th>
    </tr>
	`

	$('div#numeros').html(tablaHtml(headers, filasHtmlGeneradores(tabla)))
}

const tablaCongruencialMulti = (tabla) => {
	let headers = `<tr>
      <th>N</th>
      <th>X<sub>n</sub></th>
      <th>a*X<sub>n</sub></th>
      <th>(a*X<sub>n</sub>) mod m</th>
      <th>X<sub>n</sub>/m</th>
    </tr>
	`

	$('div#numeros').html(tablaHtml(headers, filasHtmlGeneradores(tabla)))
}

const tablaResultadoPaqDia = () => {
	let tabla = document.getElementById('res-paq-ven')

	let filas = '';
	PAQ_DIA.forEach((dia, i) => {
		filas += `<tr>
			<td>${i + 1}</td>
			<td>${dia[1]}</td>
			<td>${dia[0]}</td>
		</tr>`
	})
	tabla.innerHTML = filas
}

const tablaResultadoSimulacion = (simulacion) => {
	let tabla = document.getElementById('res-sim')

	let filas = '';

	simulacion.forEach((dia, i) => {
		filas += `
			<tr>
				<td	colspan="7" style="background-color: #cccccc"> <strong>Dia ${i + 1}</strong> </td>
			</tr>
		`
		dia.forEach((paquete, i) => {
			console.log(JSON.stringify(paquete))
			filas += `
				<tr>
					<td>${i+1}</td>
					<td>${paquete[1]}</td>
					<td>${paquete[0]}</td>
					<td>${paquete[2][1]}</td>
					<td>${paquete[2][0]}</td>
					<td>${paquete[3][1]}</td>
					<td>${paquete[3][0]}</td>
				</tr>
			`
		})
	})

	tabla.innerHTML = filas
}