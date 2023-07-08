export const getFirstUrlPath = (route: string) => route.match(/^\/[^\/]+/)?.[0]
