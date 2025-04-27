import { FC, ReactElement } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import logo from "../../assets/logo.png"

export const NavBar: FC<{firstName: string}> = (props): ReactElement => {
    const { firstName = "John" } = props;

    return(
        <section className="fixed top-0 left-0 right-0 z-50">
            <nav className='flex flex-row p-4 bg-gray-800 text-gray-300 items-center justify-between'>
                <div className="flex items-center gap-2">
                    <img className="w-17 h-13 mr-3" src={logo} alt="Logo" />
                    <h1 className='text-xl italic'>Your Recipe Manager</h1>
                </div>
                <div className="absolute right-15 flex items-center gap-3">
                    <Avatar  className={`${cn("h-14", "w-14")}`}>
                        <AvatarFallback 
                            className={`text-2xl font-semibold ${cn(
                                "bg-sky-600", 
                                "dark: bg-sky-600"
                                )}`}
                            >
                                {firstName.slice(0, 1)}
                            </AvatarFallback>
                    </Avatar>
                    <h4>Hello, {firstName}</h4>
                </div>
            </nav>
        </section>
        
    );
};