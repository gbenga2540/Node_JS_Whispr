export interface CreateChatRequest {
  sender_id: string; // basically the firstId, doesn't matter if it is sender or receiver
  receiver_id: string;
}
