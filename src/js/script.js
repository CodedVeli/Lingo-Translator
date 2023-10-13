const selectTag = document.querySelectorAll('select');
const translationBtn = document.querySelector('button');
const fromText = document.getElementById('from-text');
const toText = document.getElementById('to-text');
const swap = document.getElementById('swap');
const pronounce = document.getElementById('pronounce');
const pronounce1 = document.getElementById('pronounce1');
const startRecognitionButton = document.getElementById('recognition');


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
           // This is triggered when speech recognition ends
           // You can perform additional actions here if needed
       });
   
       recognitionInstance.addEventListener('error', (event) => {
        if (event.error) {
            console.error('Speech recognition error:', event.error);
            // You can perform specific actions based on the type of error, if needed.
            // For example, you might show a user-friendly error message.
            if (event.error === 'no-speech') {
                // Handle the 'no-speech' error
            } else if (event.error === 'audio-capture') {
                // Handle the 'audio-capture' error
            } else if (event.error === 'not-allowed') {
                // Handle the 'not-allowed' error
            }
            // Add more error cases as needed.
        }
       });
   
       recognitionInstance.start();
   
       // Add a button or an event listener to start recognition when needed
       // For example:
       startRecognitionButton.addEventListener('click', () => {
           recognitionInstance.start();
       });
   }
   