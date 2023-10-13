const selectTag = document.querySelectorAll('select');
const translationBtn = document.querySelector('button');
const fromText = document.getElementById('from-text');
const toText = document.getElementById('to-text');
const swap = document.getElementById('swap');
const pronounce = document.getElementById('pronounce');
const pronounce1 = document.getElementById('pronounce1');
const startRecognitionButton = document.getElementById('recognition');
const copy = document.getElementById('copy');    
const copy2 = document.getElementById('copy2');       



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
});

translationBtn.addEventListener('click', () => {
    let text = fromText.value;
    if (!text) return;
    translateFrom = selectTag[0].value;
    translateTo = selectTag[1].value;
    let translationApi = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(translationApi).then(res => res.json()).then(data => toText.value = data.responseData.translatedText);
});

    pronounce.addEventListener('click', () => {
        let text = fromText.value;
        if (!text) return;
        let utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
        console.log('clicked', utterance);
    });

    pronounce1.addEventListener('click', () => {
        let text = toText.value;
        if (!text) return;
        let utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
        console.log('clicked', utterance);
    });

   // Speech recognition

   const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
   if (!recognition) {
       console.error("Speech recognition is not supported in this browser.");
   } else {
       const recognitionInstance = new recognition();
       recognitionInstance.interimResults = true;
   
       recognitionInstance.addEventListener('result', (event) => {
           let transcript = '';
           for (const result of event.results) {
               transcript += result[0].transcript;
           }
           fromText.value = transcript;
       });
   
       recognitionInstance.addEventListener('end', () => {
       });
   
       recognitionInstance.addEventListener('error', (event) => {
        if (event.error) {
            console.error('Speech recognition error:', event.error);
            if (event.error === 'no-speech') {
            } else if (event.error === 'audio-capture') {
            } else if (event.error === 'not-allowed') {
            }
        }
       });
   
       recognitionInstance.start();
   
       startRecognitionButton.addEventListener('click', () => {
           recognitionInstance.start();
       });
   }
   

   // Copy to clipboard

    copy.addEventListener('click', () => {
        let text = fromText.value;
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard');
        }).catch((error) => {
            console.error('Error in copying text: ', error);
        });
    });

    copy2.addEventListener('click', () => {
        let text = toText.value;
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard');
        }).catch((error) => {
            console.error('Error in copying text: ', error);
        });
    });
    
    