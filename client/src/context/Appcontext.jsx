import { createContext, useState } from "react";

export const Appcontext = createContext()

const AppcontextProvider = (props)=>{
    const [user, setuser] = useState(null);
    const [showLogin,setshowLogin]= useState(false)


    const value = {
        user,setuser,showLogin,setshowLogin
    }
    return(<Appcontext.Provider value={value}>
        {props.children}
    </Appcontext.Provider>)

}
export default AppcontextProvider