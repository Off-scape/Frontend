
const CardLoading = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
      
      {/* Image skeleton */}
      <div className="w-full h-48 md:h-52 bg-gray-300" />

      <div className="p-4">
        
        {/* Date & time */}
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-3" />

        {/* Title */}
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-5 bg-gray-300 rounded w-1/2 mb-3" />

        {/* Organizer */}
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-4" />

        {/* Avatars */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <div className="w-8 h-8 rounded-full bg-gray-300" />
        </div>

      </div>
    </div>
  );
};

export default CardLoading;