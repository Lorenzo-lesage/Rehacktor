import { useContext } from "react";
import supabase from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";
import { Box, TextField, Typography, Button } from "@mui/material";
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
    <>
    <RealtimeChat data={data} />
      <Typography>Chat</Typography>
      <Box></Box>
      <Box>
        <Box component="form" onSubmit={handleMessageSubmit}>
          <TextField
            id="message"
            name="message"
            label="Message"
            placeholder="Chat..."
            fullWidth
            multiline
            rows={4}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            disabled={!userProfile?.id || !data?.id}
          >
            Send
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Chatbox;
