let metodo = null
let n = 0
let GENERADOS = null
let PAQ_DIA = []
let PER_PAQ = []
let TIP_PAQ = []

const paquetesDia = (num) => {
	let paqDias = tabla_paquetes_vendidos
	let res

	for (let i = 0; i < paqDias.length; i++) {
		if ((num >= paqDias[i][3][0]) && (num <= paqDias[i][3][1])) {
			res = [paqDias[i][0], num]
			break;
		}
	}

	return res
}

const tipoPaquete = (num) => {
	let tipos = tabla_tipo
	let res

	for (let i = 0; i < tipos.length; i++) {
		if ((num >= tipos[i][3][0]) && (num <= tipos[i][3][1])) {
			res = [tipos[i][0], num]
		}
	}

	return res
}

const personasPaquete = (num) => {
	let perPaq = tabla_personas_paquete
	let res
	
	for (let i = 0; i < perPaq.length; i++) {
		if ((num >= perPaq[i][3][0]) && (num <= perPaq[i][3][1])) {
			res = [perPaq[i][0], num]
			break;
		}
	}

	return res
}

const destinoPaquete = (num) => {
	let destPaq = tabla_paquetes
	let res
	
	for (let i = 0; i < destPaq.length; i++) {
		if ((num >= destPaq[i][3][0]) && (num <= destPaq[i][3][1])) {
			res = [destPaq[i][0], num]
			break;
		}
	}

	return res
}

const generarValores = (aleatorios, de) => {
	let res = []
	
	aleatorios.forEach(num => {
		switch (de) {
			case 'paquetes_dia':
				res.push(paquetesDia(num))
				break
			case 'personas_paquete':
				res.push(personasPaquete(num))
				break
			case 'tipo_paquete':
				res.push(tipoPaquete(num))
				break
			case 'destino':
				res.push(destinoPaquete(num))
				break
		}
	})

	return res
}

const paquetesVendidos = (dias) => {
	let res = 0;
	
	dias.forEach(dia => {
		res += dia[0][0]
	})

	return res

}

const buscarPaquete = (vendidos, destino) => {
	for (let i = 0; i < vendidos.length; i++) {
		if (vendidos[i][0] == destino) {
			return i
		}
	}
	
	return (-1)
}

const masVisitado = (dias) => {
	let vendidos = []
	
	dias.forEach((dia, i) => {
		dia.forEach(paquete => {
			let pos = buscarPaquete(vendidos, paquete[1][0])
			if (pos == (-1)) {
				vendidos.push([paquete[1][0], paquete[0][0]])
			} else {
				vendidos[pos][1] += paquete[0][0]
			}
		})
	})

	return vendidos.sort((a, b) => (b[1] - a[1]))
}

const nivelSocial = (dias) => {
	let vendidos = []
	
	dias.forEach((dia, i) => {
		dia.forEach(paquete => {
			let pos = buscarPaquete(vendidos, paquete[2][0])
			if (pos == (-1)) {
				vendidos.push([paquete[2][0], 1])
			} else {
				vendidos[pos][1] += 1
			}
		})
	})

	return vendidos.sort((a, b) => (b[1] - a[1]))
}

const costoPaquete = (destino, personas, tipo) => {
	let res = 0

	tabla_paquetes.forEach(paq => {
		if (paq[0] == destino) {
			if (tipo == 'Turista') { res = (paq[5] * personas) }
			if (tipo == 'Primera') { res = (paq[4] * personas) }
		}
	})

	return res
}

const repetidos = (numeros) => {
	let res = false

	numeros.forEach((num, i) => {
		numeros.forEach((num2, j) => {
			if (j != i) {
				if (num == num2) {
					res = true
				}
			}
		})
	})

	return res
}

const errorNoti = (err) => {
	alertify.error(err, 25)
}

const gcd = (a, b) => {
	let res = 0

	for (let i = 1; i <= a; i++) {
		if ((a % i == 0) && (b % i == 0)) {
			res = i
		}
	}

	return res
}

