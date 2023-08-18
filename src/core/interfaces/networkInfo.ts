export interface INetworkInfo {
  isConnected(): Promise<boolean | null>
}
