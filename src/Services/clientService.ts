
import { apiRequest } from "./api";
import type { FederatedClient } from "./types";

/**
 * Fetch federated clients from the backend.
 * The endpoint is provisional until we confirm
 * the actual backend API routes.
 */
export function getFederatedClients(): Promise<FederatedClient[]> {
  return apiRequest<FederatedClient[]>("/api/clients");
}
