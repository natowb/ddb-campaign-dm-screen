
import { div, h4, h5, p } from "docrel";
import { createComponent, type ComponentOptions } from "../utils";

interface InfoBoxProps extends ComponentOptions {
  value: string | number;
  title: string;
  prefix?: string;
  suffix?: string;
}

const styles = `
.tabaxi-infobox-label {
    text-transform: uppercase;
    font-weight: bold;
color: var(--color-grey--600) !important;

}

.tabaxi-infobox-value { 
  font-size: 24px !important;
  color: var(--color-grey--700) !important;
}


`

const Element = ({ id, value, title, prefix, suffix }: InfoBoxProps) => {

  const valueEl = createComponent('h4', {
    className: 'tabaxi-infobox-value'
  });

  if (prefix) valueEl.setAttribute('data-prefix', prefix);
  if (suffix) valueEl.setAttribute('data-suffix', suffix);

  valueEl.textContent = String(value);



  return div({
    id: id,
    class: "tabaxi-column",
  }, [
    valueEl,
    p({ textContent: title, class: 'tabaxi-infobox-label' }),
  ]);
}


export const InfoBox = {
  Element,
  styles
}
