import { Box, Typography, Link, Stack, useTheme } from "@mui/material";
import {
  FaDiscord,
  FaGithub,
  FaFacebookF,
  FaInstagram,
  FaSteam,
  FaBlog,
  FaRegQuestionCircle,
  FaRegFileAlt,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsShieldLock, BsFileEarmarkText } from "react-icons/bs";

function Footer({ footerRef }) {
  const theme = useTheme();

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: 0.75,
    color: "text.secondary",
    textDecoration: "none",
    fontSize: "0.875rem",
    transition: "color 0.2s ease-in-out",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  };

  const sectionTitleStyle = {
    fontWeight: "bold",
    fontSize: "0.9rem",
    marginBottom: 0.5,
  };

  return (
    <Box
      component="footer"
      ref={footerRef}
      sx={{
        py: 6,
        px: { xs: 3, sm: 6 },
        mt: "auto",
        backgroundColor: theme.palette.background.paper,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "flex-start" }}
        spacing={4}
        flexWrap="wrap"
      >
        {/* Brand */}
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          Rehacktor
        </Typography>

        {/* Link Sections */}
        <Stack
          direction="row"
          spacing={{ xs: 4, md: 8 }}
          flexWrap="wrap"
          useFlexGap
        >
          {/* Community */}
          <Stack spacing={1}>
            <Typography sx={sectionTitleStyle}>Community</Typography>

            <Link
              href="https://discord.com/invite/yourserver"
              target="_blank"
              rel="noopener"
              sx={linkStyle}
            >
              <FaDiscord size={16} /> Discord
            </Link>
            <Link
              href="https://github.com/yourrepo"
              target="_blank"
              rel="noopener"
              sx={linkStyle}
            >
              <FaGithub size={16} /> GitHub
            </Link>
            <Link
              href="https://facebook.com/rehacktor"
              target="_blank"
              rel="noopener"
              sx={linkStyle}
            >
              <FaFacebookF size={16} /> Facebook
            </Link>
            <Link
              href="https://instagram.com/rehacktor"
              target="_blank"
              rel="noopener"
              sx={linkStyle}
            >
              <FaInstagram size={16} /> Instagram
            </Link>
            <Link
              href="https://store.steampowered.com/developer/rehacktor"
              target="_blank"
              rel="noopener"
              sx={linkStyle}
            >
              <FaSteam size={16} /> Steam
            </Link>
          </Stack>

          {/* Risorse */}
          <Stack spacing={1}>
            <Typography sx={sectionTitleStyle}>Risorse</Typography>
            <Link
              href="https://blog.rehacktor.com"
              target="_blank"
              rel="noopener"
              sx={linkStyle}
            >
              <FaBlog size={16} /> Blog
            </Link>
            <Link
              href="https://rehacktor.com/changelog"
              target="_blank"
              rel="noopener"
              sx={linkStyle}
            >
              <FaRegFileAlt size={16} /> Changelog
            </Link>
            <Link
              href="https://rehacktor.com/faq"
              target="_blank"
              rel="noopener"
              sx={linkStyle}
            >
              <FaRegQuestionCircle size={16} /> FAQ
            </Link>
          </Stack>

          {/* Legal */}
          <Stack spacing={1}>
            <Typography sx={sectionTitleStyle}>Legal</Typography>
            <Link
              href="https://rehacktor.com/privacy"
              target="_blank"
              rel="noopener"
              sx={linkStyle}
            >
              <BsShieldLock size={16} /> Privacy Policy
            </Link>
            <Link
              href="https://rehacktor.com/terms"
              target="_blank"
              rel="noopener"
              sx={linkStyle}
            >
              <BsFileEarmarkText size={16} /> Terms of Service
            </Link>
          </Stack>

          {/* Contatti */}
          <Stack spacing={1}>
            <Typography sx={sectionTitleStyle}>Contatti</Typography>
            <Link href="mailto:contact@rehacktor.com" sx={linkStyle}>
              <HiOutlineMail size={16} /> Email
            </Link>
            <Link
              href="https://twitter.com/rehacktor"
              target="_blank"
              rel="noopener"
              sx={linkStyle}
            >
              <FaTwitter size={16} /> Twitter / X
            </Link>
            <Link
              href="https://linkedin.com/company/rehacktor"
              target="_blank"
              rel="noopener"
              sx={linkStyle}
            >
              <FaLinkedin size={16} /> LinkedIn
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Footer;
