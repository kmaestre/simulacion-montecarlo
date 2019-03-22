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
		GENERADOS = productoMedio(sem1, sem2, sem1.length, 0, [])
		tablaProductoMedio(GENERADOS)
	}
	if (metodo == 'promed2') {
		let sem = document.getElementById('sem').value
		let a = document.getElementById('a').value
		tablaProductoMedioVariado(GENERADOS)
	}
	if (metodo == 'conmix') {
		let sem = document.getElementById('sem').value
		GENERADOS = (congruencialMixto(sem, sem.length, 0, []))
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
	for (let i = 0; i < DIAS_SIM; i++) {
		let dia = []
		dia.push(generarValores(aleatorios.splice(0, 1), 'paquetes_dia'))
		for (let j = 0; j < dia[0][0]; j++) {
			let paquete = []
			paquete.push(generarValores(aleatorios.splice(0, 1), 'destino'))
			paquete.push(generarValores(aleatorios.splice(0, 1), 'personas_paquete'))
			paquete.push(generarValores(aleatorios.splice(0, 1), 'tipo_paquete'))
			dia.push(paquete)
		}

		resPaqDias.push(dia)
	}

	//PER_PAQ = generarValores(aleatorios.splice(0, totalPaquetes), 'personas_paquete')
	//TIP_PAQ = generarValores(aleatorios.splice(0, totalPaquetes), 'tipo_paquete')
	//DES_PAQ = generarValores(aleatorios.splice(0, totalPaquetes), 'destino')


	//logs
	let dias = [];
	resPaqDias.forEach(dia => dias.push(dia[0]))
	tablaResultadoPaqDia(dias)
	tablaResultadoSimulacion(resPaqDias)
}