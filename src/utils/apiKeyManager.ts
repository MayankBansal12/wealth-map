export class ApiKeyManager {
  private rapidApiKeys: string[]
  private attomApiKeys: string[]
  private currentRapidIndex: number = 0
  private currentAttomIndex: number = 0

  constructor(rapidApiKeys: string[], attomApiKeys: string[]) {
    this.rapidApiKeys = rapidApiKeys
    this.attomApiKeys = attomApiKeys
  }

  getRandomRapidApiKey(): string {
    const randomIndex = Math.floor(Math.random() * this.rapidApiKeys.length)
    return this.rapidApiKeys[randomIndex]
  }

  getRandomAttomApiKey(): string {
    const randomIndex = Math.floor(Math.random() * this.attomApiKeys.length)
    return this.attomApiKeys[randomIndex]
  }

  getNextRapidApiKey(): string {
    const key = this.rapidApiKeys[this.currentRapidIndex]
    this.currentRapidIndex = (this.currentRapidIndex + 1) % this.rapidApiKeys.length
    return key
  }

  getNextAttomApiKey(): string {
    const key = this.attomApiKeys[this.currentAttomIndex]
    this.currentAttomIndex = (this.currentAttomIndex + 1) % this.attomApiKeys.length
    return key
  }
}

const apiKeyManager = new ApiKeyManager(
  [
    import.meta.env.VITE_RAPID_API_KEY,
    import.meta.env.VITE_RAPID_API_KEY_2,
    import.meta.env.VITE_RAPID_API_KEY_3,
  ].filter(Boolean),
  [
    import.meta.env.VITE_ATTOM_API_KEY,
    import.meta.env.VITE_ATTOM_API_KEY_2,
    import.meta.env.VITE_ATTOM_API_KEY_3,
  ].filter(Boolean)
)

export default apiKeyManager
