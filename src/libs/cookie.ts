import Cookies from 'js-cookie'

const COOKIES = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  ADDRESS: 'address',
}

const setCookie = (key: string, value: string, options?: Cookies.CookieAttributes) => {
  Cookies.set(key, value, options)
}

const getCookie = (key: string) => {
  return Cookies.get(key)
}

const removeCookie = (key: string) => {
  Cookies.remove(key)
}

export { COOKIES, getCookie, removeCookie, setCookie }
