import { useAdminEnquiries } from "./useAdminEnquiries";
import { EnquiriesTable } from "./EnquiriesTable";

export const EnquiriesTab = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useAdminEnquiries();

  const enquiries =
    data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return <p>Loading enquiries...</p>;
  }

  return (
    <>
      {/* Stats Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Enquiries</p>
            <p className="text-3xl font-bold text-blue-600">
              {enquiries.length}
            </p>
          </div>
        </div>
      </div>

      <EnquiriesTable
        enquiries={enquiries}
        onLoadMore={fetchNextPage}
        hasMore={hasNextPage}
        isLoadingMore={isFetchingNextPage}
      />
    </>
  );
};
