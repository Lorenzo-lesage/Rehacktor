import GenresDropdown from "../game/GenresDropdown";
import { Box } from "@mui/material";

function SideBar({  navbarHidden }) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const headerHeight = 64;
  const marginTop = navbarHidden ? 0 : headerHeight;

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <Box
      component="aside"
      sx={{
        width: 240,
        display: { xs: "none", sm: "block" },
        flexShrink: 0,
      }}
    >
      {/* Wrapper con altezza 100vh e overflow hidden */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "transparent",
          boxSizing: "border-box",
        }}
      >
        {/* Contenuto con marginTop per spostarlo verso il basso */}
        <Box
          sx={{
            marginTop: `${marginTop}px`,
            height: `calc(100vh - ${marginTop}px)`,
            transition: "margin-top 0.3s ease",
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          paddingBottom: "2rem",
          }}
        >
          <GenresDropdown />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error,
            provident! Labore voluptate odit mollitia asperiores laudantium
            nobis! Iste, ad saepe labore in velit, non obcaecati soluta
            architecto rerum, eaque ut. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Vel qui aspernatur in animi sint molestias, fuga
            omnis a nostrum labore! Ex voluptates ut quod mollitia ipsam et
            doloremque doloribus laudantium. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Aperiam reiciendis aspernatur vero
            aut aliquid ut, suscipit, officia sapiente, molestias quos ratione
            earum? Recusandae, dolorum labore aspernatur sequi quibusdam quis
            quas! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Sapiente explicabo dolore eius temporibus at, commodi dolorem autem
            facere vero laudantium facilis nesciunt aperiam dicta voluptates
            nobis totam. Odit, eligendi aperiam. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Veritatis quos voluptate, veniam est
            iste recusandae maxime ex quibusdam eos doloribus ipsa incidunt,
            odio corporis ut aut repudiandae voluptatem asperiores facere!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Assumenda magni excepturi laborum quidem facere. Officia voluptatem
            consequatur, optio atque beatae, at rerum possimus, accusamus
            facere ducimus eligendi earum suscipit fuga!
          </p>
        </Box>
      </Box>
    </Box>
  );
}

export default SideBar;
