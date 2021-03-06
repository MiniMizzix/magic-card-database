Cardform = class {

  constructor() {
    this.CardData = new CardDatabase()
    
    document.getElementById('CMC').addEventListener('focusout', event => this.onFocusOut(event))

    const allElements = document.getElementsByTagName('input')
    const allElementsCount = allElements.length

    for (var counter = 0; counter < allElementsCount; counter++) {
      const currentElement = allElements[counter]
      currentElement.addEventListener('focusout', event => this.onFocusOut(event))
    }

    const stars = document.getElementsByClassName('ratingbase')
    const starCount = stars.length

    for (var counter = 0; counter < starCount; counter++) {
      const currentStar = stars[counter]
      currentStar.addEventListener('click', event => this.onStarClick(event))
    }

    this.ManaTagsAutoFill()
    this.FormFill()
    this.Typelistfill()
    this.SuperTypelistfill()
    this.SubTypelistfill()
    this.ManaTagFill()
    this.RatingFill(this.CardData.CardStats.rating)
    this.AddButtonAutoFill()

    this.EffectivenessConsoleListener()
    this.AddClickEvent()
    this.ManaSwapListener()
  }

  onFocusOut(theEvent) {
    const currentinput = theEvent.target
    this.MakeRed(currentinput)
  }

  onStarClick(theEvent) {
    const currentStarIndex = theEvent.target.id.substring(4)
    this.RatingFill(parseInt(currentStarIndex))
  }

  onEffectivenessContainer_MouseMove(theEvent) {

    const movement = (theEvent.x - document.getElementById('effectivenesscontainer').offsetLeft)

    this.EffectivenessFill(Math.ceil(movement / 28), movement % 28)
  }

  onAddButton_click(theEvent) {
    const addTag = document.getElementById('taginput').value
    const tagCatalog = document.getElementById('tagcatalog')
    const tagList = tagCatalog.getElementsByClassName('tagitem')

    const templateWipe = tagList.length
    for (var counter = 0; counter < templateWipe; counter++) {
      const markedForNegation = tagList[0]
      tagCatalog.removeChild(markedForNegation)
    }
    this.TagSort.push(addTag)
    this.AddButtonAutoFill()
  }

  //Triggered when user clicks on Mana Tag on the right
  //copies tag to left side
  onManaTag_click(theEvent, manaTag) {
    const newTag = manaTag.cloneNode(true)
    const manaBoard = document.getElementById('costboard')
    const manaDiv = newTag.getElementsByClassName('manatag')[0]
    const manaName = manaDiv.textContent
    const fluxManaList = this.CardData.CoolerColourList.bettercolours
    this.ManaArray_IncrementQty(manaName)
    this.FluxManaSort_pushSecondary (manaName)

    manaBoard.appendChild(newTag)
    newTag.addEventListener('click', event => this.onManaTagRemove_click(event, newTag))
  }

  onManaTagRemove_click(theEvent, manaTag) {
    const manaBoard = document.getElementById('costboard')
    const manaDiv = manaTag.getElementsByClassName('manatag')[0]
    const manaName = manaDiv.textContent
    this.ManaArray_DecrementQty(manaName)
    this.FluxManaSort_pop(manaName)

    manaBoard.removeChild(manaTag)
  }

  FluxManaSort_pushPrimary (manaTag) {
    const fluxManaList = this.CardData.CoolerColourList.bettercolours
    fluxManaList.push(manaTag)
    fluxManaList.sort()
    console.log(fluxManaList)
  }

  FluxManaSort_pushSecondary (manaTag) {
    const fluxManaList = this.CardData.CoolerColourList.bettercolours
    fluxManaList.push(manaTag)
    fluxManaList.sort()
    this.DisplayWipe()
    this.ManaDisplayFill()
    console.log(fluxManaList)
  }

  DisplayWipe () {
    const displayBoard = document.getElementById('manadisplay')
    const displayNodes = displayBoard.getElementsByClassName('displaysymbol')
    const genericValue = document.getElementById('genericdisplay')
    genericValue.textContent = 0

    const templateWipe = displayNodes.length
    for (var counter = 0; counter < templateWipe; counter++) {
      const markedForNegation = displayNodes[0]
      displayBoard.removeChild(markedForNegation)
    }
  }

  //no primary/secondary since only one function calls it
  FluxManaSort_pop (manaTag) {
    const fluxManaList = this.CardData.CoolerColourList.bettercolours
    const froggy = fluxManaList.indexOf(manaTag)
    fluxManaList.splice(froggy, 1)
    fluxManaList.sort()
    this.DisplayWipe()
    this.ManaDisplayFill()
    console.log(fluxManaList)
  }

  AddButtonAutoFill() {
    this.TagSort = this.CardData.TagList.tags.sort()
    const allTagsCount = this.TagSort.length

    for (var counter = 0; counter < allTagsCount; counter++) {
      const currentTag = this.TagSort[counter]
      this.TheMiddleMan(currentTag)
    }
  }

  TheMiddleMan(textApplication) {
    const tagTemplate = document.getElementById('tagtemplate')
    const newTag = tagTemplate.cloneNode(true)
    const cardTagsNode = document.getElementById('tagcatalog')

    newTag.classList.remove('nonvisible')
    newTag.setAttribute('id', 'tag' + textApplication)

    const tagText = newTag.getElementsByClassName('tagname')
    tagText[0].textContent = textApplication

    cardTagsNode.appendChild(newTag, cardTagsNode.childNodes[0])
  }

  AddClickEvent() {
    const addTag = document.getElementById('taginput').value
    const addButton = document.getElementById('addbutton')

    addButton.addEventListener('click', event => this.onAddButton_click(event))
  }


  MakeRed(theInput) {
    if (theInput.value === "") {
      theInput.classList.add('redbox')
    } else {
      theInput.classList.remove('redbox')
    }
  }

  Typelistfill() {
    const allTypesCount = this.CardData.TypeList.type.length
    const currentDataList = document.getElementById('typedatalist')

    for (var counter = 0; counter < allTypesCount; counter++) {
      const currentType = this.CardData.TypeList.type[counter]
      var newOption = document.createElement('option')
      newOption.textContent = currentType
      currentDataList.append(newOption)
    }
  }

  SuperTypelistfill() {
    const allSuperTypesCount = this.CardData.SuperTypeList.supertype.length
    const currentDataList = document.getElementById('supertypedatalist')

    for (var counter = 0; counter < allSuperTypesCount; counter++) {
      const currentType = this.CardData.SuperTypeList.supertype[counter]
      var newOption = document.createElement('option')
      newOption.textContent = currentType
      currentDataList.append(newOption)
    }
  }

  SubTypelistfill() {
    const allSubTypesCount = this.CardData.SubTypeList.subtype.length
    const currentDataList = document.getElementById('subtypedatalist')

    for (var counter = 0; counter < allSubTypesCount; counter++) {
      const currentType = this.CardData.SubTypeList.subtype[counter]
      var newOption = document.createElement('option')
      newOption.textContent = currentType
      currentDataList.append(newOption)
    }
  }

  RatingFill(theCurrentStar) {
    for (var counter = 1; counter <= theCurrentStar; counter++) {
      var currentStar = document.getElementById("star" + [counter])
      currentStar.classList.remove('rating')
      currentStar.classList.add('ratingfull')
    }
    for (var counter = theCurrentStar + 1; counter <= 5; counter++) {
      var currentStar = document.getElementById("star" + [counter])
      currentStar.classList.remove('ratingfull')
      currentStar.classList.add('rating')
    }
  }

  EffectivenessConsoleListener() {
    document.getElementById('effectivenesscontainer').addEventListener('mousemove', event => this.onEffectivenessContainer_MouseMove(event));
  }

  EffectivenessFill(theCurrentStar, theStarFraction) {
    if (theCurrentStar > 10) return


    for (var counter = 1; counter <= theCurrentStar; counter++) {
      var currentStar = document.getElementById("effectiveness" + [counter])
      currentStar.classList.remove('effectiveness')
      if (counter == theCurrentStar) {
        if (theStarFraction <= 14) {
          currentStar.classList.add('effectivenesshalf')
        } else {
          currentStar.classList.remove('effectivenesshalf')
          currentStar.classList.add('effectivenessfull')
        }
      } else {
        currentStar.classList.remove('effectivenesshalf')
        currentStar.classList.add('effectivenessfull')
      }
    }

    for (var counter = theCurrentStar + 1; counter <= 10; counter++) {
      var currentStar = document.getElementById("effectiveness" + [counter])
      currentStar.classList.remove('effectivenessfull')
      currentStar.classList.remove('effectivenesshalf')
      currentStar.classList.add('effectiveness')
    }
  }

  ManaSwapListener() {
    const colourCount = this.CardData.ColourList.colours.length
    const manaTagsNode = document.getElementById('manatagboard')
    const manaTags = manaTagsNode.getElementsByClassName('manasymbol')

    for (var counter = 0; counter < colourCount; counter++) {
      const currentTag = manaTags[counter]

      manaTags[counter].addEventListener('click', event => this.onManaTag_click(event, currentTag))
    }
  }

  ManaTagFill() {
    const manaTemplate = document.getElementById('manatagtemplate')
    const manaList = document.getElementById('manatagboard')
    const colourList = this.CardData.ColourList.colours
    const colourCount = colourList.length

    for (var counter = 0; counter < colourCount; counter++) {
      const newMana = manaTemplate.cloneNode(true)

      newMana.classList.remove('nonvisible')

      const tagText = newMana.getElementsByClassName('manatag')
      tagText[0].textContent = colourList[counter]

      manaList.appendChild(newMana, manaList.childNodes[0])
    }
  }

  FormFill() {
    document.getElementById('cardname').value = this.CardData.CardStats.cardname

    document.getElementById('power').value = this.CardData.CardStats.power

    document.getElementById('toughness').value = this.CardData.CardStats.toughness

    document.getElementById('subtype').value = this.CardData.CardStats.subtype

    document.getElementById('cardtype').value =
      this.CardData.CardStats.type
  }

  ManaArray_IncrementQty(manaTag) {
    const manaList = this.CardData.CardStats.manacost
    const manaListCount = manaList.length
    console.log(manaTag)

    for (var counter = 0; counter < manaListCount; counter++) {
      const currentMana = manaList[counter]

      if (currentMana.type == manaTag) {
        currentMana.qty = currentMana.qty + 1
        console.log(currentMana.qty)
      }
    }
  }

  ManaArray_DecrementQty(manaTag) {
    const manaList = this.CardData.CardStats.manacost
    const manaListCount = manaList.length
    console.log(manaTag)

    for (var counter = 0; counter < manaListCount; counter++) {
      const currentMana = manaList[counter]

      if (currentMana.type == manaTag) {
        currentMana.qty = currentMana.qty - 1
        console.log(currentMana.qty)
      }
    }
  }

  ManaTagsAutoFill () {
    const manaTemplate = document.getElementById('manatagtemplate')
    const manaList = this.CardData.CardStats.manacost
    const manaListCount = manaList.length
    const costBoard = document.getElementById('costboard')


    for (var counter = 0; counter < manaListCount; counter++) {
      const currentMana = manaList[counter]

      for (var looper = 0; looper < currentMana.qty; looper++) {
        const newMana = manaTemplate.cloneNode(true)

        newMana.classList.remove('nonvisible')

        const tagText = newMana.getElementsByClassName('manatag')
        tagText[0].textContent = currentMana.type

        costBoard.appendChild(newMana, costBoard.childNodes[0])
        newMana.addEventListener('click', event => this.onManaTagRemove_click(event, newMana))
        
        this.FluxManaSort_pushPrimary (currentMana.type)
      }
    }

    this.ManaDisplayFill ()
  }

  /*ManaDisplayInsert (manaColour) {
    const displayBoard = document.getElementById('manadisplay')
    const symbolNode = document.getElementById('displaysymbol')
    if (manaColour !== 'generic') {
      const newSymbol = symbolNode.cloneNode(true)

      newSymbol.classList.remove('nonvisible')
      newSymbol.classList.remove('hidden')
      newSymbol.classList.add(manaColour)
      newSymbol.setAttribute('src', 'images/' + manaColour + '.png')

      displayBoard.appendChild(newSymbol, displayBoard.childNodes[0])
    } else {
      const genericDisplay = document.getElementById('genericdisplay')
      var genericCount = genericDisplay.textContent
      genericCount = parseInt(genericCount) + 1
      genericDisplay.textContent = genericCount
    }
  } */

  //fills when fluxManaList changes
  ManaDisplayFill () {
    const displayBoard = document.getElementById('manadisplay')
    const symbolNode = document.getElementById('displaysymbol')
    const fluxManaList = this.CardData.CoolerColourList.bettercolours
    const fluxManaListCount = fluxManaList.length

    for (var counter = 0; counter < fluxManaListCount; counter++) {
      if (fluxManaList[counter] !== 'generic') {
      const newSymbol = symbolNode.cloneNode(true)

      newSymbol.classList.remove('nonvisible')
      newSymbol.classList.remove('hidden')
      newSymbol.classList.add(fluxManaList[counter])
      newSymbol.setAttribute('src', 'images/' + fluxManaList[counter] + '.png')

      displayBoard.appendChild(newSymbol, displayBoard.childNodes[0])
    } else {
      const genericDisplay = document.getElementById('genericdisplay')
      var genericCount = genericDisplay.textContent
      genericCount = parseInt(genericCount) + 1
      genericDisplay.textContent = genericCount
      }
    }
  }

  /*ManaDisplayDelete (manaColour) {
    const displayBoard = document.getElementById('manadisplay')
    const allSymbols = document.getElementsByClassName('displaysymbol')
    const allSymbolsCount = allSymbols.length
    if (manaColour !== 'generic') {
      for (var counter = 0; counter < allSymbolsCount; counter++) {
        var currentSymbol = allSymbols[counter]
        var symbolColour = currentSymbol.classList[1]
        if (manaColour == symbolColour) {
          displayBoard.removeChild(currentSymbol)
          return
        }
      }
    } else {
      const genericDisplay = document.getElementById('genericdisplay')
      var genericCount = genericDisplay.textContent
      genericCount = parseInt(genericCount) - 1
      genericDisplay.textContent = genericCount
    }
  }*/


}

const myForm = new Cardform()