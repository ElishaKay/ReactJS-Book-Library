export default str => {
     let newTitle = '';
     let splitStr = str.toLowerCase().split(' ');
     for (let i = 0; i < splitStr.length; i++) {
       let newWord = splitStr[i].replace(/\W/g, '')
       newWord = newWord.charAt(0).toUpperCase() + newWord.substr(1);
       newTitle += newWord + ' ';   
     }
     return newTitle.trim()
}