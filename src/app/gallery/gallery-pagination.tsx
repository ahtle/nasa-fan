import BaseButton from "@/components/buttons/base-button";

interface GalleryPaginationProps {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export default function GalleryPagination({
  page,
  totalPages,
  hasNextPage,
  onPageChange,
  disabled = false,
}: GalleryPaginationProps) {
  const hasPreviousPage = page > 1;

  if (!hasPreviousPage && !hasNextPage) {
    return null;
  }

  return (
    <nav
      aria-label="Gallery pagination"
      className="flex items-center justify-center gap-4 pt-2"
    >
      <BaseButton
        onClick={() => onPageChange(page - 1)}
        disabled={disabled || !hasPreviousPage}
      >
        Previous
      </BaseButton>
      <p className="text-sm text-zinc-500">
        Page {page} of {totalPages}
      </p>
      <BaseButton
        onClick={() => onPageChange(page + 1)}
        disabled={disabled || !hasNextPage}
      >
        Next
      </BaseButton>
    </nav>
  );
}
