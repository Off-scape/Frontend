import HeaderLogo from "./HeaderLogo";

const Header = () => {
  return (
    // Üst və kənar boşluqları sıfırladıq (py-0)
    <header className="w-full  px-0"> 
      <div className="w-full">
        {/* bg-container: rounded-full və w-full birlikdə */}
        <div className="bg-[#0A332A] rounded-l-3xl h-[80px] flex items-center justify-between text-white px-10 shadow-lg">
          
          {/* Logo hissəsi */}
          <div className="flex items-center shrink-0">
            <HeaderLogo />
          </div>

          
        </div>
      </div>
    </header>
  );
};

export default Header;