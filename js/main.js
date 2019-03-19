let metodo = null;
let n = 0;

const addInputs = () => {
	metodo = document.getElementById('metodo').value;
	if (metodo == 'promed') inputsProductoMedio()
	if (metodo == 'promed2') inputsProductoMedioVariado()
	if (metodo == 'cuamed') inputsCuadradoMedio()
	if (metodo == 'conmix') inputsCongruencialMixto()
	if (metodo == 'conmul') inputsCongruencialMulti()
}

const extraerCentro = (y, k) => {
	let desde = ((y.length - k) / 2);
	return (y.toString().substring(desde, desde + k))
}

const ejecutar = () => {
	n = parseInt(document.getElementById('n').value)
	if (metodo == 'cuamed') {	
		let sem = document.getElementById('sem').value
		let NPA = (cuadradoMedio(sem, sem.toString().length, 0, []))
		let aleatorios = []
		NPA.forEach(fila => {aleatorios.push(parseFloat(fila[fila.length-1]))})
		tablaCuadradoMedio(NPA)
	}
	if (metodo == 'promed') {	
		let sem1 = document.getElementById('sem1').value
		let sem2 = document.getElementById('sem2').value
		let NPA = (productoMedio(sem1, sem2, sem1.length, 0, []))
		let aleatorios = []
		NPA.forEach(fila => {aleatorios.push(parseFloat(fila[fila.length-1]))})
		tablaProductoMedio(NPA)
	}
	if (metodo == 'promed2') {	
		let sem = document.getElementById('sem').value
		let a = document.getElementById('a').value
		let NPA = (productoMedioVariado(sem, a, sem.length, 0, []))
		let aleatorios = []
		NPA.forEach(fila => {aleatorios.push(parseFloat(fila[fila.length-1]))})
		tablaProductoMedioVariado(NPA)
	}
	if (metodo == 'conmix') {	
		let sem = document.getElementById('sem').value
		let NPA = (congruencialMixto(sem, sem.length, 0, []))
		let aleatorios = []
		NPA.forEach(fila => {aleatorios.push(parseFloat(fila[fila.length-1]))})
		tablaCongruencialMixto(NPA)
	}
	if (metodo == 'conmul') {
		let sem = document.getElementById('sem').value
		let NPA = (congruencialMulti(sem, sem.length, 0, []))
		let aleatorios = []
		NPA.forEach(fila => {aleatorios.push(parseFloat(fila[fila.length-1]))})
		console.log(kolmogorov(aleatorios))
		tablaCongruencialMulti(NPA)
	}
}
