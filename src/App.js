import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorization"
import { ApplicationViews } from "./views/ApplicationView"
import { Login } from "./login/login"
import { Register } from "./login/register"
import "./App.css"


export const App = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<>
					<ApplicationViews />
				</>
			</Authorized>

		} />
	</Routes>
}