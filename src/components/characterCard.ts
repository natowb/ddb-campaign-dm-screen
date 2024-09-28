import type { DndCharacter } from "@natowb/ddb-parser";
import { Primitive } from "../primitives";
import { buildValue, createComponent, getValueSymbol } from "../utils";
import { type TabsProps, Tabs } from "./tabs";
import { Tile } from "./tile";
import { Text } from '../primitives/text'
import { InfoBox } from "./infobox";



export const CharacterCard = (character: DndCharacter) => {
  const currentHP = character.health.current;
  const maxHP = character.health.max;
  const ac = character.ac;
  const initiative = character.initiativeBonus;
  const passives = character.passiveScores;
  const walk = character.walkSpeed;
  const saveDc = character.casting.dc;
  const savingThrows = character.savingThrows;
  const darkvision = character.senses.darkvision;


  const senses = [
    Tile.Header(
      "Senses",
      {
        styles: {
          "text-align": "center"
        }
      }),
    Tile.Row(
      InfoBox.Element({ value: passives.perception, title: 'Perception' }),
      InfoBox.Element({ value: passives.investigation, title: 'Investigation' }),
      InfoBox.Element({ value: passives.insight, title: 'Insight' }),
    ),
  ]

  if (darkvision > 0) {
    senses.push(
      Tile.Row(
        Text.Desc(`Darkvision ${darkvision}ft`)
      )
    )
  }

  const card = createComponent('div', {});
  card.append(
    Tile.Container({
      children: [
        Tile.Row(
          InfoBox.Element({ value: `${buildValue(initiative)}`, title: 'Initiative', prefix: getValueSymbol(initiative) }),
          InfoBox.Element({ value: `${ac}`, title: 'Armor Class' }),
          InfoBox.Element({
            value: `${currentHP}/${maxHP}`, title: 'Hit Points'
          })
        ),

      ]
    }),
    Tile.Container({
      children: [
        Tile.Row(
          InfoBox.Element({ value: `${walk}`, title: 'Speed', suffix: 'ft' }),

          InfoBox.Element({ value: `${isNaN(saveDc) ? "N/A" : saveDc}`, title: 'Save DC' }),
        ),

      ]
    }),
    Tile.Container({
      children: [
        Tile.Header(
          "Saving Throws",
          {
            styles: {
              "text-align": "center"
            }
          }),
        Tile.Row(
          InfoBox.Element({ value: buildValue(savingThrows.str), title: 'STR', prefix: getValueSymbol(savingThrows.str) }),
          InfoBox.Element({ value: buildValue(savingThrows.dex), title: 'DEX', prefix: getValueSymbol(savingThrows.dex) }),
          InfoBox.Element({ value: buildValue(savingThrows.con), title: 'CON', prefix: getValueSymbol(savingThrows.con) }),
          InfoBox.Element({ value: buildValue(savingThrows.int), title: 'INT', prefix: getValueSymbol(savingThrows.int) }),
          InfoBox.Element({ value: buildValue(savingThrows.wis), title: 'WIS', prefix: getValueSymbol(savingThrows.wis) }),
          InfoBox.Element({ value: buildValue(savingThrows.cha), title: 'CHA', prefix: getValueSymbol(savingThrows.cha) })
        ),
      ]
    }),
    Tile.Container({
      children: [
        ...senses,
      ]
    }),

  )


  return card;

  const tabsProps: TabsProps = {
    id: `player-tabs-${character.id}`,
    tabs: [
      {
        id: `player-overview-${character.id}`,
        name: `player-tabs-${character.id}`,
        checked: true,
        text: "Core"
      },
      {
        id: `player-profs-${character.id}`,
        name: `player-tabs-${character.id}`,
        checked: false,
        text: "Proficiencies"
      },
    ],
    panels: [
      {
        id: `player-overview-${character.id}`,
        children: [
          Tile.Container({
            children: [
              Tile.Row(
                InfoBox.Element({ value: getValueSymbol(initiative), title: 'Initiative' }),
                InfoBox.Element({ value: `${ac}`, title: 'Armor Class' }),
                InfoBox.Element({
                  value: `${currentHP}/${maxHP}`, title: 'Hit Points'
                })
              ),

            ]
          }),
          Tile.Container({
            children: [
              Tile.Row(
                InfoBox.Element({ value: `${walk}ft`, title: 'Speed' }),

                InfoBox.Element({ value: `${isNaN(saveDc) ? "N/A" : saveDc}`, title: 'Save DC' }),
              ),

            ]
          }),
          Tile.Container({
            title: "Saving Throws",
            titleAlignment: "center",
            children: [
              Tile.Row(
                InfoBox.Element({ value: getValueSymbol(savingThrows.str), title: 'STR' }),
                InfoBox.Element({ value: getValueSymbol(savingThrows.dex), title: 'DEX' }),
                InfoBox.Element({ value: getValueSymbol(savingThrows.con), title: 'CON' }),
                InfoBox.Element({ value: getValueSymbol(savingThrows.int), title: 'INT' }),
                InfoBox.Element({ value: getValueSymbol(savingThrows.wis), title: 'WIS' }),
                InfoBox.Element({ value: getValueSymbol(savingThrows.cha), title: 'CHA' })
              ),
            ]
          }),
          Tile.Container({
            title: "Senses",
            titleAlignment: "center",
            children: [
              Tile.Row(
                InfoBox.Element({ value: getValueSymbol(passives.perception), title: 'Perception' }),
                InfoBox.Element({ value: getValueSymbol(passives.investigation), title: 'Investigation' }),
                InfoBox.Element({ value: getValueSymbol(passives.insight), title: 'Insight' }),
              ),
            ]
          }),
        ]
      },
      {
        id: `player-profs-${character.id}`,
        children: [
          Tile.Container({
            title: "Armor",
            titleAlignment: "left",
            children: [
              Tile.Row(
                Text.Label('Coming Soon...')
              ),
            ]
          }),
          Tile.Container({
            title: "Weapons",
            titleAlignment: "left",
            children: [
              Tile.Row(
                Text.Label('Coming Soon...')
              ),
            ]
          }),
          Tile.Container({
            title: "Tools",
            titleAlignment: "left",
            children: [
              Tile.Row(
                Text.Label('Coming Soon...')
              ),
            ]
          }),
          Tile.Container({
            title: "Language",
            titleAlignment: "left",
            children: [
              Tile.Row(
                Text.Label('Coming Soon...')
              ),
            ]
          }),

        ]
      },
    ]
  }

  return Tabs(tabsProps);



}
