
// playground requires you to assign document definition to a variable called dd
var dd = {

    content: [
        {
            toc: {
                title: { text: 'ÍNDICE', style: 'header' },
                numberStyle: { bold: true },
                pageBreak: 'before'

            }

        },

        {
            text: 'Parágrafo',
            style: 'header',
            tocItem: true,
        },

        { text: ' Parágrafo', style: 'subheader' },
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat tortor ac sem hendrerit, vitae pretium tortor condimentum. Donec blandit metus et metus sagittis imperdiet. Mauris ut scelerisque nulla. In condimentum ultrices sagittis. Praesent quis lacus ac nisi pharetra viverra. Duis nec quam et metus condimentum aliquet. ',
        'Vestibulum congue nulla at dolor pretium venenatis. Fusce elementum ante mauris, et sagittis justo pharetra ac. Proin tristique, lorem in lacinia pellentesque, lacus nulla viverra nulla, at tempus lectus tellus vel lectus. Duis lobortis vehicula lorem non dapibus. Nunc porttitor erat sit amet leo suscipit viverra. Etiam sem nisi, varius vitae odio non, dapibus efficitur est.',
        {
            text: 'Lista aninhada (ordenada)',
            style: 'header',
            tocItem: true,
            tocStyle: { italics: true },
            tocMargin: [0, 10, 0, 0],
            tocNumberStyle: { italics: true, decoration: '' },
            pageBreak: 'before'
        },

        {
            ol: [
                'item 1',
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                {
                    ul: [
                        'subitem 1',
                        'subitem 2',
                        'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',

                        {
                            text: [
                                'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',

                            ]
                        },
                    ]
                },
            ]
        },

        {
            ol: [
                'item 1',
                [
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                    {
                        ol: [
                            'subitem 1',
                            'subitem 2',
                            'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                            {
                                text: [
                                    'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                                    'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                                ]
                            },
                            'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                            'subitem 4',
                            'subitem 5',
                        ]
                    }
                ],
            ]
        },


        {
            text: 'Lista aninhada (não ordenada)',
            style: 'header',
            tocItem: true,
            pageBreak: 'before'
        },


        {
            ol: [
                'item 1',
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                {
                    ul: [
                        'subitem 1',
                        'subitem 2',
                        'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',

                        {
                            text: [
                                'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                                'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',

                            ]
                        },
                        'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                        'subitem 4',
                        'subitem 5',
                    ]
                },

            ]
        },


        {
            text: 'Tabelas',
            style: 'header',
            tocItem: true,
            pageBreak: 'before'
        },

        { text: '', margin: [0, 20, 0, 8] },
        {
            style: 'tableExample',
            table: {
                headerRows: 1,
                body: [
                    [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
                    ['Sample value 1', 'Sample value 2', 'Sample value 3'],
                    ['Sample value 1', 'Sample value 2', 'Sample value 3'],
                    ['Sample value 1', 'Sample value 2', 'Sample value 3'],
                    ['Sample value 1', 'Sample value 2', 'Sample value 3'],
                    ['Sample value 1', 'Sample value 2', 'Sample value 3'],
                ]
            },
            layout: {
                hLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 2 : 1;
                },
                vLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                },
                hLineColor: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                },
                vLineColor: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                },
            }
        },


        { text: 'Definindo widgets coluna', style: 'subheader' },
        'Tables support the same width definitions as standard columns:',
        {
            bold: true,
            ul: [
                'auto',
                'star',
                'fixed value'
            ]
        },
        {
            style: 'tableExample',
            table: {
                widths: [100, '*', 200, '*'],
                body: [
                    ['width=100', 'star-sized', 'width=200', 'star-sized'],
                    ['fixed-width cells have exactly the specified width', { text: 'nothing interesting here', italics: true, color: 'gray' }, { text: 'nothing interesting here', italics: true, color: 'gray' }, { text: 'nothing interesting here', italics: true, color: 'gray' }]
                ]
            }
        },
        {
            style: 'tableExample',
            table: {
                widths: ['*', 'auto'],
                body: [
                    ['This is a star-sized column. The next column over, an auto-sized column, will wrap to accomodate all the text in this cell.', 'I am auto sized.'],
                ]
            }
        },




        { text: 'Tabela coluna texto', pageBreak: 'before', style: 'subheader' },

        {
            style: 'tableExample',
            table: {
                headerRows: 1,
                // dontBreakRows: true,
                // keepWithHeaderRows: 1,
                body: [
                    [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
                    [
                        ' consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,',
                        ' consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,',
                        ' consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,',
                    ]
                ]
            }
        },

        {
            text: 'Link para imagem',
            style: 'header',
            tocItem: true,
            pageBreak: 'before'
        },


        {
            text: [
                'Link to ',
                { text: 'imagem', link: 'https://universoracionalista.org/wp-content/uploads/2019/07/ceu-azul-nuvens-0319-1400x800.jpg', decoration: 'underline' },
                ' and ',
                { text: 'documentation', link: 'https://pdfmake.github.io/docs/', decoration: 'underline' },
                '.'
            ]
        },

    ],



    footer: function (currentPage, pageCount) { return currentPage.toString() + ' de ' + pageCount; },
    header: function (currentPage, pageCount, pageSize) {
        return [
            { text: 'header', alignment: (currentPage % 2) ? 'right' : 'right' },
            { canvas: [{ type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 30 }] }
        ]
    },

    styles: {
        header: {
            fontSize: 18,
            bold: true,
            alignment: 'center',


        },
        subheader: {
            margin: [0, 20, 0, 5],
            fontSize: 12
        },
        parametrost: {
            fontSize: 14
        },
        superMargin: {
            margin: [30, 0, 100, 10],
            fontSize: 15
        }
    }

}


