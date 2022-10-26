import { Outlet, Route, Routes } from "react-router-dom"
import { Shop } from "../aquarium/shop/shop"
import { TankView } from "./TankView"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>

                    <Outlet />
                </>
            }>

                <Route path="" element={ <TankView /> } />
                <Route path="shop" element={ <Shop /> } />
            </Route>
        </Routes>
    )
}