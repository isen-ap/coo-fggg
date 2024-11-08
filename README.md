# COO D&D

Clément Gambier
Tristan Fumière
Gabriel Gressier
Alexandre Gine

## 1er rendu

- Diagramme de use case
- Diagramme de classe
- Diagramme de séquence

## 2ème rendu

- GET information création personnage
- CREATE personnage

Récupérer les données de l'API

- alignments
  Les organiser

### Routes disponibles

- GET /character
- POST /character
  Exemple de body pour POST /character

```json
{
  "name": "Bilbon",
  "picture": "https://i0.wp.com/lehobbitblog.wordpress.com/wp-content/uploads/2016/01/bilbon-sacquet.png?w=383&h=639&ssl=1",
  "class": {
    "id": "barbarian",
    "skillToChoose": ["skill-acrobatics", "skill-animal-handling"]
  },
  "alignment": "Lawful Good",
  "specie": {
    "id": "",
    "languagesToChoose": ["dwarvish"],
    "proficienciesToChoose": [1, 2],
    "subSpecies": [
      {
        "id": "hill-dwarf"
      }
    ]
  }
}
```
