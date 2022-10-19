import { Outlet, Route, Routes } from "react-router-dom"
import { FishList } from "../aquarium/Aquarium"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>

                    <Outlet />
                </>
            }>

                <Route path="waterrarium" element={ <FishList /> } />
            </Route>
        </Routes>
    )
}