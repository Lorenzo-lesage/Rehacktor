import { Box, Typography, Link, Stack } from "@mui/material";

function Footer({ footerRef }) {
  /*
    |-----------------------------------------------------
    | Return
    |-----------------------------------------------------
    */

  return (
    <Box
      component="footer"
      ref={footerRef}
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        height: 120,
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          Rehacktor
        </Typography>

        <Stack direction="row" spacing={2}>
          <Link
            href="#"
            variant="body2"
            color="text.secondary"
            underline="hover"
          >
            ...
          </Link>
          <Link
            href="#"
            variant="body2"
            color="text.secondary"
            underline="hover"
          >
            ...
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Footer;
