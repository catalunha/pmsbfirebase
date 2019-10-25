// // let teste = {
// //     valor01: {
// //         nome: 1
// //     },
// //     valor02: {
// //         nome: 3
// //     }, valor03: {
// //         nome: 2
// //     },
// //     valor04: {
// //         nome: 6
// //     },valor05: {
// //         nome: 1
// //     }
// // }

// // console.log("size:" + Object.entries(teste).length)

// // let i;

// // Object.entries(teste).forEach(data=>{console.log(data)})



// // v = v.sort((a, b) =>{ return a[1].nome - b[1].nome}).forEach((value)=>{
// //    console.log(value[1].nome) 

// // })


// // var a = new Date("Tue Sep 03 2019 20:34:43 GMT+0300 (UTC)");
// // console.log(new Date(a - 6000).getHours())
// // console.log(a.getDate() + " / " + a.getMonth() + " / " + a.getFullYear() + " - " + a.getHours() + ":" + a.getMinutes())

// // function columnToLetter(column) {
// //   var temp, letter = '';
// //   while (column > 0) {
// //     temp = (column - 1) % 26;
// //     letter = String.fromCharCode(temp + 65) + letter;
// //     column = (column - temp - 1) / 26;
// //   }
// //   return letter;
// // }

// // function letterToColumn(letter) {
// //   var column = 0, length = letter.length;
// //   for (var i = 0; i < length; i++) {
// //     column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
// //   }
// //   return column;
// // }

// // console.log(letterToColumn("A"))



// // var a = {
// //   "spreadsheetId": "1lGwxBTGXd55H6QfnJ_7WKuNBJi16dC_J6PBk0QR0viA",
// //   "valueRanges": [
// //     {
// //       "valueRange": {
// //         "range": "'Página1'!A1:AA1003",
// //         "majorDimension": "ROWS",
// //         "values": [
// //           [
// //             "#",
// //             "id",
// //             "teste-abcd",
// //             "testeA",
// //             "Araguaina",
// //             "Chapada de Areia",
// //             "testeB",
// //             "setorTeste"
// //           ],
// //           [
// //             "id",
// //             "idsetor",
// //             "",
// //             "",
// //             "",
// //             "",
// //             "",
// //             "LcyvPGkVkGleX7OGzWPu"
// //           ],
// //           [
// //             "iditem",
// //             "#"
// //           ],
// //           [
// //             "Numero",
// //             "",
// //             "1111",
// //             "5555",
// //             "5555",
// //             "5555"
// //           ],
// //           [
// //             "Texto",
// //             "",
// //             "dasda",
// //             "dasda",
// //             "dasda",
// //             "Text"
// //           ],
// //           [
// //             "Imagem"
// //           ],
// //           [
// //             "Arquivo",
// //             "",
// //             "Link do arquivo",
// //             "Link",
// //             "Link",
// //             "Link"
// //           ],
// //           [
// //             "painelTesteA",
// //             "YkSw64ANUCj333d0kR79"
// //           ]
// //         ]
// //       },
// //       "dataFilters": [
// //         {
// //           "gridRange": {
// //             "startRowIndex": 0
// //           }
// //         }
// //       ]
// //     }
// //   ]
// // }

// // function filtrar(fieldId, lista) {
// //   let i;
// //   lista.forEach((x, index) => {
// //     if (x == fieldId) {
// //       return i = index + 1;
// //     }
// //   });
// //   return i
// // }

// // var b = (a["valueRanges"][0]["valueRange"]["values"][0])
// // var fieldId = "Numero";

// // console.log(filtrar("id", b))


// function teste(){
//     let content = {
//         style: 'tableExample',
//         table: {
//             headerRows: 1,
//             body: [

//             ]
//         },
//         layout: 'noBorders'
//     }    
//     console.log("01 " + JSON.stringify(content))
//     alterarValor(content)
//     console.log("02" + JSON.stringify(content))
// }

// function alterarValor(content){
//     content.table.body.push([{ text: 'ID:', style: 'tableHeader', bold: true }, { text: "perguntaId", style: 'tableHeader' }])
// }

// teste()

const Printer = require('pdfmake')
const axios = require('axios')
const path = require('path')

async function pdf() {
    var printer = new Printer({
        Roboto: {
            normal: path.resolve('src', 'fonts', 'Roboto.ttf'),
            bold: path.resolve('src', 'fonts', 'Roboto-Bold.ttf'),
        }
    })

    try {
        var result1 = await axios.get('https://firebasestorage.googleapis.com/v0/b/pmsb-22-to.appspot.com/o/desenhando.svg?alt=media&token=5269bdb3-a55e-43a7-a2d0-f221b3c45f45', {
            //responseType: 'arraybuffer'
        })
    } catch (err) {
        return next(err.message)
    }


    try {
        var result2 = await axios.get('https://o.aolcdn.com/images/dims?quality=85&image_uri=https%3A%2F%2Fo.aolcdn.com%2Fimages%2Fdims%3Fcrop%3D904%252C507%252C0%252C0%26quality%3D85%26format%3Djpg%26resize%3D1600%252C897%26image_uri%3Dhttps%253A%252F%252Fs.yimg.com%252Fos%252Fcreatr-uploaded-images%252F2019-09%252Fa252c700-d091-11e9-98d7-456d0782809a%26client%3Da1acac3e1b3290917d92%26signature%3Dbfd0e993df5297c08f967061614c8160d0d9ccd8&client=amp-blogside-v2&signature=5cf955b9a3304615eae2ed4df51146dca86f2421', {
            responseType: 'arraybuffer'
        })
    } catch (err) {
        return next(err.message)
    }


    try {
        var result3 = await axios.get('https://media.gettyimages.com/photos/arch-bridge-in-kromlau-picture-id539121576?s=612x612', {
            responseType: 'arraybuffer'
        })
    } catch (err) {
        return next(err.message)
    }


    try {
        var result4 = await axios.get('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7yyjhewRrX4wT3AhBBtwwpfVj9hiV1pDmGo3Drls3_rzxfvBQOg', {
            responseType: 'arraybuffer'
        })
    } catch (err) {
        return next(err.message)
    }

    var image1 = result1.data; //new Buffer(result1.data, 'base64')
    var image2 = new Buffer(result2.data, 'base64')
    var image3 = new Buffer(result3.data, 'base64')
    var image4 = new Buffer(result4.data, 'base64')

    
    var doc = printer.createPdfKitDocument({
        info: {
            title: 'PDF with External Image',
            author: 'Matt Hagemann',
            subject: 'PDF with External Image',
        },
        content: [{
            svg: image1,
            width: 20,
            height: 20, // Full A4 size width.
            //absolutePosition: { x: 0, y: 0 }
        },{
            image: image2,
            width: 200, // Full A4 size width.
            //absolutePosition: { x: 0, y: 0 }
        },{
            image: image3,
            //width: 200, // Full A4 size width.
            //absolutePosition: { x: 0, y: 0 }
        },{
            image: image4,
            //width: 200, // Full A4 size width.
            //absolutePosition: { x: 0, y: 0 }
        }],
        defaultStyle: {
            fontSize: 11,
            font: 'Roboto', // The font name was defined above.
            lineHeight: 1.2,
        }
    })


   // var pdf = pdfmake.createPdf(docDefinition);
    doc.write('lists.pdf')

   
}

pdf().then(()=>{
    console.log("FOI");
}).catch(()=>{
    //console.log("Nao foi");
})