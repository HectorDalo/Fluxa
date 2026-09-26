// ===============================
// DADOS DA PESQUISA
// ===============================

const pesquisa = {

    frequencia: [
        { nome: "Todos os dias", valor: 55 },
        { nome: "Algumas vezes por semana", valor: 26 },
        { nome: "Algumas vezes por mês", valor: 14 },
        { nome: "Raramente", valor: 9 },
        { nome: "Nunca", valor: 1 }
    ],

    qualidade: [
        { nome: "Sim, frequentemente", valor: 52 },
        { nome: "Sim, algumas vezes", valor: 31 },
        { nome: "Raramente", valor: 9 },
        { nome: "Não sei dizer", valor: 11 },
        { nome: "Nunca", valor: 1 }
    ],

    interesse: [
        { nome: "Com certeza utilizaria", valor: 45 },
        { nome: "Provavelmente utilizaria", valor: 30 },
        { nome: "Talvez utilizaria", valor: 23 },
        { nome: "Provavelmente não utilizaria", valor: 4 },
        { nome: "Não utilizaria", valor: 1 }
    ]

};


// ===============================
// CRIAÇÃO DOS GRÁFICOS
// ===============================

function criarGrafico(id, dados, total) {

    const container = document.getElementById(id);

    if (!container) {
        return;
    }

    const largura = 760;
    const altura = 360;

    const margemEsquerda = 55;
    const margemDireita = 20;
    const margemSuperior = 30;
    const margemInferior = 90;

    const larguraGrafico =
        largura - margemEsquerda - margemDireita;

    const alturaGrafico =
        altura - margemSuperior - margemInferior;

    const larguraBarra = 70;

    const espacamento =
        larguraGrafico / dados.length;


    // ===============================
    // GRADIENTE DAS BARRAS
    // ===============================

    let svg = `

        <svg
            viewBox="0 0 ${largura} ${altura}"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
        >

        <defs>

            <linearGradient
                id="gradiente-${id}"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
            >

                <stop
                    offset="0%"
                    stop-color="#66e5ff"
                />

                <stop
                    offset="100%"
                    stop-color="#00cfff"
                />

            </linearGradient>

            <filter id="brilho-${id}">

                <feGaussianBlur
                    stdDeviation="4"
                    result="blur"
                />

                <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>

            </filter>

        </defs>

    `;


    // ===============================
    // LINHAS DO GRÁFICO
    // ===============================

    for (let i = 0; i <= 4; i++) {

        const valor = Math.round(
            total - (total / 4) * i
        );

        const y =
            margemSuperior +
            (alturaGrafico / 4) * i;


        svg += `

            <line
                x1="${margemEsquerda}"
                y1="${y}"
                x2="${largura - margemDireita}"
                y2="${y}"
                stroke="rgba(102,229,255,0.14)"
                stroke-width="1"
            />

            <text
                x="${margemEsquerda - 10}"
                y="${y + 4}"
                text-anchor="end"
                fill="#7f8b95"
                font-size="12"
            >

                ${valor}

            </text>

        `;

    }


    // ===============================
    // EIXO INFERIOR
    // ===============================

    const eixoY =
        margemSuperior + alturaGrafico;


    svg += `

        <line
            x1="${margemEsquerda}"
            y1="${eixoY}"
            x2="${largura - margemDireita}"
            y2="${eixoY}"
            stroke="rgba(102,229,255,0.3)"
            stroke-width="1"
        />

    `;


    // ===============================
    // BARRAS
    // ===============================

    dados.forEach((item, indice) => {

        const alturaBarra =
            (item.valor / total) * alturaGrafico;

        const x =
            margemEsquerda +
            espacamento * indice +
            (espacamento - larguraBarra) / 2;

        const y =
            eixoY - alturaBarra;


        // Barra

        svg += `

            <rect
                x="${x}"
                y="${y}"
                width="${larguraBarra}"
                height="${alturaBarra}"
                rx="10"
                fill="url(#gradiente-${id})"
                filter="url(#brilho-${id})"
                class="barra-grafico"
            />

        `;


        // Valor

        svg += `

            <text
                x="${x + larguraBarra / 2}"
                y="${y - 10}"
                text-anchor="middle"
                fill="#ffffff"
                font-size="14"
                font-weight="bold"
            >

                ${item.valor}

            </text>

        `;


        // Nome da categoria

        const palavras = item.nome.split(" ");

        let linha1 = "";
        let linha2 = "";


        palavras.forEach(palavra => {

            if (
                (linha1 + " " + palavra).length <= 16
            ) {

                linha1 +=
                    (linha1 ? " " : "") + palavra;

            } else {

                linha2 +=
                    (linha2 ? " " : "") + palavra;

            }

        });


        const textoY = eixoY + 25;


        svg += `

            <text
                x="${x + larguraBarra / 2}"
                y="${textoY}"
                text-anchor="middle"
                fill="#a7b0ba"
                font-size="11"
            >

                <tspan
                    x="${x + larguraBarra / 2}"
                    dy="0"
                >

                    ${linha1}

                </tspan>

                ${
                    linha2
                        ? `

                            <tspan
                                x="${x + larguraBarra / 2}"
                                dy="15"
                            >

                                ${linha2}

                            </tspan>

                        `
                        : ""
                }

            </text>

        `;

    });


    svg += `</svg>`;


    container.innerHTML = svg;

}


