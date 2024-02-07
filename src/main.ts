interface Attributes {
  [qualifiedName: string]: string
}

export function createElement(
  tagName: string,
  attributes: Attributes = {},
  content: string | number | boolean | HTMLElement | HTMLElement[],
): HTMLElement {
  const element: HTMLElement = document.createElement(tagName)

  Object.keys(attributes).forEach((key) => {
    const value = attributes[key]
    element.setAttribute(key, value)
  })

  switch (typeof content) {
    case 'string':
      element.textContent = content
      break
    case 'number':
    case 'boolean':
    case 'bigint':
      element.textContent = content.toString()
      break
    case 'object':
      if (content instanceof HTMLElement) {
        element.append(content)
      } else if (Array.isArray(content)) {
        content.forEach((item) => element.append(item))
      }
      break
  }

  return element
}
