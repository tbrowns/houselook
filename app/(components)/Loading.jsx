export default function Loading() {
  const skeletonCount = 8; // Number of skeleton items to render

  return (
    <div className="w-full gap-10 flex flex-wrap my-4 mx-4">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse space-y-4 w-64 h-96 flex flex-col flex-grow"
        >
          <div className="bg-gray-300 h-full w-full rounded-lg"></div>{" "}
          {/* Image Placeholder */}
          <div className="flex space-x-4">
            <div className="bg-gray-300 h-6 w-1/2 rounded"></div>{" "}
            {/* Title Placeholder */}
            <div className="bg-gray-300 h-6 w-1/4 rounded"></div>{" "}
            {/* Price Placeholder */}
          </div>
          <div className="bg-gray-300 h-6 w-3/4 rounded"></div>{" "}
          {/* Location Placeholder */}
          <div className="bg-gray-300 h-6 w-5/6 rounded"></div>{" "}
          {/* Description Line 1 */}
          <div className="bg-gray-300 h-6 w-2/3 rounded"></div>{" "}
          {/* Description Line 2 */}
        </div>
      ))}
    </div>
  );
}
