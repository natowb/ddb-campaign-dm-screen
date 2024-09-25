import { div, h4, h5, p } from "docrel";




interface ComponentProps {
    id?: string;
}

interface InfoBoxProps extends ComponentProps {
    value: string;
    title: string;
}


const InfoBox = ({ id, value, title }: InfoBoxProps) => {
    return div({
        id: id,
        class: "tabaxi-column",
    }, [
        h4({ class: "tabaxi-infobox-value", textContent: value }),
        p({ textContent: title, class: 'tabaxi-content-title' }),
    ]);
}


const Column = (...children: Element[]) => {
    return div({
        class: "tabaxi-column",
    }, [
        ...children
    ]);
}
const Row = (...children: Element[]) => {
    return div({
        class: "tabaxi-row",
    }, [
        ...children
    ]);
}

const Header = (title: string) => {
    return div({ class: 'tabaxi-content-header' }, [
        h5({ textContent: title, class: 'tabaxi-content-header-text' })
    ])
}


const Text = (title: string) => {
    return p({ textContent: title, class: 'tabaxi-content-text-title' })
}



const Content = (id: string, ...children: Element[]) => {
    return div({
        id: id,
        class: "tabaxi-card-content",
    }, [
        ...children
    ]);
}

const Loader = () => {
    return div({ class: 'tabaxi-loader' })
}


export const Component = {
    Content,
    Header,
    Text,
    Row,
    Column,
    InfoBox,
    Loader
}