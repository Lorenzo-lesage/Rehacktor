import supabase from "./supabase-client";

let messageChannel = null;

export function getMessageChannel(gameId, onMessage) {
  if (messageChannel) {
    return messageChannel;
  }

  messageChannel = supabase
    .channel("messages")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `game_id=eq.${gameId}`,
      },
      (payload) => {
        onMessage(payload.new);
      }
    )
    .subscribe();

  return messageChannel;
}

export function removeMessageChannel() {
  if (messageChannel) {
    supabase.removeChannel(messageChannel);
    messageChannel = null;
  }
}
