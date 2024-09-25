import Sortable from 'sortablejs';
import * as parser from "@natowb/ddb-parser";
import { buildValue, getData, TABAXI_ERR, TABAXI_LOG } from "./utils";
import { Component } from "./components";
import { TABAXI_CSS } from "./css";
import { createElement } from "docrel";

const CARD_CLASS = 'ddb-campaigns-character-card';
const CARD_FOOTER_CLASS = 'ddb-campaigns-character-card-footer';
const CARD_VIEW_LINK = 'ddb-campaigns-character-card-footer-links-item-view';
const CHARACTER_SERVICE_URL = 'https://character-service.dndbeyond.com/character/v5/character';


const css = `<style>
.tabaxi-card-content {
 display: flex;
 flex-direction: column;
  color: var(--color-grey--600);
}

.tabaxi-content-title {
    text-transform: uppercase;
    font-weight: bold;
}

.tabaxi-infobox-value { 
  color: var(--color-grey--800) !important;
}

.tabaxi-content-header-text {
    text-transform: uppercase;
    text-align-center;
    font-size: 16px;
    margin: 0;
    padding: 0;
    border-bottom: none;
  color: var(--color-grey--800) !important;
}

.tabaxi-row:not(:last-child) {
  border-bottom: 1px solid #dedede
}


.tabaxi-row,
.tabaxi-content-header {
    display: flex;
    justify-content: space-around;
    text-align: center;
    flex-wrap: wrap;
    padding: 8px 0;

}

.tabaxi-column {
    display: flex;
    flex-direction: column;
}

.tabaxi-handle {
width: 100%;
height: 16px;
background-color: var(--common-500);
}

span.grippy {
  content: '....';
  width: 10px;
  height: 20px;
  display: inline-block;
  overflow: hidden;
  line-height: 5px;
  padding: 3px 4px;
  cursor: move;
  vertical-align: middle;
  margin-top: -.7em;
  margin-right: .3em;
  font-size: 12px;
  font-family: sans-serif;
  letter-spacing: 2px;
  color: #cccccc;
  text-shadow: 1px 0 1px black;
}
span.grippy::after {
  content: '.. .. .. ..';
}

.sortable-ghost {
background-color: red !important;
}

</style>`;


document.head.insertAdjacentHTML("beforeend", css);


/**
 * This will fetch the data of character with matching id
 */


const populateCardWrapper = (character: parser.CharacterData) => {

  const currentHP = parser.getCurrentHP(character);
  const maxHP = parser.getMaxHP(character);
  const ac = parser.getArmorClassBonus(character);
  const initiative = parser.getInitiativeBonus(character);


  const per = parser.getPassiveScore(character, "perception");
  const ins = parser.getPassiveScore(character, "insight");
  const inv = parser.getPassiveScore(character, "investigation");


  const { walk } = parser.getSpeeds(character);

  const saveDc = parser.getSaveDC(character);

  const savingThrows = parser.getSavingThrows(character);

  const wrapper = getContentById(character.id);
  if (!wrapper) {
    return;
  }

  wrapper.replaceChildren(
    Component.Row(
      Component.InfoBox({ value: buildValue(initiative), title: 'Initiative' }),
      Component.InfoBox({ value: `${ac}`, title: 'Armor Class' }),
      Component.InfoBox({ value: `${currentHP}/${maxHP}`, title: 'Hit Points' })
    ),
    Component.Row(
      Component.InfoBox({ value: `${walk}ft`, title: 'Speed' }),

      Component.InfoBox({ value: `${isNaN(saveDc) ? "N/A" : saveDc}`, title: 'Save DC' }),
    ),
    Component.Header('Saving Throws'),
    Component.Row(
      Component.InfoBox({ value: buildValue(savingThrows.str), title: 'STR' }),
      Component.InfoBox({ value: buildValue(savingThrows.dex), title: 'DEX' }),
      Component.InfoBox({ value: buildValue(savingThrows.con), title: 'CON' }),
      Component.InfoBox({ value: buildValue(savingThrows.int), title: 'INT' }),
      Component.InfoBox({ value: buildValue(savingThrows.wis), title: 'WIS' }),
      Component.InfoBox({ value: buildValue(savingThrows.cha), title: 'CHA' })
    ),
    Component.Header('Passive Skills'),
    Component.Row(
      Component.InfoBox({ value: buildValue(per), title: 'Perception' }),
      Component.InfoBox({ value: buildValue(inv), title: 'Investigation' }),
      Component.InfoBox({ value: buildValue(ins), title: 'Insight' }),
    )
  );
}

const displayError = (id: string) => {

  const wrapper = getContentById(id);

  // FIXME: probs handle this 
  if (!wrapper) {
    return;
  }

  wrapper.replaceChildren(
    Component.Row(
      Component.Header("Oops, ran into problem :("),
      Component.Text('Make sure the visibility is set to PUBLIC on the character sheet'),
    )
  );
}



const getCharacterId = (card: Element) => {
  const linkAnchors = card.getElementsByClassName(CARD_VIEW_LINK);
  if (linkAnchors.length === 0) {
    return null;
  }

  const linkSplit = linkAnchors[0]!.getAttribute('href')!.split('/');
  const id = linkSplit[linkSplit.length - 1];

  return id;
}


const getAllCards = () => {
  const cards = document.getElementsByClassName(CARD_CLASS);
  return cards;
}

const bootstrapCards = async (): Promise<boolean> => {
  const cards = document.getElementsByClassName(CARD_CLASS);
  const characterListing = document.getElementsByClassName('rpgcharacter-listing')[0] as HTMLElement;

  // make the cards sortable

  Sortable.create(characterListing);


  if (!characterListing) {
    return false;
  }

  if (cards.length === 0) {
    return false;
  }



  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const cardId = getCharacterId(card);
    const wrapper = card.parentElement;
    if (!wrapper || !cardId) {
      continue;
    }
    wrapper.id = `${cardId}-wrapper`;
    card.id = `${cardId}-card`;

    const handle = createElement('div', { class: 'tabaxi-handle' }, [
      createElement('span', { class: 'grippy' })
    ])
    const header = card.getElementsByClassName('ddb-campaigns-character-card-header')[0];
    header.insertBefore(handle, header.firstChild);

    card.insertBefore(
      Component.Content(
        `${cardId}-content`,
        Component.Row(
          Component.Loader(),
        )
      ),
      card.lastElementChild,
    );

  }
  return true;
}

const getContentById = (id: string) => {
  return document.getElementById(`${id}-content`);
}


const getCharacterIds = () => {
  const cards = getAllCards();
  const arr: string[] = [];
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const cardId = getCharacterId(card);
    if (!cardId) {
      continue;
    }
    arr.push(cardId);
  }

  return arr;
}



const populateCardContent = async (characterIds: string[]) => {
  for (let i = 0; i < characterIds.length; i++) {
    const characterId = characterIds[i];

    const { data, error }: { data: parser.CharacterData, error: string }
      = await getData(`${CHARACTER_SERVICE_URL}/${characterId}`);

    if (error) {
      displayError(characterId);
      TABAXI_ERR(`failed to retrieve character data for id ${characterId}`);
      continue;
    }

    populateCardWrapper(data);

  }
}




const setupRefresh = () => {
  return setInterval(() => {
    const ids = getCharacterIds();
    populateCardContent(ids);

  }, 5000)
}






const main = async () => {
  const didBootstrap = await bootstrapCards();
  if (!didBootstrap) {
    return;
  }
  const charactersIds = getCharacterIds();
  await populateCardContent(charactersIds);


  // TODO: use setupRefresh with seconds set in a settings panel
}

main();
