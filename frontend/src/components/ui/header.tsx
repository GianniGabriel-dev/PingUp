import { ReactNode } from "react"

export const Header = ({children}:{children: ReactNode})=>{
    return(
        <header className="p-3 bg-black/55 sticky top-0">
            {children}
        </header>
    )
}