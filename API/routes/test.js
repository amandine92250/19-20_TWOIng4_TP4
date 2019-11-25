var express = require('express');
var router = express.Router();
var _ = require('lodash');
var axios = require('axios');

/*e4877e33*/


/* Doc API https://documenter.getpostman.com/view/9595426/SW7dWSLU */
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



/* UPDATE a movie */
router.post('/:id', (req, res) => {
	// Prend l'id du film qu'on veut update
	const { id } = req.params;
	//Prend la nouvelle donée à mettre à jour
	const { movie } = req.body;
	// Find in DB
	const movieToUpdate = _.find(movies, ["id", id]);
	// Mise a jour de la donnée avce la nouvelle donnée
	movieToUpdate.movie = movie;
	// Message
	res.status(200).json({
		message: `Mise a jour ${id}`,
	});
});



/* DELETE movie par id */
router.delete('/:id', (req, res) => {
	// On prend l'id du film qu'on veut supprimer
	const { id } = req.params;
	// Suppresion dans la BD
	_.remove(movies, ["id", id]);
	// Message
	res.status(200).json({
		message: `Suppression de ${id}`
	});
});
module.exports = router;
