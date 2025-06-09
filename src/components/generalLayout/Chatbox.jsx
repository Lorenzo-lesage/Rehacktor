import { useContext } from "react";
import supabase from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";
import { Box, TextField, Button } from "@mui/material";
import { showToast } from "../toast/toastHelper";
import RealtimeChat from "./RealtimeChat";

function Chatbox({ data }) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { userProfile } = useContext(SessionContext);

  /*
  |-----------------------------------------------------
  | Methods
  |-----------------------------------------------------
  */

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    if (!userProfile?.id || !data?.id) {
      console.warn("Dati utente o gioco mancanti.");
      showToast("error", "Oops! Something went wrong");
      return;
    }
    const inputMessage = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(inputMessage));
    if (typeof message === "string" && message.trim().length !== 0) {
      const { error } = await supabase
        .from("messages")
        .insert({
          profile_id: userProfile?.id,
          profile_username: userProfile?.username,
          game_id: data.id,
          content: message,
        })
        .select();
      if (error) {
        console.log(error);
      } else {
        inputMessage.reset();
      }
    }
  };

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <Box
      component="form"
      onSubmit={handleMessageSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Fondamentale: serve per il calcolo del flex parent
      }}
    >
      {/* MESSAGGI: Scrollabile */}
      <Box
        sx={{
          flexGrow: 1, // Prende tutto lo spazio disponibile
          overflowY: "auto",
          pr: 1,
        }}
      >
        <RealtimeChat data={data} />
      </Box>

      {/* INPUT + BUTTON: Sempre visibile */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 1,
          pt: 1,
          borderTop: "1px solid #ccc",
        }}
      >
        <TextField
          id="message"
          name="message"
          placeholder="Chat..."
          fullWidth
          multiline
          rows={1}
          size="small"
          sx={{ backgroundColor: "transparent", borderRadius: 1 }}
        />
        <Button
          type="submit"
          variant="text"
          color="primary"
          size="small"
          disabled={!userProfile?.id || !data?.id}
          sx={{ minWidth: "80px", mt: 1 }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default Chatbox;
