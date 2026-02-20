import HeaderLogo from "./HeaderLogo";

const Header = () => {
  return (
    <div className="bg-white">
      <header className="w-full  px-0">
        <div className="w-full">
          <div className="bg-[#0A332A] rounded-3xl h-[110px] flex items-center justify-between text-white px-5 shadow-lg">
            <div className="flex items-center shrink-0">
              <HeaderLogo />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
