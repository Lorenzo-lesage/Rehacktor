// RealtimeChat.jsx
import { useEffect, useState, useRef, useCallback, useContext } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import supabase from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";
import { Box, Typography, CircularProgress, Stack } from "@mui/material";

dayjs.extend(relativeTime);

function RealtimeChat({ data }) {
  const { userProfile } = useContext(SessionContext);
  const [messages, setMessages] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [error, setError] = useState(null);
  const messageRef = useRef(null);

  const scrollSmoothToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  };

  const getInitialMessages = useCallback(async () => {
    setLoadingInitial(true);
    const { data: messages, error } = await supabase
      .from("messages")
      .select("*")
      .eq("game_id", data.id)
      .order("id", { ascending: true });

    if (error) {
      setError(error.message);
      return;
    }

    setMessages(messages);
    setLoadingInitial(false);
    scrollSmoothToBottom();
  }, [data.id]);

  useEffect(() => {
    if (data) getInitialMessages();

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `game_id=eq.${data.id}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
          scrollSmoothToBottom();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      channel.unsubscribe();
    };
  }, [data, getInitialMessages]);

  return (
    <Box
      ref={messageRef}
      sx={{
        mt: 1,
        px: 2,
        py: 1,
        width: "100%",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "transparent",
        border: "1px solid #ccc",
        overflowY: "auto",
        borderRadius: 2,
        /* Scrollbar styles */
        "&::-webkit-scrollbar": {
          width: "8px", 
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f0f0f0", 
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888", 
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#555", 
        },
      }}
    >
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      {loadingInitial ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Stack spacing={1}>
          {messages.map((msg) => {
            const isOwn = msg.profile_id === userProfile?.id;
            return (
              <Box
                key={msg.id}
                sx={{
                  maxWidth: "75%",
                  alignSelf: isOwn ? "flex-end" : "flex-start",
                  bgcolor: isOwn ? "#dcf8c6" : "white",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  borderTopRightRadius: isOwn ? 0 : 2,
                  borderTopLeftRadius: isOwn ? 2 : 0,
                  boxShadow: 1,
                }}
              >
                {!isOwn && (
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    sx={{ mb: 0.5 }}
                  >
                    {msg.profile_username}
                  </Typography>
                )}
                <Typography variant="body2" color="black">
                  {msg.content}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", textAlign: "right", mt: 0.5 }}
                >
                  {dayjs(msg.created_at).format("HH:mm")}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}

export default RealtimeChat;
