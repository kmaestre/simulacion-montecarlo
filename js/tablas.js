const tablaHtml = (headers, filas) => {
	return `<table class="table table-sm table-striped table-hover">
	    <thead>
	       ${headers}
	    </thead>
	    <tbody>
	      ${filas}
	    </tbody>
	  </table>
	`
}

const filasHtml = (tabla) => {
	let filas = ''

	tabla.forEach((fila, i) => {
		let td = ''
		td += `<td>${i}</td>`
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

	$('div#numeros').html(tablaHtml(headers, filasHtml(tabla)))
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

	$('div#numeros').html(tablaHtml(headers, filasHtml(tabla)))
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

	$('div#numeros').html(tablaHtml(headers, filasHtml(tabla)))
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

	$('div#numeros').html(tablaHtml(headers, filasHtml(tabla)))
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

	$('div#numeros').html(tablaHtml(headers, filasHtml(tabla)))
}
