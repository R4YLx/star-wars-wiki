import axios from 'axios'

axios.defaults.baseURL = 'https://swapi.dev/api'

const getFilms = async page => {
	try {
		const res = await axios.get(`/films/?page=${page}`)

		return res.data
	} catch (err) {
		return err.response.status
	}
}

const getCharacters = async page => {
	try {
		const res = await axios.get(`/people/?page=${page}`)

		return res.data
	} catch (err) {
		return err.response.status
	}
}

const getSingleCharacter = async id => {
	try {
		const res = await axios.get(`/people/${id}`)
		return res.data
	} catch (err) {
		return err.response.status
	}
}

const getSingleFilm = async id => {
	try {
		const res = await axios.get(`/films/${id}`)
		return res.data
	} catch (err) {
		return err.response.status
	}
}

const search = async (resource, query, page) => {
	try {
		const res = await axios.get(`${resource}/?search=${query}&page=${page}`)
		return res.data
	} catch (err) {
		return err.response.status
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getFilms,
	getCharacters,
	getSingleCharacter,
	getSingleFilm,
	search,
}
