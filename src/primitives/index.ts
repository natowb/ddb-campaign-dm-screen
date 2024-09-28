import { createComponent } from "../utils";


let styles = `
.tabaxi-card {
 display: flex;
 flex-direction: column;
  color: var(--color-grey--600);
}


.tabaxi-row {
    display: flex;
    justify-content: space-around;
    padding: 16px 0;
    text-align: center;
    flex-wrap: wrap;
  
}

.tabaxi-column {
    display: flex;
    flex-direction: column;
}
`

const Content = (id: string, ...children: Element[]) => {

  const el = createComponent('div', {
    id: id,
    className: 'tabaxi-card'
  });

  el.append(...children);

  return el;

}

const Column = (...children: Element[]) => {


  const el = createComponent('div', {
    className: 'tabaxi-column'
  });

  el.append(...children);

  return el;

}
const Row = (...children: Element[]) => {

  const el = createComponent('div', {
    className: 'tabaxi-row'
  });

  el.append(...children);

  return el;

}





export const Primitive = {
  Content,
  Row,
  Column,
  styles
}
