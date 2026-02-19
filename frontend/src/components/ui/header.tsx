import { ReactNode } from "react"

export const Header = ({children}:{children: ReactNode})=>{
    return(
        <header className="p-3 z-50 bg-black/70 backdrop-blur-md sticky top-0">
            {children}
        </header>
    )
}