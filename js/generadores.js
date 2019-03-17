const cuadradoMedio = (seed, k, i, tabla) => {
	let cuadrado = (parseInt(seed)**2).toString()
	let nuevaSemilla = extraerCentro(cuadrado, k);
	tabla.push([seed, cuadrado, nuevaSemilla, nuevaSemilla/10**k])
	if (i < n-1) {
		return cuadradoMedio(nuevaSemilla, k, i+1, tabla)
	} else {
		return tabla
	}
}

const productoMedioVariado = (seed, a, k , i, tabla) => {
	let producto = (parseInt(seed) * parseInt(a)).toString()
	let nuevaSemilla = extraerCentro(producto, k)
	tabla.push([seed, producto, nuevaSemilla, nuevaSemilla/10**k])

	if (i < n-1) {
		return productoMedioVariado(nuevaSemilla, a, k, i+1, tabla)
	} else {
		return tabla
	}
}

const productoMedio = (seed1, seed2, k , i, tabla) => {
	let producto = (parseInt(seed1) * parseInt(seed2)).toString()
	let nuevaSemilla = extraerCentro(producto, k)
	tabla.push([seed1, seed2, producto, nuevaSemilla, nuevaSemilla/10**k])
	if (i < n-1) {
		return productoMedio(seed2, nuevaSemilla, k, i+1, tabla)
	} else {
		return tabla
	}
}

const congruencialMixto = (seed, k, i, tabla) => {
	let c = 421, m = 1000, a = 61
	let aseedc = ((a*(parseInt(seed))) + c)
	let nuevaSemilla = (aseedc % m).toString()
	let numero = (parseInt(seed)) / m

	if (nuevaSemilla.length < k) {
		let ceros = '';
		for (let i = k - nuevaSemilla.length; i > 0; i--) {
			ceros += '0'
		}
		nuevaSemilla = ceros+nuevaSemilla
	}

	tabla.push([seed, aseedc.toString(), nuevaSemilla, numero.toFixed(3).toString()])
	if (i < n-1) {
		return congruencialMixto(nuevaSemilla, k, i+1, tabla)
	} else {
		return tabla
	}
}

const congruencialMulti = (seed, k, i, tabla) => {
	let m = 128, a = 11
	let aseed = ((a*(parseInt(seed))))
	let nuevaSemilla = (aseed % m).toString()
	let numero = (parseInt(seed)) / m

	if (nuevaSemilla.length < k) {
		let ceros = '';
		for (let i = k - nuevaSemilla.length; i > 0; i--) {
			ceros += '0'
		}
		nuevaSemilla = ceros+nuevaSemilla
	}

	tabla.push([seed, aseed.toString(), nuevaSemilla, numero.toFixed(3).toString()])
	if (i < n-1) {
		return congruencialMulti(nuevaSemilla, k, i+1, tabla)
	} else {
		return tabla
	}
}