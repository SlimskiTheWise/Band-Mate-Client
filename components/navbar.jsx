export default function Navbar() {
    return (
        <nav className="bg-blue-800 text-white py-4 px-6 flex justify-start items-center">
            <a href="#" className=" relative text-4xl hover:opacity-60">Bandmate</a>
            <button data-collapse-toggle="navbar-hamburger" type="button" class="sm:hidden inline-flex items-center p-2 ml-auto text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            </button>
            <div className="hidden sm:flex text-2xl ml-auto space-x-8" id="navbar-hamburger">
                <a href="/auth/login" className="hover:opacity-60">Log In</a>
                <a href="/users/signup" className="hover:opacity-60">Sign Up</a>
            </div>
        </nav>
    )
}
