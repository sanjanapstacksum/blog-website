import './NoPagelayOut.css'
import { useNavigate } from 'react-router-dom';
const NoPagelayOut = () =>{
    const navigate = useNavigate()
    return(<>
   <div className='child'><h1 >404 !! PAGE NOT FOUND</h1>
    <button type="button" className="btn btn-primary" id="back-home"onClick={(e)=>{e.preventDefault(); navigate('/')}} >Back Home</button></div>
    
   </>)
}
export default NoPagelayOut