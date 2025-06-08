import { useEffect, useState, useRef, useCallback } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import supabase from "../../supabase/supabase-client";
import { Box, Typography, CircularProgress, Paper, Stack } from "@mui/material";

dayjs.extend(relativeTime);

export default function RealtimeChat({ data }) {
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
      .eq("game_id", data.id) // filtro per gioco
      .order("id", { ascending: true });

    if (error) {
      setError(error.message);
      return;
    }

    setMessages(messages);
    setLoadingInitial(false);
  }, [ data.id ]);

  useEffect(() => {
    if (data) getInitialMessages();

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => getInitialMessages()
      )
      .subscribe();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
        channel.unsubscribe();
      }
    };
  }, [data, getInitialMessages]);

  useEffect(() => {
    scrollSmoothToBottom();
  }, [messages]);

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 1,
        p: 1,
        width: "100%",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#1b212b",
        overflowY: "auto",
      }}
      ref={messageRef}
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
        <Stack spacing={2}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                p: 1,
                bgcolor: "grey.800",
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle2" color="primary">
                {msg.profile_username}
              </Typography>
              <Typography variant="body2" color="white">
                {msg.content}
              </Typography>
              <Typography variant="caption" color="gray">
                {dayjs(msg.created_at).fromNow()}
              </Typography>
            </Box>
          ))}
        </Stack>
      )}
    </Paper>
  );
}
