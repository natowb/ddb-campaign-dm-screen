export interface Optional<T> {
  data?: T,
  error?: string;
}


export const getCharacterId = (url: string): Optional<string> => {
  if (url.length === 0) {
    return {
      error: "Invalid Url",
    }
  }
  const splitUrl = url.split('/');

  if (splitUrl.length === 0) {
    return {
      error: "Invalid Url",
    }
  }

  const id = splitUrl[splitUrl.length - 1];

  return {
    data: id
  }

}


export async function getData(url: string): Promise<any> {
  let errorMessage = null;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }


    const { data } = await response.json();
    return {
      data: data,
      error: null
    }
  } catch (error: any) {
    errorMessage = error.message;
  }

  return {
    error: errorMessage,
    data: null,
  }
}


export const getValueSymbol = (value: number): string => {
  if (value > 0) return "+";
  return "";
}

export const buildValue = (value: number): string => {
  return `${getValueSymbol(value)}${value}`
}


export const TABAXI_LOG = (...args: any[]) => {
  console.log('[TABAXI] : ', ...args);
}

export const TABAXI_ERR = (...args: any[]) => {
  console.error('[TABAXI] : ', ...args);
}




export const registerStyles = (cssContent: string) => {

  const css = `<style>
${cssContent}
</style>`

  document.head.insertAdjacentHTML("beforeend", css);
}


export const applyStyles = (element: HTMLElement, styles: any) => {

  const entries = Array.from(Object.entries(styles));

  for (let i = 0; i < entries.length; i++) {

    element.style.setProperty(entries[i][0] as string, entries[i][1] as string);
  }
}


export interface ComponentOptions {
  id?: string;
  className?: string;
  styles?: any;
}

export const createComponent = (tag: keyof HTMLElementTagNameMap, options: ComponentOptions) => {
  const el = document.createElement(tag);
  if (options.id) el.id = options.id;
  if (options.className) el.className = options.className;
  if (options.styles) applyStyles(el, options.styles);
  return el;
}
