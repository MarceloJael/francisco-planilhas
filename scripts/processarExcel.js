function processExcel() {

    // Recebendo arquivo
    var logExecucao = document.getElementById("execucaoSistema");

    var divMensagem = document.createElement("h3");
    divMensagem.classList.add('verde');
    divMensagem.innerText = 'Recebendo arquivo ...';
    logExecucao.appendChild(divMensagem);

    const fileInput = document.getElementById('excel-file');

    if (fileInput.value === '' || fileInput.files.length === 0) {
        var divMensagem = document.createElement("h3");
        divMensagem.classList.add('vermelho');
        divMensagem.innerText = 'XXX NÃO É POSSIVEL CONTINUAR, POR GENTILEZA ENVIE UM ARQUIVO VALIDO XXX';
        logExecucao.appendChild(divMensagem);
    } 

    const file = fileInput.files[0];
    const reader = new FileReader();

    // Variaveis
    let codMovimento;
    let tipoCobranca;
    let analistaCobranca;
    let codContrato;
    let garantiaContrato;
    let nomeCliente;
    let valorTotal;
    let dataVencimento;
    let diasAtraso;

    // lendo arquivo
    reader.onload = function(e) {

        const data = e.target.result;
        const workbook = XLSX.read(data, {type: 'binary'});
        const sheetName = workbook.SheetNames[0];

        var divMensagem = document.createElement("h3");
        divMensagem.innerText = 'Arquivo recebido.';
        logExecucao.appendChild(divMensagem);

        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet, {header: 1});

        rows.forEach(function(row, rowIndex) {
            if (rowIndex > 0) {

                codMovimento = row[0],
                tipoCobranca = "Locação";

                if (row[6] == 'Camila Oliveira') {
                    analistaCobranca = "Jeniffer"
                } else if (row[6] == 'Sônia') {
                    analistaCobranca = "Jeniffer"
                } else if (row[6] == 'Camila Alves') {
                    analistaCobranca = "Marjori"
                } else if (row[6] == 'Maria de Jesus') {
                    analistaCobranca = "Marjori"
                } else if (row[6] == 'Fabiana') {
                    analistaCobranca = "Marjori"
                } else {
                    analistaCobranca = "SEM ANALISTA"
                }

                codContrato = row[1];
                garantiaContrato = row[7];
                nomeCliente = row[15];
                valorTotal = row[13];
                dataVencimento = XLSX.SSF.format('dd/mm/yyyy', row[11]);
                diasAtraso = row[12];


                const conexaoPipefy = {
                    method: 'POST',
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDEwNDgzNjQsImVtYWlsIjoibmF5YXJhQGZyYW5jaXNjb2ltb3ZlaXMuY29tLmJyIiwiYXBwbGljYXRpb24iOjMwMDI0NDAwNX19.u9NuQ6lJNit3E7KmY3MO1SYblekWKLhigxI78gpIJOugE3Mrgd08GrHuoJjRgOUmsUHSWT27Wa2AHYL_c6-JSw'
                    },
            
                    body: JSON.stringify(
                        {query: 'mutation { createCard(input:{ pipe_id:"301370946", fields_attributes: [{field_id:"c_digo_do_movimento", field_value:"'+codMovimento+'"},{field_id:"tipo_de_cobran_a", field_value:"'+tipoCobranca+'"},{field_id:"analista_de_cobran_a", field_value:"'+analistaCobranca+'"},{field_id:"codigo_do_contrato", field_value:"'+codContrato+'"},{field_id:"garantia_do_contrato", field_value:"'+garantiaContrato+'"},{field_id:"locat_rio", field_value:"'+nomeCliente+'"},{field_id:"valor_atual", field_value:'+valorTotal+'},{field_id:"data_de_vencimento_1", field_value:"'+dataVencimento+'"},{field_id:"dias_de_atrasos", field_value:"'+diasAtraso+'"}]}){card{id}}}'}
                    )
            
                };

                fetch('https://api.pipefy.com/graphql', conexaoPipefy)

                .then(response => {
                    // Mostra resposta da conexão
                    if (!response.ok) {
                        var divMensagem = document.createElement("h3");
                        divMensagem.innerText = 'Ocorreu um erro na criacao do card...';
                        logExecucao.appendChild(divMensagem);
                    } 

                    return response.json();
                })
        
                .then(data => {
                    // Mostra resposta do resultado da API
                    if (data.data.createCard == null) {

                        const buscaPipefy = {
                            method: 'POST',
                            headers: {
                                accept: 'application/json',
                                'content-type': 'application/json',
                                authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDEwNDgzNjQsImVtYWlsIjoibmF5YXJhQGZyYW5jaXNjb2ltb3ZlaXMuY29tLmJyIiwiYXBwbGljYXRpb24iOjMwMDI0NDAwNX19.u9NuQ6lJNit3E7KmY3MO1SYblekWKLhigxI78gpIJOugE3Mrgd08GrHuoJjRgOUmsUHSWT27Wa2AHYL_c6-JSw'
                            },
                    
                            body: JSON.stringify(
                                {query: 'query {findCards(pipeId: "301370946" search: {fieldId: "c_digo_do_movimento", fieldValue: "'+row[0]+'"}){edges {node {current_phase {name}}}}}'}
                            )
                    
                        };

                        fetch('https://api.pipefy.com/graphql', buscaPipefy)

                        .then(response => {
                            return response.json();
                        })

                        .then(data => {
                            var divMensagem = document.createElement("h3");
                            divMensagem.innerText = 'Criando card...';
                            logExecucao.appendChild(divMensagem);

                            var divMensagem = document.createElement("h3");
                            divMensagem.classList.add('vermelho');
                            divMensagem.innerText = 'O Cod. Movimento: '+row[0]+' Já existe! - Ele está na fase: '+ data.data.findCards.edges[0].node.current_phase.name;
                            logExecucao.appendChild(divMensagem);
                        })

                    } else {
                        var divMensagem = document.createElement("h3");
                        divMensagem.innerText = 'Criando card...';
                        logExecucao.appendChild(divMensagem);

                        var divMensagem = document.createElement("h3");
                        divMensagem.classList.add('verde');
                        divMensagem.innerText = 'Card criado com sucesso - Cod Movimento: ' + row[0];
                        logExecucao.appendChild(divMensagem);
                    }
                })
            
                .catch(error => {
                    var divMensagem = document.createElement("h3");
                    divMensagem.innerText = 'Erro: ' + error + ' - (COD MOVIMENTO: '+ row[0] + ')';
                    logExecucao.appendChild(divMensagem);
                });                
            }
        });

    };

    reader.readAsBinaryString(file);
}
