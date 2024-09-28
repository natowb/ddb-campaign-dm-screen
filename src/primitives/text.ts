import { createComponent } from "../utils";
const styles = `
.tabaxi-primitive-text {
    text-transform: uppercase; 
    font-size: 16px;
    margin: 0;
    padding: 0;
    border-bottom: none;
  color: var(--color-grey--700) !important;
}

.tabaxi-primitive-desc {
    font-size: 16px;
    margin: 0;
    padding: 0;
    border-bottom: none;
    color: var(--color-grey--700) !important;
}
`;

const Label = (title: string) => {

  const el = createComponent("label", { className: "tabaxi-primitive-text" });
  el.textContent = title;
  return el;
}

const Desc = (title: string) => {

  const el = createComponent("label", { className: "tabaxi-primitive-desc" });
  el.textContent = title;
  return el;
}


export const Text = {
  Label,
  Desc,
  styles,
}

