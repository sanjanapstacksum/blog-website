import { Outlet,Navigate } from "react-router-dom"
import Login from "../Components/Pages/login"


const MainLayout=()=>{
    

    var loginUser= sessionStorage.getItem('user-email')

    return(<>
    {loginUser ?<Outlet/>:<Navigate to="/auth/login" />}
    </>)
}
export default MainLayout