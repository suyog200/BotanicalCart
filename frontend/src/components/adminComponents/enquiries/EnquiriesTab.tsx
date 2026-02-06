import { useAdminEnquiries } from "./useAdminEnquiries";
import { EnquiriesTable } from "./EnquiriesTable";
import { useState } from "react";

export const EnquiriesTab = () => {
  const [statusFilter, setStatusFilter] = useState<string | undefined>();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useAdminEnquiries(statusFilter);

  const enquiries =
    data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return <p>Loading enquiries...</p>;
  }

  return (
    <>
      {/* Header + Filter */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Enquiries</h2>
        <select
          value={statusFilter ?? ""}
          onChange={(e) =>
            setStatusFilter(
              e.target.value || undefined
            )
          }
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>
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
