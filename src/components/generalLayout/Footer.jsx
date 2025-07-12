import { Box, Typography, Link, Stack, useTheme, alpha, Divider, Container, Paper } from "@mui/material";
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
    gap: 1,
    color: "text.secondary",
    textDecoration: "none",
    fontSize: "0.95rem",
    padding: "8px 12px",
    borderRadius: 2,
    transition: "all 0.3s ease",
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      transform: "translateX(4px)",
    },
  };

  const sectionTitleStyle = {
    fontWeight: 700,
    fontSize: "1.1rem",
    marginBottom: 2,
    color: theme.palette.text.primary,
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
  };

  const iconWrapperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    borderRadius: "50%",
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    transition: "all 0.3s ease",
  };

  return (
    <Box
      component="footer"
      ref={footerRef}
      sx={{
        mt: "auto",
        position: "relative",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.primary.main} 100%)`,
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
          borderRadius: 0,
          py: 6,
          px: 0,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "flex-start" }}
            spacing={4}
            flexWrap="wrap"
          >
            {/* Brand Section */}
            <Box sx={{ mb: { xs: 2, sm: 0 } }}>
              <Typography 
                variant="h4" 
                sx={{
                  fontWeight: 800,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  mb: 1,
                }}
              >
                Rehacktor
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  maxWidth: 200,
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}
              >
                Your ultimate gaming destination. Discover, play, and connect with amazing games.
              </Typography>
            </Box>

            {/* Link Sections */}
            <Stack
              direction="row"
              spacing={{ xs: 4, md: 6 }}
              flexWrap="wrap"
              useFlexGap
            >
              {/* Community */}
              <Stack spacing={1.5}>
                <Typography sx={sectionTitleStyle}>Community</Typography>
                <Stack spacing={0.5}>
                  <Link
                    href="https://discord.com/invite/yourserver"
                    target="_blank"
                    rel="noopener"
                    sx={linkStyle}
                  >
                    <Box sx={iconWrapperStyle}>
                      <FaDiscord size={12} />
                    </Box>
                    Discord
                  </Link>
                  <Link
                    href="https://github.com/yourrepo"
                    target="_blank"
                    rel="noopener"
                    sx={linkStyle}
                  >
                    <Box sx={iconWrapperStyle}>
                      <FaGithub size={12} />
                    </Box>
                    GitHub
                  </Link>
                  <Link
                    href="https://facebook.com/rehacktor"
                    target="_blank"
                    rel="noopener"
                    sx={linkStyle}
                  >
                    <Box sx={iconWrapperStyle}>
                      <FaFacebookF size={12} />
                    </Box>
                    Facebook
                  </Link>
                  <Link
                    href="https://instagram.com/rehacktor"
                    target="_blank"
                    rel="noopener"
                    sx={linkStyle}
                  >
                    <Box sx={iconWrapperStyle}>
                      <FaInstagram size={12} />
                    </Box>
                    Instagram
                  </Link>
                  <Link
                    href="https://store.steampowered.com/developer/rehacktor"
                    target="_blank"
                    rel="noopener"
                    sx={linkStyle}
                  >
                    <Box sx={iconWrapperStyle}>
                      <FaSteam size={12} />
                    </Box>
                    Steam
                  </Link>
                </Stack>
              </Stack>

              {/* Resources */}
              <Stack spacing={1.5}>
                <Typography sx={sectionTitleStyle}>Resources</Typography>
                <Stack spacing={0.5}>
                  <Link
                    href="https://blog.rehacktor.com"
                    target="_blank"
                    rel="noopener"
                    sx={linkStyle}
                  >
                    <Box sx={iconWrapperStyle}>
                      <FaBlog size={12} />
                    </Box>
                    Blog
                  </Link>
                  <Link
                    href="https://rehacktor.com/changelog"
                    target="_blank"
                    rel="noopener"
                    sx={linkStyle}
                  >
                    <Box sx={iconWrapperStyle}>
                      <FaRegFileAlt size={12} />
                    </Box>
                    Changelog
                  </Link>
                  <Link
                    href="https://rehacktor.com/faq"
                    target="_blank"
                    rel="noopener"
                    sx={linkStyle}
                  >
                    <Box sx={iconWrapperStyle}>
                      <FaRegQuestionCircle size={12} />
                    </Box>
                    FAQ
                  </Link>
                </Stack>
              </Stack>

              {/* Legal */}
              <Stack spacing={1.5}>
                <Typography sx={sectionTitleStyle}>Legal</Typography>
                <Stack spacing={0.5}>
                  <Link
                    href="https://rehacktor.com/privacy"
                    target="_blank"
                    rel="noopener"
                    sx={linkStyle}
                  >
                    <Box sx={iconWrapperStyle}>
                      <BsShieldLock size={12} />
                    </Box>
                    Privacy Policy
                  </Link>
                  <Link
                    href="https://rehacktor.com/terms"
                    target="_blank"
                    rel="noopener"
                    sx={linkStyle}
                  >
                    <Box sx={iconWrapperStyle}>
                      <BsFileEarmarkText size={12} />
                    </Box>
                    Terms of Service
                  </Link>
                </Stack>
              </Stack>

              {/* Contact */}
              <Stack spacing={1.5}>
                <Typography sx={sectionTitleStyle}>Contact</Typography>
                <Stack spacing={0.5}>
                  <Link 
                    href="mailto:contact@rehacktor.com" 
                    sx={linkStyle}
                  >
                    <Box sx={iconWrapperStyle}>
                      <HiOutlineMail size={12} />
                    </Box>
                    Email
                  </Link>
                  <Link
                    href="https://twitter.com/rehacktor"
                    target="_blank"
                    rel="noopener"
                    sx={linkStyle}
                  >
                    <Box sx={iconWrapperStyle}>
                      <FaTwitter size={12} />
                    </Box>
                    Twitter / X
                  </Link>
                  <Link
                    href="https://linkedin.com/company/rehacktor"
                    target="_blank"
                    rel="noopener"
                    sx={linkStyle}
                  >
                    <Box sx={iconWrapperStyle}>
                      <FaLinkedin size={12} />
                    </Box>
                    LinkedIn
                  </Link>
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          {/* Bottom Section */}
          <Box sx={{ mt: 6 }}>
            <Divider 
              sx={{ 
                mb: 3,
                borderColor: alpha(theme.palette.primary.main, 0.1),
              }} 
            />
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontWeight: 300 }}
              >
                © 2025 Rehacktor. All rights reserved.
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontWeight: 300 }}
              >
                Made with ❤️ for gamers worldwide
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
}

export default Footer;