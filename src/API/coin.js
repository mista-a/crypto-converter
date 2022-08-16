export const CoinAPI = (instance) => ({
  async getCoin(id) {
    const { data } = await instance.get(`coins/${id}`)
    return data
  },
  async getCoins() {
    const { data } = await instance.get(`coins/list`)
    return data
  },
  async getMarketCoins() {
    const { data } = await instance.get(`coins/markets`)
    return data
  },
  async search(query) {
    const { data } = await instance.get(`search?query=${query}`)
    return data.coins
  },
})
