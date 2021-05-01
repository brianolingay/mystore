export interface AlertState {
  title: string;
  status?: "error" | "info" | "warning" | "success" | undefined;
}
