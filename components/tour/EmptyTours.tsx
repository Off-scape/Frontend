
const EmptyTours = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
            <div className="w-40 h-40 mb-6 relative">
                <svg
                    width="160"
                    height="160"
                    viewBox="0 0 160 160"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="160" height="160" rx="16" fill="#F3F4F6" />
                    <circle cx="80" cy="60" r="30" fill="#E5E7EB" />
                    <path
                        d="M40 120C40 100 120 100 120 120H40Z"
                        fill="#E5E7EB"
                    />
                    <line x1="50" y1="70" x2="70" y2="90" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" />
                    <line x1="70" y1="70" x2="50" y2="90" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" />
                </svg>

            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                Hələ heç bir tur mövcud deyil
            </h3>
            <p className="text-sm text-gray-500">
                Hal-hazırda seçdiyiniz kateqoriyada heç bir tur tapılmadı.
            </p>
        </div>
    );
};

export default EmptyTours;