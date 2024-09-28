import { createComponent } from "../utils";

const Element = () => {
  const loaderEl = createComponent('div', {
    className: "tabaxi-loader",
  });
  return loaderEl;
}



const styles = `
.tabaxi-loader {
  padding: 15px;
  border: 6px solid var(--color-grey--300);
  border-right-color: var(--color-grey--500);
  border-radius: 22px;
  -webkit-animation: rotate 1s infinite linear;
}

@-webkit-keyframes rotate {
  /* 100% keyframe for  clockwise. 
     use 0% instead for anticlockwise */
  100% {
    -webkit-transform: rotate(360deg);
  }
}
`

export const Loader = {
  Element,
  styles,
}
