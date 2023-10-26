declare module '*.lit.scss' {
    import {CSSResult} from 'lit'
    const css: CSSResult
    export default css
}

declare module '*.svg' {
  import {TemplateResult} from 'lit'
  const svg: TemplateResult
  export default svg
}
