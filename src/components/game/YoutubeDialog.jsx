import Dialog from "@mui/material/Dialog";

function YoutubeModal({ open, onClose, videoId }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <iframe
        width="100%"
        height="480"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </Dialog>
  );
}

export default YoutubeModal;