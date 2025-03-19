class MyCookie {
  expires = 'Tue, 01 Jan 2030 00:00:00 GMT'

  setExpiresDate = (date: number) => {
    const time = (new Date()).getTime()
    this.expires = (new Date(time + date * 86400000)).toUTCString()
  }

  getArray = () => {
    return document.cookie.split(';')
  }

  getParam = (cookie: string) => {
    const param = cookie.split('=')
    const pattern = '^\\s+'
    param[0] = param[0].replace(new RegExp(pattern), '')
    return param
  }

  getNum = () => {
    if (document.cookie.length === 0) {
      return 0
    }
    return this.getArray().length
  }

  getKey = (index: number) => {
    if (document.cookie.length === 0) {
      return ''
    }
    const cookie = this.getArray()
    if (index >= cookie.length) {
      return ''
    }
    const param = this.getParam(cookie[index])
    return param[0]
  }

  getValue = (key: string, defValue: string) => {
    const cookie = this.getArray()
    for (let i = 0; i < cookie.length; i++) {
      const param = this.getParam(cookie[i])
      if (param[0] === key) {
        const value = decodeURI(param[1])
        console.log('cookie getValue ' + key + ' ' + value)
        return value
      }
    }
    console.log('cookie getDefValue ' + key + ' ' + defValue)
    return defValue
  }

  getNumber = (key: string, defValue: number) => {
    return Number(this.getValue(key, String(defValue)))
  }

  getBool = (key: string, defValue: boolean) => {
    return Number(this.getValue(key, defValue ? '1' : '0')) !== 0
  }

  setValue = (key: string, value: string) => {
    console.log('cookie setValue ' + key + ' ' + value)
    if (value == null) {
      value = ''
    }
    let expires = this.expires
    if (value.length === 0) {
      const date = new Date()
      date.setTime(0)
      expires = date.toUTCString()
    }
    document.cookie = key + '=' + encodeURI(value) + '; expires=' + expires
  }

  setNumber = (key: string, value: number) => {
    this.setValue(key, String(value))
  }

  setBool = (key: string, value: boolean) => {
    this.setValue(key, value ? '1' : '0')
  }
}

export default MyCookie
