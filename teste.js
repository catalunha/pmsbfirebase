var teste = {
    a: { nome: "a-nome", lido: true },
    b: { nome: "b-nome", lido: true },
    c: { nome: "c-nome", lido: true }
}


for(i in teste){
    console.log(i)
    teste[i]['lido'] = false
}

// teste.array.forEach((value,index,array) => {
//     console.log(value)
//     console.log(index)
//     console.log(array)
//     value.lido = false;
// });


console.log(JSON.stringify(teste));