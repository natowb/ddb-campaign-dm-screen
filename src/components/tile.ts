import { Primitive } from "../primitives";
import { applyStyles, registerStyles, type ComponentOptions } from "../utils";

const styles = `

.tabaxi-tile-header-text {
  display: inline-block;
  text-transform: uppercase;
  font-size: 16px;
  padding: 4px 8px;
  border-bottom: 1px solid var(--color-grey--100);
  background-color: var(--color-grey--100);
  border-radius: 8px;
  color: var(--color-grey--700) !important;
}


.tabaxi-tile {
  margin: 8px 16px;
  padding: 8px 0px;
}



.tabaxi-tile:not(:last-child) {

  border-bottom: 1px solid #dedede;
}
`

export interface TileContainerProps {
  className?: string;
  children?: Element[];
}

const Header = (text: string, options?: ComponentOptions) => {
  const header = document.createElement('h5');
  header.className = "tabaxi-tile-header-text";
  header.textContent = text;
  //if (options?.styles) applyStyles(header, options?.styles);

  return header;
}




const Row = Primitive.Row;


const Column = Primitive.Column;

export interface TileComponentProps {
  title?: string;
  titleAlignment?: string;
  children: Element[];
}

const Container = ({ children }: TileComponentProps) => {
  const el = document.createElement('div');
  el.classList.add('tabaxi-tile');
  el.append(...children);

  return el;
}

export const Tile = {
  Container,
  Header,
  Row,
  Column,
  styles
}


