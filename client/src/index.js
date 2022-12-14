import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { setupStore } from './store/store'
import { Provider } from 'react-redux'

const store = setupStore()


let rerenderEntireTree = () => {
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root')
	)
}

rerenderEntireTree()