// ===============================
// INICIALIZAÇÃO DOS GRÁFICOS
// ===============================

criarGrafico(
    "grafico-frequencia",
    pesquisa.frequencia,
    105
);

criarGrafico(
    "grafico-qualidade",
    pesquisa.qualidade,
    104
);

criarGrafico(
    "grafico-interesse",
    pesquisa.interesse,
    103
);


// ===============================
// MVP — SELEÇÃO DE ARQUIVO
// ===============================

const arquivoInput =
    document.getElementById("arquivo");

const arquivoSelecionado =
    document.getElementById("arquivo-selecionado");

const progressoContainer =
    document.getElementById("progresso-container");

const progresso =
    document.getElementById("progresso");

const progressoValor =
    document.getElementById("progresso-valor");

const resultadoUpload =
    document.getElementById("resultado-upload");

const btnCopiar =
    document.getElementById("btn-copiar");


// ===============================
// SELECIONAR ARQUIVO
// ===============================

if (arquivoInput) {

    arquivoInput.addEventListener("change", () => {

        const arquivo = arquivoInput.files[0];

        if (!arquivo) {
            return;
        }


        // Calcula o tamanho do arquivo em MB

        const tamanhoMB =
            (arquivo.size / (1024 * 1024)).toFixed(2);


        // Mostra o arquivo selecionado

        arquivoSelecionado.textContent =
            `Arquivo selecionado: ${arquivo.name} • ${tamanhoMB} MB`;


        // Mostra a barra de progresso

        progressoContainer.style.display = "block";

        // Esconde o resultado anterior

        resultadoUpload.style.display = "none";


        // Reinicia a barra

        progresso.style.width = "0%";

        progressoValor.textContent = "0%";


        // ===============================
        // SIMULAÇÃO DO ENVIO
        // ===============================

        let porcentagem = 0;


        const intervalo = setInterval(() => {

            porcentagem += 5;


            progresso.style.width =
                `${porcentagem}%`;

            progressoValor.textContent =
                `${porcentagem}%`;


            // Quando chegar em 100%

            if (porcentagem >= 100) {

                clearInterval(intervalo);


                // Mostra o resultado

                resultadoUpload.style.display =
                    "block";

            }

        }, 100);

    });

}


// ===============================
// COPIAR LINK
// ===============================

if (btnCopiar) {

    btnCopiar.addEventListener("click", async () => {

        const link =
            document.getElementById("link-fluxa").value;


        try {

            await navigator.clipboard.writeText(link);


            btnCopiar.textContent =
                "Copiado!";


            setTimeout(() => {

                btnCopiar.textContent =
                    "Copiar link";

            }, 2000);


        } catch (erro) {

            btnCopiar.textContent =
                "Erro ao copiar";

        }

    });

}


// ===============================
// MENSAGEM NO CONSOLE
// ===============================

console.log(
    "Gráficos da pesquisa Fluxa carregados!"
);

console.log(
    "MVP da Fluxa carregado!"
);