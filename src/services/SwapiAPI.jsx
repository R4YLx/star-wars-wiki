import axios from 'axios'

axios.defaults.baseURL = 'https://swapi.dev/api'

const getFilms = async (query = null, page) => {
	const res = await axios.get(`films/?search=${query}&page=${page}`)

	return res.data
}

const getCharacters = async (query = null, page) => {
	const res = await axios.get(`people/?search=${query}&page=${page}`)
	return res.data
}

const getSingleCharacter = async id => {
	const res = await axios.get(`/people/${id}`)
	return res
}

const getSingleFilm = async id => {
	const res = await axios.get(`/films/${id}`)
	return res
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getFilms,
	getCharacters,
	getSingleCharacter,
	getSingleFilm,
}
