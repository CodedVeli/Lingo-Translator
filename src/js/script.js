const selectTag = document.querySelectorAll('select');
 translationBtn = document.querySelector('button');
const fromText = document.getElementById('from-text');
const toText = document.getElementById('to-text');
const swap = document.getElementById('swap');
const pronounce = document.getElementById('pronounce');


selectTag.forEach((tag, id) => {
    for (const contry_code in countries) {
        let selected;
        if (id == 0 && contry_code == "en-GB") {
            selected = "selected";
        } else if(id == 1 && contry_code == "am-ET") {
            selected = "selected";
        }
        let option = `<option value="${contry_code}" ${selected}>${countries[contry_code]}</option>`  
        tag.insertAdjacentHTML("beforeend", option);
    }
});
swap.addEventListener('click', () => {
    let temp = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = temp;
    let tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;
})

translationBtn.addEventListener('click', () => {
    let text = fromText.value;
    translateFrom = selectTag[0].value;
    translateTo = selectTag[1].value;
    console.log(text, translateFrom, translateTo);
    let translationApi = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(translationApi).then(res => res.json()).then(data => toText.value = data.responseData.translatedText);
        
    
})

pronounce.forEach(icon => {
    icon.addEventListener('click', () => {
       console.log(icon);
          })
})