params = {
    el: "#app",
    data: {
        enredoValid: false,
        aventuraValid: false,
        missaoValid: false,
        localValid: false,
        cenaValid: false,
        eventoValid: false,
        vampOrecleValid: false,
        oracleValid: true,
        npcValid: false,
        relacaoValid: false,
        yokaiValid: false,
        jogadasValid: false,
        historicos: [],
        dados: 5,
        quant_dado: 1,
        enredoList: enredoResult,
        oracleList: oracleResult,
        missaoList: missaoResult,
        aventuraList: aventuraResult,
        eventoList: eventoResult,
        yokaiList: yokaiResult,
        cenaList: cenaResult,
        vPersonsList: npcResult,
        relacaoList: relacaoResult,
        localList: localResult,
        jogadasList: jogadasResult,
    },
    methods: {
        aba_clear: function (troca) {
            let arrClear = [
                "enredoValid",
                "aventuraValid",
                "missaoValid",
                "localValid",
                "cenaValid",
                "eventoValid",
                "oracleValid",
                "npcValid",
                "relacaoValid",
                "jogadasValid",
                "yokaiValid",
            ];

            eval(`this.${troca} = !this.${troca}`);

            for (let i = 0; i < arrClear.length; i++) {
                if (arrClear[i] != troca) {
                    eval(`this.${arrClear[i]} = false`);
                }
            }
        },
        oracleClick: function () {
            for (vE in this.oracleList) {
                this.oracleList[vE].valor = "";
            }
        },
        enredoClick: function () {
            for (vE in this.enredoList) {
                this.enredoList[vE].valor = "";
            }
        },
        jogadasClick: function () {
            for (vE in this.jogadasList) {
                this.jogadasList[vE].valor = "";
            }
        },
        localClick: function () {
            for (vE in this.localList) {
                this.localList[vE].valor = "";
            }
        },
        cenaClick: function () {
            for (vE in this.cenaList) {
                this.cenaList[vE].valor = "";
            }
        },
        yokaiClick: function () {
            for (vE in this.yokaiList) {
                this.yokaiList[vE].valor = "";
            }
        },
        relacaoClick: function () {
            for (vE in this.relacaoList) {
                this.relacaoList[vE].valor = "";
            }
        },
        missaoClick: function () {
            for (vE in this.missaoList) {
                this.missaoList[vE].valor = "";
            }
        },
        aventuraClick: function () {
            for (vE in this.aventuraList) {
                this.aventuraList[vE].valor = "";
            }
        },
        eventClick: function () {
            for (vE in this.eventoList) {
                this.eventoList[vE].valor = "";
            }
        },
        npcClick: function () {
            for (vE in this.vPersonsList) {
                this.vPersonsList[vE].valor = "";
            }
        },
        limparDados: function () {
            this.historicos = [];
        },
        rolarDados: function () {

            result_dado = [];
            for (let i = 0; i < this.quant_dado; i++) {
                result_dado.push(this.randomInt(1, this.dados));
            }
            let D_desafio = result_dado.join(", "); 
            let st = `Result: ${D_desafio}`;

            let cc = this.historicos.unshift(st);
            if (cc == 6) {
                this.historicos.pop();
            }
        },
        execOracle: function (ora, ind) {
            let arr = ["oraculo_sol", "oracle_inspiracao"];
            if (arr.includes(ora)) {
                this.combinacao_opcao(ora, this.oracleList, 2, ind);
            } else if (ora == "abstracao_oracle") {
                this.combinacao_opcao(ora, this.oracleList, 3, ind);
            } else if (ora == "pergunta_oracle") {
                this.combinacao_opcao(ora, this.oracleList, 5, ind);
            } else if (ora == "objeto_tesouro") {
                this.combinacao_opcao(ora, this.oracleList, 6, ind);
            } else {
                this.oracleList[ind].valor = oracle[ora].random();
            }
        },
        execEnredo: function (ora, ind) {
            let arr = [
                [
                    "enredo_origem",
                    "enredo_conexao",
                    "enredo_consequencia",
                    "enredo_desafio",
                    "enredo_local",
                    "enredo_objetivo",
                    "enredo_conflito",
                    "enredo_recompensa",
                    "enredo_resolucao",
                ],
            ];
            if (arr[0].includes(ora)) {
                this.combinacao_opcao(ora, this.enredoList, 3, ind);
            } else {
                this.enredoList[ind].valor = oracle[ora].random();
            }
        },
        execAventura: function (ora, ind) {
            if (ora == "vilao_npc" || ora == "aventura_ideias") {
                this.combinacao_opcao(ora, this.aventuraList, 5, ind);
            } else if (ora == "missao_completa") {
                this.combinacao_opcao(ora, this.aventuraList, 7, ind);
            } else {
                this.aventuraList[ind].valor = oracle[ora].random();
            }
        },
        execMissao: function (ora, ind) {
            let arr = [
                "missao_combate",
                "missao_busca",
                "missao_infiltracao",
                "missao_diplomacia",
                "missao_protecao",
                "missao_investigacao",
                "missao_exploracao",
                "missao_transporte",
                "missao_habilidades",
            ];
            if (arr.includes(ora)) {
                this.combinacao_opcao(ora, this.missaoList, 3, ind);
            } else {
                this.missaoList[ind].valor = oracle[ora].random();
            }
        },
        execLocal: function (ora, ind) {
            if (ora == "local_historia_cidade" || ora == "masmorra_caminho") {
                this.combinacao_opcao(ora, this.localList, 5, ind);
            } else if (ora == "masmorra_enigma") {
                this.combinacao_opcao(ora, this.localList, 2, ind);
            } else if (
                ora == "masmorra_encontro" ||
                ora == "local_masmorra" ||
                ora == "masmorra_compartimento" ||
                ora == "masmorra_armadilha"
            ) {
                this.combinacao_opcao(ora, this.localList, 3, ind);
            } else if (ora == "local_cena_interna") {
                this.combinacao_opcao(ora, this.localList, 8, ind);
            } else if (ora == "local_simple") {
                this.combinacao_opcao(ora, this.localList, 10, ind);
            } else if (ora == "local_cidade") {
                this.combinacao_opcao(ora, this.localList, 15, ind);
            } else if (ora == "local_estrutura") {
                this.combinacao_opcao(ora, this.localList, 11, ind);
            } else {
                this.localList[ind].valor = oracle[ora].random();
            }
        },
        execCena: function (ora, ind) {
            if (
                ora == "cena_evento" ||
                ora == "cena_tipo_complicacao" ||
                ora == "cena_local" ||
                ora == "cena_eve_amb" ||
                ora == "cena_rumores"
            ) {
                this.combinacao_opcao(ora, this.cenaList, 3, ind);
            } else if (
                ora == "cena_compl_amigavel" ||
                ora == "cena_compl_neutro" ||
                ora == "cena_compl_hostil" ||
                ora == "cena_ambiente"
            ) {
                this.combinacao_opcao(ora, this.cenaList, 6, ind);
            } else if (ora == "cena_rumor_detalhe") {
                this.combinacao_opcao(ora, this.cenaList, 5, ind);
            } else {
                this.cenaList[ind].valor = oracle[ora].random();
            }
        },
        execEvento: function (ora, ind) {
            if (ora == "option_aventura" || ora == "eventos_generico") {
                this.combinacao_opcao(ora, this.eventoList, 4, ind);
            } else if (ora == "evento_eGenerico") {
                this.combinacao_opcao(ora, this.eventoList, 2, ind);
            } else if (
                ora == "eventos_floresta" ||
                ora == "eventos_motanha" ||
                ora == "eventos_cidadde" ||
                ora == "eventos_dungeon"
            ) {
                this.combinacao_opcao(ora, this.eventoList, 3, ind);
            } else {
                this.eventoList[ind].valor = oracle[ora].random();
            }
        },
        execYokai: function (ora, ind) {
            if (ora == "aparencia_mostro" || ora == "mostros") {
                this.combinacao_opcao(ora, this.yokaiList, 10, ind);
            } else {
                this.yokaiList[ind].valor = oracle[ora].random();
            }
        },
        execVPersons: function (ora, ind) {
            if (ora == "npc_nome_gerado") {
                this.vPersonsList[ind].valor =
                    this.gera_nome(part_nome) + " " + this.gera_nome(part_nome);
            } else if (ora == "vamp_nome_m" || ora == "vamp_nome_f") {
                let cond = ora == "vamp_nome_m" ? 0 : 1;
                let nomeu = nomesPerson[cond];
                let nome = nomeu[this.randomInt(0, nomeu.length)];
                let sobrenomeu = nomesPerson[2];
                let sobrenome =
                    sobrenomeu[this.randomInt(0, sobrenomeu.length)];
                this.vPersonsList[ind].valor = nome + " " + sobrenome;
            } else if (ora == "personalidade_npc") {
                this.combinacao_opcao(ora, this.vPersonsList, 2, ind, "");
            } else if (ora == "npc_raca") {
                this.combinacao_opcao(ora, this.vPersonsList, 4, ind);
            } else if (ora == "coversa_npc") {
                this.combinacao_opcao(ora, this.vPersonsList, 5, ind);
            } else if (ora == "npc_caracter") {
                this.combinacao_opcao(ora, this.vPersonsList, 6, ind);
            } else if (ora == "historia_npc") {
                this.combinacao_opcao(ora, this.vPersonsList, 9, ind);
            } else if (ora == "persona_npc") {
                this.combinacao_opcao(ora, this.vPersonsList, 11, ind);
            } else {
                this.vPersonsList[ind].valor = oracle[ora].random();
            }
        },
        execRelacao: function (ora, ind) {
            if (
                ora == "probl_pessoal" ||
                ora == "probl_relacional" ||
                ora == "probl_local" ||
                ora == "probl_regional" ||
                ora == "probl_federal" ||
                ora == "probl_planetario"
            ) {
                this.combinacao_opcao(ora, this.relacaoList, 3, ind);
            } else {
                this.relacaoList[ind].valor = oracle[ora].random();
            }
        },
        execJogadas: function (ora, ind) {
            if (ora == "acao_dano_um" || ora == "acao_dano_dois") {
                this.combinacao_opcao(ora, this.jogadasList, 5, ind);
            } else if (ora == "magias") {
                this.combinacao_opcao(ora, this.jogadasList, 7, ind);
            } else {
                this.jogadasList[ind].valor = oracle[ora].random();
            }
        },
        combinacao_opcao: function (ora, lista, quant, ind, quebra = "<br />") {
            let arr = [];
            for (let i = 0; i < quant; i++) {
                let vv = oracle[ora][i];
                arr.push(vv[this.randomInt(0, vv.length)] + quebra);
            }
            lista[ind].valor = arr.join(" ");
        },
        randomInt: function (min, max) {
            let rando = Math.random();
            let rest = min + Math.floor((max - min) * rando);
            return rest;
        },
        gera_nome: function (lista) {
            let list_tamanho_nome = [1, 2, 1, 2, 3, 2, 3, 3];
            let tam_nome = this.randomInt(0, list_tamanho_nome.length);

            let nome = "";

            for (var i = 0; i < list_tamanho_nome[tam_nome]; i++) {
                let c = this.randomInt(0, 100);
                nome += lista[i][c];
            }
            return nome;
        },
    },
    filters: {
        porcente: function (val) {
            return val * 4 + "%";
        },
    },
};

document.addEventListener("DOMContentLoaded", function () {
    let elems = document.querySelectorAll("select");
    let instances = M.FormSelect.init(elems, {});
});

App = new Vue(params);
