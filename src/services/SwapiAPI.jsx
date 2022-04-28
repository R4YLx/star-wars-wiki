import axios from 'axios'

axios.defaults.baseURL = 'https://swapi.dev/api'

const getFilms = async page => {
	const res = await axios.get(`/films/?page=${page}`)

	return res.data
}

const getCharacters = async page => {
	const res = await axios.get(`/people/?page=${page}`)

	return res.data
}

// const getCharacters = async (query = null, page) => {
// 	if (query) {
// 		const res = await axios.get(`people/?search=${query}&page=${page}`)
// 		return res.data
// 	} else {
// 		const res = await axios.get(`/people/?page=${page}`)
// 		return res.data
// 	}
// }

const getSingleCharacter = async id => {
	const res = await axios.get(`/people/${id}`)
	return res
}

const getSingleFilm = async id => {
	const res = await axios.get(`/films/${id}`)
	return res
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
