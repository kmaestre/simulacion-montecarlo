// ordenar numeros de menor a mayor
// D+ = Mayor valor resultado de -> i/n - Ri
// D- = Mayor valor resultado de -> Ri - (i-1/n)
// D = Mayor valir entre D+ y D-
// Dα = Valor en n segun tabla de valores cirticos (d_alphas) con α = 0.05
// si D > D_alpha, falla.
// si D < D_alpha, pasa.

const d_alphas = [
	0.975,0.842,0.708,0.624,0.565,
	0.521,0.486,0.457,0.532,0.410,
	0.391,0.375,0.361,0.349,0.338,
	0.328,0.309,0.301,0.294,0.270,
	0.240,0.230
]

const kolmogorov = (numeros) => {
	let n = numeros.length
	let Rs = numeros.slice(0, n).sort((a, b) => a-b)
	let D_minus = 0;
	let D_plus = 0;

	Rs.forEach((r, i) => {
		let in_r = (((i + 1)/ n) - r)
		D_plus = (D_plus > in_r) ? D_plus : in_r

		let r_i_1n = (r - ((i) / n))
		D_minus = D_minus > r_i_1n ? D_minus : r_i_1n 
	})

	let D_alpha = (n > 35) ? (1.36/Math.sqrt(n)) : d_alphas[n-1]

	let D = (D_plus > D_minus) ? D_plus : D_minus

	console.log('D+:',D_plus,'\nD-:', D_minus, '\nDα:', D_alpha, '\nD:', D)

	return (D < D_alpha)

}

//kolmogorov([0.44, 0.81, 0.14, 0.05, 0.93])