class TemplateBase {

    constructor() {

        this.pdfContent = {
            content: [],
            style: {},
        }
    }

    getPdfContent() {
        return this.pdfContent;
    }

    addContentElement(contentElement) {
        this.pdfContent.content.push(contentElement);
    }

    addStyleElement(styleElementName, styleElement) {
        this.pdfContent.style[styleElementName] = styleElement;
    }

    setStyleStructure(styleStructure) {
        this.pdfContent.style = styleStructure;
    }
}

class QuestionarioAplicadoTemplate extends TemplateBase {

    constructor() {
        super();
    }

    adicionarTitulo(titulo) {
        this.addContentElement({
            'titulo': titulo
        });
    }

    adicionarCabecalho(cabecalho) {
        this.addContentElement({
            'cabecalho': cabecalho
        });
    }

    adicionarPerguntaImagem(imagemUrl) {
        this.addContentElement({
            'url': imagemUrl
        });
    }

}

var quest = new QuestionarioAplicadoTemplate()

quest.adicionarCabecalho("cabeçalho")
quest.adicionarPerguntaImagem("Url imagem")
quest.adicionarTitulo("pdf titulo")
var styleList = {

    header: {
        fontSize: 18,
        bold: true,
        alignment: 'center',

    },
    subheader: {
        fontSize: 12
    },
    parametrost: {
        fontSize: 14
    },
    superMargin: {
        margin: [30, 0, 100, 10],
        fontSize: 15
    }
}
quest.setStyleStructure(styleList)
quest.addStyleElement("nome02", { nome: "teste", outro: "outroteste" })

console.log(JSON.stringify(quest.getPdfContent()))

let a = { "content": [{ "cabecalho": "cabeçalho" }, { "url": "Url imagem" }, { "titulo": "pdf titulo" }], "style": { "header": { "fontSize": 18, "bold": true, "alignment": "center" }, "subheader": { "fontSize": 12 }, "parametrost": { "fontSize": 14 }, "superMargin": { "margin": [30, 0, 100, 10], "fontSize": 15 }, "nome02": { "nome": "teste", "outro": "outroteste" } } }