const ejecutar = () => {
	let errores = []
	DIAS_SIM = parseInt(document.getElementById('dias').value)

	if (!metodo) {
		errorNoti('Debe seleccionar un metodo generador.')
		return false
	}
	if (!DIAS_SIM) {
		errorNoti('Dias debe ser mayor que 0.')
		return false
	}

	n = parseInt(DIAS_SIM) * 7 * 3

	if (metodo == 'cuamed') {
		let sem = parseInt(document.getElementById('sem').value)

		if (!sem) {
			errorNoti('La semilla debe ser mayor que 0.')
			return false
		}

		GENERADOS = cuadradoMedio(sem, sem.toString().length, 0, [])
		tablaCuadradoMedio(GENERADOS)
	}
	if (metodo == 'promed') {
		let sem1 = parseInt(document.getElementById('sem1').value)
		let sem2 = parseInt(document.getElementById('sem2').value)

		if (!sem || !sem2) {
			errorNoti('Las semillas deben ser mayor que 0.')
			return false
		}
		if (sem1.length != sem2.length) {
			errorNoti('Las semillas deben tener la misma cantidad de dígitos.')
			return false
		}

		GENERADOS = productoMedio(sem1, sem2, sem1.length, 0, [])
		tablaProductoMedio(GENERADOS)
	}
	if (metodo == 'promed2') {
		let sem = parseInt(document.getElementById('sem').value)
		let a = parseInt(document.getElementById('a').value)

		if (!sem) {
			errorNoti('La semilla debe ser mayor que 0.')
			return false
		}
		if (!a) {
			errorNoti('La semilla debe ser mayor que 0.')
			return false
		}
		if (sem.length != a.length) {
			errorNoti('La semilla y la constante "a" deben tener la misma cantidad de dígitos.')
			return false
		}

		GENERADOS = productoMedioVariado(sem, a, sem.length, 0, [])
		tablaProductoMedioVariado(GENERADOS)
	}
	if (metodo == 'conmix') {
		let sem = parseInt(document.getElementById('sem').value)
		let a = parseInt(document.getElementById('a').value)
		let c = parseInt(document.getElementById('c').value)
		let m = parseInt(document.getElementById('m').value)
		
		if (!sem) {
			errorNoti("La semilla debe ser un valor positivo mayor que 0.")
			return false
		}
		if (!(a % 2)) {
			errorNoti('"a" debe ser impar.')
			return false
		}
		if (!(a % 3) && (!a % 5)) {
			errorNoti('"a" debe ser no divisible entre 3 o 5')
			return false
		}
		if (c % 8 != 5) {
			errorNoti('El residuo de c/8 debe ser igual a 5')
			return false
		}
		if (gcd(m, c) != 1) {
			errorNoti('"c" debe ser primo a "m"')
			return false
		}
		if ((m < a) || (m < c)) {
			errorNoti('El valor de m debe ser mayor que los valores de la semilla, "a" y "c"')
			return false
		}

		GENERADOS = (congruencialMixto(sem, sem.length, a, c, m, 0, []))
		tablaCongruencialMixto(GENERADOS)
	}

	if (metodo == 'conmul') {
		let sem = parseInt(document.getElementById('sem').value)
		let a = parseInt(document.getElementById('a').value)
		let m = parseInt(document.getElementById('m').value)
		/* 
			a = (8*t) +- 3. t = cualquien entero.
			m = 2^b. b > 2. periodo = m/4. 8 >= m <= 512
			x0 = impar (x0 mod 3 o 5) == 0
		*/

		if (!sem) {
			errorNoti('La semilla debe ser mayor que 0.')
			return false
		}
		if (sem%2 == 0) {
			errorNoti('La semilla debe se un numero impar.')
			return false
		}
		if (!a) {
			errorNoti('"a" debe ser mayor que 0.')
			return false
		}
		if (!m) {
			errorNoti('"m" debe ser mayor que 0.')
			return false
		}
		if (m < 8 || m > 512) {
			errorNoti('El valor de "m" debe estár entre 8 y 512 segun Luis Colita.')
			return false
		}

		GENERADOS = (congruencialMulti(sem, a, m, sem.lengthm, 0, []))
		tablaCongruencialMulti(GENERADOS)
	}

	let aleatorios = []

	GENERADOS.forEach(fila => { aleatorios.push(parseFloat(fila[fila.length - 1])) })



	let resPaqDias = []
	let gananciaTotal = 0

	let numDias = aleatorios.splice(0, DIAS_SIM)
	PAQ_DIA = generarValores(numDias, 'paquetes_dia')

	let totalPaquetes = 0
	PAQ_DIA.forEach(dia => {
		totalPaquetes += dia[0]
	})


	let numPer = aleatorios.splice(0, totalPaquetes)
	let numTipo = aleatorios.splice(0, totalPaquetes)
	let numDest = aleatorios.splice(0, totalPaquetes)

	let usados = [...numDias, ...numPer, ...numTipo, ...numDest]

	usados.forEach((num, i) => {
		if (num >= 1 || num < 0) {
			errorNoti('Alguno(s) de los números generados no cumplen con los requerimientos. Por favor, intente cambiando los parámetros de entrada.')
		}
	})

	if (!kolmogorov(usados)) {
		errorNoti('Los números generados no satisfacen las condiciones de aleatoriedad.')
		return false
	}

	PER_PAQ = generarValores(numPer, 'personas_paquete')
	DES_PAQ = generarValores(numDest, 'destino')
	TIP_PAQ = generarValores(numTipo, 'tipo_paquete')

	PAQ_DIA.forEach(dia => {
		let res = []
		for (let i = 0; i < dia[0]; i++) {
			let paq = [PER_PAQ.splice(0, 1)[0], DES_PAQ.splice(0, 1)[0], TIP_PAQ.splice(0, 1)[0]]
			paq.push(costoPaquete(paq[1][0], paq[0][0], paq[2][0]))
			res.push(paq)
			gananciaTotal += paq[3]
		}
		resPaqDias.push(res)
	})

	let destinoMasVisitado = masVisitado(resPaqDias)
	let mayorNivelSocial = nivelSocial(resPaqDias)

	if (metodo == 'cuamed') {
		tablaCuadradoMedio(GENERADOS.slice(0, DIAS_SIM + (totalPaquetes * 3)))
	}
	if (metodo == 'promed') {
		tablaProductoMedio(GENERADOS.slice(0, DIAS_SIM + (totalPaquetes * 3)))
	}
	if (metodo == 'promed2') {
		tablaProductoMedioVariado(GENERADOS.slice(0, DIAS_SIM + (totalPaquetes * 3)))
	}
	if (metodo == 'conmix') {
		tablaCongruencialMixto(GENERADOS.slice(0, DIAS_SIM + (totalPaquetes * 3)))
	}
	if (metodo == 'conmul') {
		tablaCongruencialMulti(GENERADOS.slice(0, DIAS_SIM + (totalPaquetes * 3)))
	}

	tablaResultadoPaqDia(PAQ_DIA)
	tablaResultadoSimulacion(resPaqDias)

	document.getElementById('res-paq-ven').innerHTML += `<td colspan="2" class="text-right"><b>Total:</b></td><td><b>${totalPaquetes}</b></td>`

	document.getElementById('numeros-tab').style.display = 'block'
	document.getElementById('simulacion-tab').style.display = 'block'
	$('#simulacion-tab').tab('show')


	console.log(mayorNivelSocial)
	if (destinoMasVisitado[0][0] == destinoMasVisitado[1][0]) {
		document.getElementById('respuesta1').innerText = `
			#1.- ${destinoMasVisitado[0][0]} (${destinoMasVisitado[0][1]} personas) <br>
			#2.- ${destinoMasVisitado[1][0]} (${destinoMasVisitado[1][1]} personas) <br>
			#3.- ${destinoMasVisitado[2][0]} (${destinoMasVisitado[2][1]} personas) <br>
		`
	} else {
		document.getElementById('respuesta1').innerText = `${destinoMasVisitado[0][0]} (${destinoMasVisitado[0][1]} personas)`
	}
	document.getElementById('respuesta2').innerText = 'Se generó un ingreso total de ' + gananciaTotal.toFixed(2) + '$ por venta de paquetes.'
	document.getElementById('respuesta3').innerText = `Clase ${mayorNivelSocial[0][0] == 'Turista' ? 'Media' : 'Alta'} (${mayorNivelSocial[0][1]} paquetes)`

	alertify.success("Simulacion completada")

}
