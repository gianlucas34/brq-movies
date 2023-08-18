import NetInfo from '@react-native-community/netinfo'
import { INetworkInfo } from '../interfaces/networkInfo'

export class NetworkInfo implements INetworkInfo {
  async isConnected(): Promise<boolean | null> {
    return (await NetInfo.fetch()).isConnected
  }
}
