import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const Appcontext = createContext()

const AppcontextProvider = (props)=>{
    const [user, setuser] = useState(null);
    const [showLogin,setshowLogin]= useState(false)
    const [token,setToken] = useState(localStorage.getItem('token'))

    

    const [credit,setCredit] = useState(false)

    const backendurl = import.meta.env.VITE_BACKEND_URL

    const nevigate = useNavigate()

    const loadCreditData = async ()=>{

        try {
            const {data} = await axios.get(backendurl+'/api/user/credits', {headers:{token}})
            if(data.success){
                setCredit(data.credits)
                setuser(data.user)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
    }

    const generateImage = async (prompt)=>{
        try {
            const {data} = await axios.post(backendurl + '/api/image/generate-image',{prompt},{headers:{token}})
            if(data.success){
                loadCreditData()
                return data.resultImage
            }else{
                toast.error(data.message)
                loadCreditData()
                if(data.creditBalance === 0 ){
                    nevigate('/buycredit')

                }
            }
            
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    const logout = ()=>{
        localStorage.removeItem('token');
        setToken('')
        setuser(null)
    }
    useEffect(() => {
      if(token){
        loadCreditData()
      }
    
      return () => {
        second
      }
    }, [])
    


    const value = {
        user,setuser,showLogin,setshowLogin,backendurl, token,setToken,credit,setCredit,loadCreditData, logout , generateImage
    }
    return(<Appcontext.Provider value={value}>
        {props.children}
    </Appcontext.Provider>)

}
export default AppcontextProvider