const addInputs = () => {
	metodo = document.getElementById('metodo').value;
	if (metodo == '') clearInputs()
	if (metodo == 'promed') inputsProductoMedio()
	if (metodo == 'promed2') inputsProductoMedioVariado()
	if (metodo == 'cuamed') inputsCuadradoMedio()
	if (metodo == 'conmix') inputsCongruencialMixto()
	if (metodo == 'conmul') inputsCongruencialMulti()
}

const clearInputs = () => {
	document.getElementById('inputs').innerHTML = ''
}

const inputsCuadradoMedio = () => {
	let inputs = `
		<div class="form-group">
			<label for="sem">Semilla 1:</label>
			<input id="sem" name="sem" type="text" class="form-control" autocomplete="off" onpaste="return false" oninput="soloNumeros()">
		</div>
	`

	document.getElementById('inputs').innerHTML = inputs	
}

const inputsCongruencialMixto = () => {
	let inputs = `
		<div class="form-group">
			<label for="sem">Semilla 1:</label>
			<input id="sem" name="sem" type="text" class="form-control" autocomplete="off" onpaste="return false" oninput="soloNumeros()">
		</div>
		<div class="form-group">
			<label for="a">Constante a:</label>
			<input id="a" name="a" type="text" class="form-control" autocomplete="off" onpaste="return false" oninput="soloNumeros()">
		</div>
		<div class="form-group">
			<label for="c">Constante c:</label>
			<input id="c" name="c" type="text" class="form-control" autocomplete="off" onpaste="return false" oninput="soloNumeros()">
		</div>
		<div class="form-group">
			<label for="m">Constante m:</label>
			<input id="m" name="m" type="text" class="form-control" autocomplete="off" onpaste="return false" oninput="soloNumeros()">
		</div>
	`

	document.getElementById('inputs').innerHTML = inputs
}

const inputsCongruencialMulti = () => {
	let inputs = `
		<div class="form-group">
			<label for="sem">Semilla:</label>
			<input id="sem" name="sem" type="text" class="form-control" autocomplete="off" onpaste="return false" oninput="soloNumeros()">
		</div>
		<div class="form-group">
			<label for="a">Constante a:</label>
			<input id="a" name="a" type="text" class="form-control" autocomplete="off" onpaste="return false" oninput="soloNumeros()">
		</div>
		<div class="form-group">
			<label for="m">Constante m:</label>
			<input id="m" name="m" type="text" class="form-control" autocomplete="off" onpaste="return false" oninput="soloNumeros()">
		</div>
	`

	document.getElementById('inputs').innerHTML = inputs
}

const inputsProductoMedio = () => {
	let inputs = `
		<div class="form-group">
			<label for="sem1">Semilla 1:</label>
			<input id="sem1" name="sem1" type="text" class="form-control" autocomplete="off" onpaste="return false" oninput="soloNumeros()">
		</div>
		<div class="form-group">
			<label for="sem2">Semilla 2:</label>
			<input id="sem2" name="sem2" type="text" class="form-control" autocomplete="off" onpaste="return false" oninput="soloNumeros()">
		</div>
	`

	document.getElementById('inputs').innerHTML = inputs
}

const inputsProductoMedioVariado = () => {
	let inputs = `
		<div class="form-group">
			<label for="sem">Semilla 1:</label>
			<input id="sem" name="sem" type="text" class="form-control" autocomplete="off" onpaste="return false" oninput="soloNumeros()">
		</div>
		<div class="form-group">
			<label for="a">Constante a:</label>
			<input id="a" name="const_a" type="text" class="form-control" autocomplete="off" onpaste="return false" oninput="soloNumeros()">
		</div>
	`

	document.getElementById('inputs').innerHTML = inputs
}