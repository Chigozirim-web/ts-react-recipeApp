
export const NavBar = () => {
    return(
        <nav className='flex flex-row p-4 bg-gray-800 text-gray-300 items-center justify-between'>
            <div className="flex items-center gap-2">
                <img className="w-10 h-10" src="/logo.png" alt="Logo" />
                <h1 className='text-xl'>Your Recipe Manager</h1>
            </div>
           <div className="absolute right-10 flex items-center">
                <button className="relative flex rounded-full bg-white">
                    <img className="size-10 rounded-full"></img>
                </button>
           </div>
        </nav>
    );
};