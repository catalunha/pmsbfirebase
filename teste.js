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

// console.log( Object.entries(teste).length)
// let i;

// let v = Object.entries(teste)

// v = v.sort((a, b) =>{ return a[1].nome - b[1].nome}).forEach((value)=>{
//    console.log(value[1].nome) 
// })

var a = new Date("Tue Sep 03 2019 20:34:43 GMT+0300 (UTC)");
console.log(new Date(a-6000).getHours())
console.log(a.getDate()+ " / "+ a.getMonth() + " / " + a.getFullYear() + " - " + a.getHours() + ":" + a.getMinutes() )

function columnToLetter(column)
{
  var temp, letter = '';
  while (column > 0)
  {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

function letterToColumn(letter)
{
  var column = 0, length = letter.length;
  for (var i = 0; i < length; i++)
  {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
}

console.log(letterToColumn("A"))