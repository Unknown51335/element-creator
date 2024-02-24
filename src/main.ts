interface Attributes {
  [qualifiedName: string]: string
}

function isObject(obj: unknown): obj is Record<any, any> {
  return typeof obj === 'object' && obj !== null
}
function isArray(obj: unknown): obj is Array<any> {
  return Array.isArray(obj)
}
function isFunction(obj: unknown): obj is Function {
  return typeof obj === 'function'
}
const NOOP = () => {}

function _createElement(tagName: string, attributes: Attributes = {}, content: Array<any> = []): HTMLElement {
  const element: HTMLElement = document.createElement(tagName)

  Object.keys(attributes).forEach((key) => {
    const value = attributes[key]
    element.setAttribute(key, value)
  })

  for (let item of content) {
    if (item === null || item === undefined) NOOP()
    else if (item instanceof HTMLElement) element.append(item)
    else if (isArray(item)) console.error('element-creator error: array is not supported')
    else if (isObject(item)) console.error('element-creator error: object is not supported')
    else if (isFunction(item)) console.error('element-creator error: function is not supported')
    else {
      item = String(item)
      element.append(item)
    }
  }

  return element
}

export function createElement(tagName: string, attributes: Attributes, content?: any): HTMLElement
export function createElement(tagName: string, content?: any): HTMLElement
export function createElement(tagName: string, attributesOrContent?: any, content?: any): HTMLElement {
  const argumentsLength = arguments.length

  let _content = content

  if (argumentsLength === 1) {
    return _createElement(tagName, {}, [])
  } else if (argumentsLength === 2) {
    if (isArray(attributesOrContent)) return _createElement(tagName, {}, attributesOrContent)
    if (isObject(attributesOrContent)) return _createElement(tagName, attributesOrContent, [])
    return _createElement(tagName, {}, [attributesOrContent])
  } else if (argumentsLength === 3) {
    if (isArray(_content)) {
      return _createElement(tagName, attributesOrContent, _content)
    }
    return _createElement(tagName, attributesOrContent, [_content])
  } else {
    _content = Array.prototype.slice.call(arguments, 2)
    return _createElement(tagName, attributesOrContent, _content)
  }
}
