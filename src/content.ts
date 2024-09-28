import Sortable from 'sortablejs';
import { DndCharacter } from "@natowb/ddb-parser";
import { getData, TABAXI_ERR } from "./utils";
import { Primitive } from "./primitives";
import { CharacterCard } from './components/characterCard';
import { Loader } from './primitives/loader';
import { Tile } from './components/tile';
import { InfoBox } from './components/infobox';
import { Text } from './primitives/text';
const CARD_CLASS = 'ddb-campaigns-character-card';
const CARD_VIEW_LINK = 'ddb-campaigns-character-card-footer-links-item-view';
const CHARACTER_SERVICE_URL = 'https://character-service.dndbeyond.com/character/v5/character';


const css = `<style>
${Loader.styles}
${Tile.styles}
${InfoBox.styles}
${Primitive.styles}
${Text.styles}

.sortable-ghost {
background-color: var(--color-grey--300); 
}

</style>`;


document.head.insertAdjacentHTML("beforeend", css);

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
    card.insertBefore(
      Primitive.Content(
        `${cardId}-content`,
        Primitive.Row(
          Loader.Element(),
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

const displayError = (id: string) => {

  const content = getContentById(id);

  // FIXME: probs handle this 
  if (!content) {
    return;
  }

  content.replaceChildren(
    Tile.Container(
      {
        children: [

          Tile.Header("Oops, ran into problem :(",
            {
              styles: {
                "text-align": "center",
              }
            }),
          Tile.Row(
            Text.Label('Make sure the visibility is set to PUBLIC on the character sheet'),
          )
        ]
      }
    )
  )

}

const populateCardContent = async (characterIds: string[]) => {
  for (let i = 0; i < characterIds.length; i++) {
    const characterId = characterIds[i];

    const { data, error }: { data: any, error: string }
      = await getData(`${CHARACTER_SERVICE_URL}/${characterId}`);

    if (error) {
      displayError(characterId);
      TABAXI_ERR(`failed to retrieve character data for id ${characterId}`);
      continue;

    }
    const wrapper = getContentById(characterId);
    if (!wrapper) {
      return;
    }

    wrapper.replaceChildren(
      CharacterCard(new DndCharacter(data))
    );
  }
}




const setupRefresh = () => {
  return setInterval(() => {
    const ids = getCharacterIds();
    populateCardContent(ids);

  }, 30 * 1000)
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
