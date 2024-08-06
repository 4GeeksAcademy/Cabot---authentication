const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null
		},
		actions: {
			login: async (email, password) => {
				let options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email: email, password: password })
				}
				let response = await fetch(process.env.BACKEND_URL + "api/login", options)
				if (response.status != 200) {
					console.log(response.status)
					let message = await response.json()
					console.log(message)
					return false
				} else {
					let data = await response.json()
					console.log(data)
					sessionStorage.setItem("token", data.token)
					return true
				}
			},
			signup: async (email, password) => {
				let options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email: email, password: password })
				}
				let response = await fetch(process.env.BACKEND_URL + "api/signup", options)
				if (response.status != 201) {
					console.log(response.status)
					let message = await response.json()
					console.log(message)
					return false
				} else {
					let data = await response.json()
					console.log(data)
					return true

				}
			},
			goPrivate: async() => {
				let options = {
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token")
					},
				}
				let response = await fetch(process.env.BACKEND_URL + "api/private", options)
				if (response.status != 200) {
					console.log(response.status)
					let message = await response.json()
					console.log(message)
					return false
				} else {
					let data = await response.json()
					console.log(data)
					setStore({
						message: data.msg
					})
					return true

				}
			} 
		}
	};
}
export default getState;
