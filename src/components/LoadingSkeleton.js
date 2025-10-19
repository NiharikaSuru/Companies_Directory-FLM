const LoadingSkeleton = ({ viewMode = 'table' }) => {
  const SkeletonBox = ({ className }) => (
    <div className={`bg-gray-200 rounded animate-skeleton-loading ${className}`}></div>
  );

  if (viewMode === 'table') {
    return (
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3"><SkeletonBox className="h-4 w-8" /></th>
                <th className="px-4 py-3"><SkeletonBox className="h-4 w-20" /></th>
                <th className="px-4 py-3"><SkeletonBox className="h-4 w-16" /></th>
                <th className="px-4 py-3"><SkeletonBox className="h-4 w-16" /></th>
                <th className="px-4 py-3"><SkeletonBox className="h-4 w-20" /></th>
                <th className="px-4 py-3"><SkeletonBox className="h-4 w-16" /></th>
                <th className="px-4 py-3"><SkeletonBox className="h-4 w-16" /></th>
                <th className="px-4 py-3"><SkeletonBox className="h-4 w-16" /></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(8)].map((_, index) => (
                <tr key={index}>
                  <td className="px-4 py-3"><SkeletonBox className="h-4 w-6" /></td>
                  <td className="px-4 py-3"><SkeletonBox className="h-4 w-32" /></td>
                  <td className="px-4 py-3"><SkeletonBox className="h-6 w-20 rounded-full" /></td>
                  <td className="px-4 py-3"><SkeletonBox className="h-4 w-24" /></td>
                  <td className="px-4 py-3"><SkeletonBox className="h-4 w-12" /></td>
                  <td className="px-4 py-3"><SkeletonBox className="h-4 w-16" /></td>
                  <td className="px-4 py-3"><SkeletonBox className="h-4 w-12" /></td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <SkeletonBox className="h-4 w-4" />
                      <SkeletonBox className="h-4 w-4" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Card view skeleton
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <SkeletonBox className="w-10 h-10 rounded-lg" />
              <div className="min-w-0 flex-1">
                <SkeletonBox className="h-4 w-24 mb-2" />
                <SkeletonBox className="h-5 w-16 rounded-full" />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <SkeletonBox className="h-3 w-3 mr-2" />
              <SkeletonBox className="h-3 w-32" />
            </div>
            <div className="flex items-center">
              <SkeletonBox className="h-3 w-3 mr-2" />
              <SkeletonBox className="h-3 w-20" />
            </div>
            <div className="flex items-center">
              <SkeletonBox className="h-3 w-3 mr-2" />
              <SkeletonBox className="h-3 w-16" />
            </div>
            <div className="flex items-center">
              <SkeletonBox className="h-3 w-3 mr-2" />
              <SkeletonBox className="h-3 w-12" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex space-x-2">
              <SkeletonBox className="h-4 w-4" />
              <SkeletonBox className="h-4 w-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;