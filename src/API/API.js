import axios from 'axios'
import { CoinAPI } from './coin'

export const Api = () => {
  const instance = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/',
  })

  return {
    coin: CoinAPI(instance),
  }
}
