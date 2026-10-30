
export interface FederatedClient {
  id: string;
  organization: string;
  samples: number;
  loss: number | null;
  updateNorm: number | null;
  connection: "Connected" | "Offline";
  training: "Idle" | "Training" | "Completed";
  updateStatus: "Waiting" | "Sent" | "Accepted" | "Rejected";
}
