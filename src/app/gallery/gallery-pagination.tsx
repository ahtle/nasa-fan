import ButtonBase from "@/components/buttons/button-base";

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
      <ButtonBase
        onClick={() => onPageChange(page - 1)}
        disabled={disabled || !hasPreviousPage}
      >
        Previous
      </ButtonBase>
      <p className="text-sm text-zinc-500">
        Page {page} of {totalPages}
      </p>
      <ButtonBase
        onClick={() => onPageChange(page + 1)}
        disabled={disabled || !hasNextPage}
      >
        Next
      </ButtonBase>
    </nav>
  );
}
