import axios from 'axios'

axios.defaults.baseURL = 'https://swapi.dev/api'

const getFilms = async () => {
	try {
		const res = await axios.get('/films')

		return res.data
	} catch (err) {
		return err.message
	}
}

const getCharacters = async () => {
	try {
		const res = await axios.get('/people')

		return res.data
	} catch (err) {
		return err.message
	}
}

const getSingleCharacter = async id => {
	try {
		const res = await axios.get(`/people/${id}`)

		return res.data
	} catch (err) {
		return err.message
	}
}

const getSingleFilm = async id => {
	try {
		const res = await axios.get(`/films/${id}`)

		return res.data
	} catch (err) {
		return err.message
	}
}

const getPage = async (query, id) => {
	try {
		const res = await axios.get(`/${query}/?page=${id}`)
		return res.data
	} catch (err) {
		return err.message
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getFilms,
	getCharacters,
	getSingleCharacter,
	getSingleFilm,
	getPage,
}