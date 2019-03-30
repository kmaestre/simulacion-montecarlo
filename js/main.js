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

const ejecutar = () => {
	DIAS_SIM = parseInt(document.getElementById('dias').value)
	n = parseInt(DIAS_SIM) * 7 * 3

	if (metodo == 'cuamed') {
		let sem = document.getElementById('sem').value
		GENERADOS = cuadradoMedio(sem, sem.toString().length, 0, [])
		tablaCuadradoMedio(GENERADOS)
	}
	if (metodo == 'promed') {
		let sem1 = document.getElementById('sem1').value
		let sem2 = document.getElementById('sem2').value
		if (sem1.length != sem2.length) {
			alert('Las semillas deben tener la misma cantidad de digitos.')
			return
		}
		GENERADOS = productoMedio(sem1, sem2, sem1.length, 0, [])
		tablaProductoMedio(GENERADOS)
	}
	if (metodo == 'promed2') {
		let sem = document.getElementById('sem').value
		let a = document.getElementById('a').value
		if (sem.length != a.length) {
			alert('La semilla y la constante "a" deben tener la misma cantidad de digitos.')
			return
		}
		GENERADOS = productoMedioVariado(sem, a, sem.length, 0, [])
		tablaProductoMedioVariado(GENERADOS)
	}
	if (metodo == 'conmix') {
		let sem = document.getElementById('sem').value
		let a = parseInt(document.getElementById('a').value)
		let c = parseInt(document.getElementById('c').value)

		if (!(a % 2) || (!(a % 3) && !(a % 5))) {
			alert('El valor de "a" no cumple las condiciones necesarias, por favor introduzca un valor valido.')
			return
		}

		if (c % 8 != 5) {
			alert('El valor de "c" no cumple las condiciones necesarias, por favor introduzca un valor valido.')
			return
		}

		GENERADOS = (congruencialMixto(sem, sem.length, a, c, 0, []))
		tablaCongruencialMixto(GENERADOS)
	}

	if (metodo == 'conmul') {
		let sem = document.getElementById('sem').value
		let a = parseInt(document.getElementById('a').value)
		let m = parseInt(document.getElementById('m').value)
		GENERADOS = (congruencialMulti(sem, a, m, sem.lengthm, 0, []))
		tablaCongruencialMulti(GENERADOS)
	}

	let aleatorios = []
	
	GENERADOS.forEach(fila => { aleatorios.push(parseFloat(fila[fila.length - 1])) })

	aleatorios.forEach(num => {
		if (num >= 1) {
			alert('Alguno(s) de los numeros generados no cumplen con los requerimientos. Por favor intente cambaindo los datos de entrada')
		}
	})

	let resPaqDias = []
	let gananciaTotal = 0

	PAQ_DIA = generarValores(aleatorios.slice(0, DIAS_SIM), 'paquetes_dia')
	
	let totalPaquetes = 0
	PAQ_DIA.forEach(dia => {
		totalPaquetes += dia[0]
	})


	PER_PAQ = generarValores(aleatorios.slice(0, totalPaquetes), 'personas_paquete')
	TIP_PAQ = generarValores(aleatorios.slice(0, totalPaquetes), 'tipo_paquete')
 	DES_PAQ = generarValores(aleatorios.slice(0, totalPaquetes), 'destino')


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
		tablaCuadradoMedio(GENERADOS.slice(0, DIAS_SIM + totalPaquetes))
	}
	if (metodo == 'promed') {
		tablaProductoMedio(GENERADOS.slice(0, DIAS_SIM + totalPaquetes))
	}
	if (metodo == 'promed2') {
		tablaProductoMedioVariado(GENERADOS.slice(0, DIAS_SIM + totalPaquetes))
	}
	if (metodo == 'conmix') {
		tablaCongruencialMixto(GENERADOS.slice(0, DIAS_SIM + totalPaquetes))
	}
	if (metodo == 'conmul') {
		tablaCongruencialMulti(GENERADOS.slice(0, DIAS_SIM + totalPaquetes))
	}

	console.log(resPaqDias)

	tablaResultadoPaqDia(PAQ_DIA)
	tablaResultadoSimulacion(resPaqDias)

	alert('total paquetes' + totalPaquetes)

	document.getElementById('numeros-tab').style.display = 'block'
	document.getElementById('simulacion-tab').style.display = 'block'
	$('#simulacion-tab').tab('show')
	
	document.getElementById('respuesta1').innerText = `${destinoMasVisitado[0][0]}(${destinoMasVisitado[0][1]})`
	document.getElementById('respuesta2').innerText = gananciaTotal.toFixed(2) + '$'
	document.getElementById('respuesta3').innerText = `Clase ${mayorNivelSocial[0][0] == 'Turista' ? 'Media' : 'Alta'}`
	
}