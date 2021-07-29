
export function mapAll (data: unknown) {
  if (data && typeof data === 'object') {
    const entries = Object.entries(data).filter(([, value]) => !!value)

    const newData = {}

    for (const [key, value] of entries) {
      Object.assign(newData, {
        [key]: value,
      })
    }

    return newData
  }

  return data
}
