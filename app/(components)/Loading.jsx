export default function Loading() {
  const skeletonCount = 8; // Number of skeleton items to render

  return (
    <div className="w-fit gap-10 flex justify-center flex-wrap my-4 mx-4">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse space-y-4 w-60 max-w-80 h-96 flex flex-col flex-grow"
        >
          <div className="bg-gray-300 h-full w-full rounded-lg"></div>{" "}
          {/* Image Placeholder */}
          <div className="bg-gray-300 h-6 w-3/4 rounded"></div>{" "}
          {/* Location Placeholder */}
          <div className="bg-gray-300 h-6 w-1/2 rounded"></div> {/* Bedrooms */}
          <div className="flex justify-between items-center space-x-4 mt-2">
            <div className="bg-gray-300 h-8 w-1/3 rounded"></div>{" "}
            {/* View Button Placeholder */}
            <div className="bg-gray-300 h-6 w-1/3 rounded"></div>{" "}
            {/* Price Placeholder */}
          </div>
        </div>
      ))}
    </div>
  );
}
