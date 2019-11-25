var express = require('express');
var router = express.Router();
var _ = require('lodash');
var axios = require('axios');

/*e4877e33*/
//Tableau
var movies = [];


/* CRUD */

/* GET liste des films */
router.get('/', (req, res) => {
	res.status(200).json({ movies });
});


/*GET film par id */
router.get('/:id', (req, res) => {
	const { id } = req.params;
	// Trouver le film dans la DB
	const movie =_.find(movies, ["id", id]);
	// Retourne le film
	res.status(200).json({
		message: 'Film trouvé !',movie });
});




/*PUT ajouter nouveau film via son nom */
router.put('/', (req, res) => {
	// Obtenie donne de requete
	const { name } = req.body;
	// Creation d'un nouvel id
	const id = _.uniqueId();

	axios({
		method: 'get',
		url: `http://www.omdbapi.com/?t=${name}&apikey=e4877e33`,
		responseType: 'json'
	})

		.then(function (response) {
		const monFilm = response.data;
		// Insertion dans le tableau 
		movies.push({ monFilm, id });
		res.status(200).json({
			message: `Nous avons ajouté ${id}`,
			movie: {monFilm}
		});

	});
});




