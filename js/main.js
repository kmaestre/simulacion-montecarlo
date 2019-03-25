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
		}
	}

	return res
}

const tipoPaquete = (num) => {
	let tipos = tabla_tipo
	let res = []
	for (let i = 0; i < tipos.length; i++) {
		if ((num >= tipos[i][3][0]) && (num <= tipos[i][3][1])) {
			res.push(tipos[i][0], num)
			break;
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

const generarValores = (aleatrios, de) => {
	let res
	aleatrios.forEach(num => {
		switch (de) {
			case 'paquetes_dia':
				res = paquetesDia(num)
				break
			case 'personas_paquete':
				res = personasPaquete(num)
				break
			case 'tipo_paquete':
				res = tipoPaquete(num)
				break
			case 'destino':
				res = destinoPaquete(num)
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
		};
	}
	return (-1)
}

const masVisitado = (dias) => {
	let vendidos = []
	dias.forEach((dia, i) => {
		dia.slice(1, dia.length).forEach(paquete => {
			let pos = buscarPaquete(vendidos, paquete[0][0])
			if (pos == (-1)) {
				vendidos.push([paquete[0][0], paquete[1][0]])
			} else {
				vendidos[pos][1] += paquete[1][0]
			}
		})
	})

	return vendidos.sort((a, b) => (b[1] - a[1]))
}

const nivelSocial = (dias) => {
	let vendidos = []
	console.log(dias)
	dias.forEach((dia, i) => {
		dia.slice(1, dia.length).forEach(paquete => {
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
		GENERADOS = (congruencialMulti(sem, sem.length, 0, []))
		tablaCongruencialMulti(GENERADOS)
	}

	let aleatorios = []
	GENERADOS.forEach(fila => { aleatorios.push(parseFloat(fila[fila.length - 1])) })

	let resPaqDias = []
	let gananciaTotal = 0
	for (let i = 0; i < DIAS_SIM; i++) {
		let dia = []
		dia.push(generarValores(aleatorios.splice(0, 1), 'paquetes_dia'))
		for (let j = 0; j < dia[0][0]; j++) {
			let paquete = []
			paquete.push(generarValores(aleatorios.splice(0, 1), 'destino'))
			paquete.push(generarValores(aleatorios.splice(0, 1), 'personas_paquete'))
			paquete.push(generarValores(aleatorios.splice(0, 1), 'tipo_paquete'))
			dia.push(paquete)
			gananciaTotal += costoPaquete(paquete[0][0], paquete[1][0], paquete[2][0])
		}

		resPaqDias.push(dia)
	}

	let totalVendido = paquetesVendidos(resPaqDias)
	let destinoMasVisitado = masVisitado(resPaqDias)

	let mayorNivelSocial = nivelSocial(resPaqDias)

	console.log('Paquetes vendidos:', totalVendido)
	console.log('Destinos más visitados:', `${destinoMasVisitado[0][0]}(${destinoMasVisitado[0][1]}), ${destinoMasVisitado[1][0]}(${destinoMasVisitado[1][1]})`)
	console.log(`Ganancia Total: ${gananciaTotal.toFixed(2)}$`)
	console.log(`Nivel Social que mas compra: ${mayorNivelSocial[0][0]}(${mayorNivelSocial[0][1]})`)

	//logs
	let dias = [];
	resPaqDias.forEach(dia => dias.push(dia[0]))
	tablaResultadoPaqDia(dias)
	tablaResultadoSimulacion(resPaqDias)

	$('#respuestas').modal()
	document.getElementById('res-paq-ven').innerHTML += `
	<td colspan="2" class="text-right"><strong>Total:</strong></td><td>${totalVendido}</td>`

	document.getElementById('numeros-tab').style.display = 'block'
	document.getElementById('simulacion-tab').style.display = 'block'
	$('#simulacion-tab').tab()
}