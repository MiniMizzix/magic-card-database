CardDatabase = class {
  constructor () {
    this.CardStats = {
      "cardname": "shivan dragon",
  "CMC": "6",
  "colour": "red",
  "red": "2",
  "generic": "4",
  "supertype": null,
  "type": "creature",
  "subtype": "dragon",
  "power": 5,
  "toughness": 5,
  "rarity": "rare",
  "originalset": "alpha",
  "tags": [
    "flying, firebreathing"
  ],
  "image": "http://www.artofmtg.com/wp-content/uploads/2014/06/Shivan-Dragon-7th-Edition-Onward.jpg",
  "manacost": [
    {
      "type": "red",
      "qty": 2
    },
    {
      "type": "generic",
      "qty": 4
    }
  ],
  "rating": 3
}
    this.TypeList = {
      "type":["artifact","creature","enchantment","land","instant","scorcery","planeswalker"
      ]}
    
    this.SuperTypeList = {
       "supertype": ["legendary","snow","artifact","tribal","enchantment","basic","world"]
    }
    this.SubTypeList = {
      "subtype":["shrine","vehicle","aura","saga","clue","equipment","food","gold","treasure","cartouche","curse","rune","shard","plains","island","swamp","mountain","forest","wastes","desert","adventure","arcane","lesson","trap","dragon","wizard","bird"]
    }
    this.TagList = {
      "tags":["flying","first-strike","trample","vigilance","deathtouch","lifelink","double-strike","reach"]
    }
    this.ColourList = {
      "colours":["colourless","white","blue","black","red","green","generic"]
    }
  }
}