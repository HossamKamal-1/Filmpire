import { Stack, Typography, Button } from '@mui/material';
function Pagination({
  currentPage,
  totalPages,
  handleNextPage,
  handlePrevPage,
  style,
}) {
  if (totalPages === 1 || totalPages === undefined) {
    return null;
  }
  function handleNextClick() {
    if (currentPage < totalPages) {
      window.scrollTo({ top: 0 });
      handleNextPage();
    }
  }
  function handlePrevClick() {
    if (currentPage > 1) {
      handlePrevPage();
      window.scrollTo({ top: 0 });
    }
  }
  return (
    <Stack flexDirection='row' justifyContent='center' style={style}>
      <Button
        onClick={handlePrevClick}
        variant='outlined'
        disabled={currentPage === 1}
      >
        Prev
      </Button>
      <Typography variant='h5' alignSelf='center' px={1} color='text.primary'>
        {currentPage} / {totalPages}
      </Typography>
      <Button
        disabled={currentPage === totalPages}
        onClick={handleNextClick}
        variant='outlined'
      >
        Next
      </Button>
    </Stack>
  );
}
export default Pagination;
