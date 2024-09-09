import { createContext, useContext, useState } from "react";

const NavbarContext = createContext();

export function NavbarContextProvider({children}){
    const [clickedElement, setClickedElement] = useState(null)

    return (
        <NavbarContext.Provider value={{ clickedElement, setClickedElement }}>
            {children}
        </NavbarContext.Provider>
    )
}

export function useNavbarContext(){
    return useContext(NavbarContext)
}