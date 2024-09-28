export const cssTabs = `
.tabset > input[type="radio"] {
  position: absolute;
  left: -200vw;
}

.tabset .tab-panel {
  display: none;
}

.tabset > input:first-child:checked ~ .tab-panels > .tab-panel:first-child,
.tabset > input:nth-child(3):checked ~ .tab-panels > .tab-panel:nth-child(2),
.tabset > input:nth-child(5):checked ~ .tab-panels > .tab-panel:nth-child(3),
.tabset > input:nth-child(7):checked ~ .tab-panels > .tab-panel:nth-child(4),
.tabset > input:nth-child(9):checked ~ .tab-panels > .tab-panel:nth-child(5),
.tabset > input:nth-child(11):checked ~ .tab-panels > .tab-panel:nth-child(6) {
  display: block;
}

/*
 Styling
*/

.tabset > label:nth-child(2) {
  border-left: 0;
}

.tabset > label {
  position: relative;
  display: inline-block;
  padding: 15px 15px;
  border: 1px solid transparent;

  border-bottom: 0;
  cursor: pointer;
  font-weight: 600;
}
input:focus-visible + label {
  outline: 2px solid rgba(0,102,204,1);
  border-radius: 3px;
}

.tabset > label:hover,
.tabset > input:focus + label,
.tabset > input:checked + label {
  color: #1b9af0;
}


.tabset > label {
  margin-bottom: 0;
}

.tabset > input:checked + label {
  border-color: #ccc;
  border-bottom: 1px solid #fff;
  margin-bottom: -1px;
}

.tab-panel {
  border-top: 1px solid #ccc;
  padding: 8px 8px;

}

`;


export interface TabProps {
  name: string;
  id: string;
  text: string;
  checked?: boolean;
}


export const Tab = ({ id, name, text, checked }: TabProps) => {
  const inputEl = document.createElement('input');
  inputEl.type = "radio";
  inputEl.name = name;
  inputEl.id = id;
  inputEl.setAttribute('aria-controls', id);
  inputEl.checked = checked ?? false;

  const labelEl = document.createElement('label');
  labelEl.setAttribute('for', id);
  labelEl.textContent = text;


  return [inputEl, labelEl];
}



export interface TabPanelProps {
  id: string;
  children: Element[]
}
export const TabPanel = ({ id, children }: TabPanelProps) => {
  const sectionEl = document.createElement('section');
  sectionEl.classList.add('tab-panel');
  sectionEl.id = id;
  sectionEl.append(...children);

  return sectionEl;
}

export interface TabsProps {
  id: string;
  tabs: TabProps[],
  panels: TabPanelProps[],
}

export const Tabs = ({ id, tabs, panels }: TabsProps) => {

  if (tabs.length === 0) {
    throw Error('Must have at least one Tab')
  }

  if (panels.length !== tabs.length) {
    throw Error('panel and tabs must be same length')
  }



  const tabsetEl = document.createElement('div');
  tabsetEl.classList.add('tabset');
  tabsetEl.id = id;
  for (let i = 0; i < tabs.length; i++) {
    const tab = tabs[i];
    tabsetEl.append(...Tab(tab));
  }


  const panelContainerEl = document.createElement('div');
  panelContainerEl.classList.add('tab-panels');

  tabsetEl.appendChild(panelContainerEl);

  for (let i = 0; i < panels.length; i++) {
    const panel = panels[i];
    panelContainerEl.appendChild(TabPanel(panel));
  }
  return tabsetEl;
}


