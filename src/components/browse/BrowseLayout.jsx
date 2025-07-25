import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const BrowseLayout = ({
  title,
  data,
  isLoading,
  error,
  renderItem,
  bottomContent,
}) => {

  if (error) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="error" align="center" mt={4}>
          {error.message || error.toString()}
        </Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ my: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", textAlign: { xs: "center", md: "left" } }}
      >
        {title}
      </Typography>

      {isLoading && (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {data.map((item, index) => (
          <Grid size={{ xs: 6, md: 3 }} key={item.id || index}>
            {renderItem(item)}
          </Grid>
        ))}
      </Grid>

      {bottomContent && <Box my={4}>{bottomContent}</Box>}
    </Container>
  );
};

export default BrowseLayout;
