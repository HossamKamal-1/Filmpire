import { Grid } from '@mui/material';
import RenderList from '../renderList/RenderList';
import MovieSkeleton from '../movieSkeleton/MovieSkeleton';

function MoviesSkeletonGrid({ numberOfSkeletons = 5 }) {
  return (
    <Grid container spacing={3}>
      <RenderList
        data={Array.from({ length: numberOfSkeletons })}
        renderItem={(_, index) => (
          <Grid xs={12} sm={6} md={4} lg={3} xl={2.4} key={index} item>
            <MovieSkeleton />
          </Grid>
        )}
      />
    </Grid>
  );
}
export default MoviesSkeletonGrid;
