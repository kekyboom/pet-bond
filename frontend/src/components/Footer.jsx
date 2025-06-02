import logoTxt from "../assets/img/pb-logo-txt.png"

function Footer() {
    return (
        <footer className="w-full bg-pbdarkblue">
            <div className="w-full max-w-screen-xl mx-auto md:py-8">
                <div className="sm:flex sm:items-center sm:justify-center">
                    <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src={logoTxt} className="h-15" alt="Flowbite Logo" />
                    </a>
   
                </div>
                <hr className="border-pbwhite sm:mx-auto  lg:my-4" />
                <span className="block text-sm text-pbwhite sm:text-center">© 2023 PetBond - Todos los derechos reservados.</span>
            </div>
        </footer>
    );
}

export default Footer;