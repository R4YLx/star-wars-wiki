import axios from 'axios'

axios.defaults.baseURL = 'https://swapi.dev/api'

const getFilms = async () => {
	try {
		const res = await axios.get('/films')

		return res.data
	} catch (err) {
		throw err.message
	}
}

const getCharacters = async page => {
	try {
		const res = await axios.get(`/people/?page=${page}`)

		return res.data
	} catch (err) {
		throw err.message
	}
}

const getSingleCharacter = async id => {
	try {
		const res = await axios.get(`/people/${id}`)

		return res.data
	} catch (err) {
		throw err.message
	}
}

const getSingleFilm = async id => {
	try {
		const res = await axios.get(`/films/${id}`)

		return res.data
	} catch (err) {
		throw err.message
	}
}

const search = async (resource, query, page) => {
	const res = await axios.get(`${resource}/?search=${query}&page=${page}`)
	return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getFilms,
	getCharacters,
	getSingleCharacter,
	getSingleFilm,
	search,
}
