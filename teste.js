// let teste = {
//     valor01: {
//         nome: 1
//     },
//     valor02: {
//         nome: 3
//     }, valor03: {
//         nome: 2
//     },
//     valor04: {
//         nome: 6
//     },valor05: {
//         nome: 1
//     }
// }

// console.log("size:" + Object.entries(teste).length)

// let i;

// Object.entries(teste).forEach(data=>{console.log(data)})



// v = v.sort((a, b) =>{ return a[1].nome - b[1].nome}).forEach((value)=>{
//    console.log(value[1].nome) 

// })


// var a = new Date("Tue Sep 03 2019 20:34:43 GMT+0300 (UTC)");
// console.log(new Date(a - 6000).getHours())
// console.log(a.getDate() + " / " + a.getMonth() + " / " + a.getFullYear() + " - " + a.getHours() + ":" + a.getMinutes())

// function columnToLetter(column) {
//   var temp, letter = '';
//   while (column > 0) {
//     temp = (column - 1) % 26;
//     letter = String.fromCharCode(temp + 65) + letter;
//     column = (column - temp - 1) / 26;
//   }
//   return letter;
// }

// function letterToColumn(letter) {
//   var column = 0, length = letter.length;
//   for (var i = 0; i < length; i++) {
//     column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
//   }
//   return column;
// }

// console.log(letterToColumn("A"))



// var a = {
//   "spreadsheetId": "1lGwxBTGXd55H6QfnJ_7WKuNBJi16dC_J6PBk0QR0viA",
//   "valueRanges": [
//     {
//       "valueRange": {
//         "range": "'Página1'!A1:AA1003",
//         "majorDimension": "ROWS",
//         "values": [
//           [
//             "#",
//             "id",
//             "teste-abcd",
//             "testeA",
//             "Araguaina",
//             "Chapada de Areia",
//             "testeB",
//             "setorTeste"
//           ],
//           [
//             "id",
//             "idsetor",
//             "",
//             "",
//             "",
//             "",
//             "",
//             "LcyvPGkVkGleX7OGzWPu"
//           ],
//           [
//             "iditem",
//             "#"
//           ],
//           [
//             "Numero",
//             "",
//             "1111",
//             "5555",
//             "5555",
//             "5555"
//           ],
//           [
//             "Texto",
//             "",
//             "dasda",
//             "dasda",
//             "dasda",
//             "Text"
//           ],
//           [
//             "Imagem"
//           ],
//           [
//             "Arquivo",
//             "",
//             "Link do arquivo",
//             "Link",
//             "Link",
//             "Link"
//           ],
//           [
//             "painelTesteA",
//             "YkSw64ANUCj333d0kR79"
//           ]
//         ]
//       },
//       "dataFilters": [
//         {
//           "gridRange": {
//             "startRowIndex": 0
//           }
//         }
//       ]
//     }
//   ]
// }

// function filtrar(fieldId, lista) {
//   let i;
//   lista.forEach((x, index) => {
//     if (x == fieldId) {
//       return i = index + 1;
//     }
//   });
//   return i
// }

// var b = (a["valueRanges"][0]["valueRange"]["values"][0])
// var fieldId = "Numero";

// console.log(filtrar("id", b))


function teste(){
    let content = {
        style: 'tableExample',
        table: {
            headerRows: 1,
            body: [
               
            ]
        },
        layout: 'noBorders'
    }    
    console.log("01 " + JSON.stringify(content))
    alterarValor(content)
    console.log("02" + JSON.stringify(content))
}

function alterarValor(content){
    content.table.body.push([{ text: 'ID:', style: 'tableHeader', bold: true }, { text: "perguntaId", style: 'tableHeader' }])
}

teste()