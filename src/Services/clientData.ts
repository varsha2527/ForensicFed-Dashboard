
import { getFederatedClients } from "./clientService";
import type { FederatedClient } from "./types";

export type ClientDataResult = {
  clients: FederatedClient[];
  source: "api";
};

export async function loadFederatedClients(): Promise<ClientDataResult> {
  const clients = await getFederatedClients();

  return {
    clients,
    source: "api",
  };
}
