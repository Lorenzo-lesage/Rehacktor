import { useContext } from "react";
import supabase from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";
import { Box, TextField, Button, Typography } from "@mui/material";
import { showToast } from "../../utils/snackbarUtils";
import RealtimeChat from "./RealtimeChat";
import { useNavigate } from "react-router";

function Chatbox({ data }) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { userProfile } = useContext(SessionContext);
  const navigate = useNavigate();

  /*
  |-----------------------------------------------------
  | Methods
  |-----------------------------------------------------
  */

  /**
   * Method to handle the message submit
   * @param {*} event
   * @returns
   */
  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    if (!userProfile?.id || !data?.id) {
      console.warn("Data not available.");
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
        height: "100%",
      }}
    >
      {/* MESSAGGI: Scrollabile */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          pr: 1,
        }}
      >
        <RealtimeChat data={data} />
      </Box>

      {userProfile?.id ? (
        <>
          {/* INPUT + BUTTON */}
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
        </>
      ) : (
        <Box sx={{ mt: 1, textAlign: "center" }}>
          <Button
            onClick={() => navigate("/login")}
            size="small"
            variant="text"
            color="primary"
          >
            Login to chat
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Chatbox;
