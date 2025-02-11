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
        oracleValid: false,
        npcValid: false,
        relacaoValid: false,
        yokaiValid: false,
        jogadasValid: false,
        personValid: true,
        historicos: [],
        dado_ativo: 5,
        dado_passivo: 5,
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
        personList: personResult,
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
                "personValid",
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
        personClick: function () {
            for (vE in this.personList) {
                this.personList[vE].valor = "";
            }
        },
        limparDados: function () {
            this.historicos = [];
        },
        rolarDados: function () {

            // quant_dado eliminar
            let res_ativo = this.randomInt(1, this.dado_ativo);
            let res_passivo = this.randomInt(1, this.dado_passivo);
            let dresutado = res_ativo - res_passivo;

            let D_desafio = `${res_ativo} - ${res_passivo} = ${dresutado}`; 
            let st = `Result: ${D_desafio}`;

            let cc = this.historicos.unshift(st);
            if (cc == 6) {
                this.historicos.pop();
            }
        },
        execOracle: function (ora, ind) {
            this.combinacao_opcao(ora, this.oracleList, ind);
        },
        execEnredo: function (ora, ind) {
            this.combinacao_opcao(ora, this.enredoList, ind);
        },
        execAventura: function (ora, ind) {
            this.combinacao_opcao(ora, this.aventuraList, ind);
        },
        execMissao: function (ora, ind) {
            this.combinacao_opcao(ora, this.missaoList, ind);
        },
        execLocal: function (ora, ind) {
            this.combinacao_opcao(ora, this.localList, ind);
        },
        execCena: function (ora, ind) {
            this.combinacao_opcao(ora, this.cenaList, ind);
        },
        execEvento: function (ora, ind) {
            this.combinacao_opcao(ora, this.eventoList, ind);
        },
        execYokai: function (ora, ind) {
            this.combinacao_opcao(ora, this.yokaiList, ind);
        },
        execPerson: function (ora, ind) {
            this.combinacao_opcao(ora, this.personList, ind);
        },
        execVPersons: function (ora, ind) {
            if (ora == "npc_nome_gerado") {
                this.vPersonsList[ind].valor = this.gera_nome(part_nome) + " " + this.gera_nome(part_nome);
            } else if (ora == "vamp_nome_m" || ora == "vamp_nome_f") {
                let cond = ora == "vamp_nome_m" ? 0 : 1;
                let nomeu = nomesPerson[cond];
                let nome = nomeu[this.randomInt(0, nomeu.length)];
                let sobrenomeu = nomesPerson[2];
                let sobrenome = sobrenomeu[this.randomInt(0, sobrenomeu.length)];
                this.vPersonsList[ind].valor = nome + " " + sobrenome;
            } else if (ora == "personalidade_npc") {
                this.combinacao_opcao(ora, this.vPersonsList, ind, "");
            } else{
                this.combinacao_opcao(ora, this.vPersonsList, ind);
            }
        },
        execRelacao: function (ora, ind) {
            this.combinacao_opcao(ora, this.relacaoList, ind);
        },
        execJogadas: function (ora, ind) {
            this.combinacao_opcao(ora, this.jogadasList, ind);
        },
        combinacao_opcao: function (ora, lista, ind, quebra = "<br />") {
            if(Array.isArray(oracle[ora][0])){
                let arr = [];
                let quant = oracle[ora].length;
                for (let i = 0; i < quant; i++) {
                    let vv = oracle[ora][i];
                    arr.push(vv[this.randomInt(0, vv.length)]);
                }
                lista[ind].valor = arr.join(quebra);
            }else{
                lista[ind].valor = oracle[ora].random();
            }
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
