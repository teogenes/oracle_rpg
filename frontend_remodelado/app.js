params = {
    el: '#app',
    data: {
        enredoValid: false,
        aventuraValid: false,
        eventoValid:false,
        missaoValid: false,
        missaoMaisValid: false,
        localValid: true,
        vampOrecleValid: false,
        oracleValid: false,
        vampPersValid: false,
        ressoValid: false,
        yokaiValid: false,
        shinigameValid: false,
        jogadasValid: false,
        historicos: [],
        dados:21,
        enredoList: enredoResult,
        oracleList: oracleResult,
        missaoList: missaoResult,
        missaoMaisList: missaoMaisResult,
        aventuraList: aventuraResult,
        eventoList: eventoResult,
        yokaiList: yokaiResult,
        ressoList: ressoResult,
        vPersonsList: vampPersonResult,
        shiniList: shiniResult,
        localList: localResult,
        jogadasList: jogadasResult,
    },
    methods:{
        aba_clear: function(troca){
            let arrClear = [
                'enredoValid','aventuraValid','missaoValid',
                'missaoMaisValid','localValid','ressoValid',
                'eventoValid','oracleValid','vampPersValid',
                'shinigameValid','jogadasValid','yokaiValid'
            ]
            
            eval(`this.${troca} = !this.${troca}`)
            
            for(let i = 0;i < arrClear.length;i++){
                if(arrClear[i] != troca){
                    eval(`this.${arrClear[i]} = false`)
                }
            }

        },
        oracleClick: function(){
            for(vE in this.oracleList){
                this.oracleList[vE].msg = "";
            }
        },
        enredoClick: function(){
            for(vE in this.enredoList){
                this.enredoList[vE].valor = '';
            }
        },
        jogadasClick: function(){
            for(vE in this.jogadasList){
                this.jogadasList[vE].msg = "";
            }
        },
        localClick: function(){
            for(vE in this.localList){
                this.localList[vE].valor = "";
            }
        },
        ressoClick: function(){
            for(vE in this.ressoList){
                this.ressoList[vE].msg = "";
            }
        },
        yokaiClick: function(){
            for(vE in this.yokaiList){
                this.yokaiList[vE].msg = "";
            }
        },
        shiniClick: function(){
            for(vE in this.shiniList){
                this.shiniList[vE].msg = "";
            }
        },
        missaoClick: function(){
            for(vE in this.missaoList){
                this.missaoList[vE].valor = "";
            }
        },
        missaoMaisClick: function(){
            for(vE in this.missaoMaisList){
                this.missaoMaisList[vE].valor = "";
            }
        },
        aventuraClick: function(){
            for(vE in this.aventuraList){
                this.aventuraList[vE].valor = "";
            }
        },
        eventClick: function(){
            for(vE in this.eventoList){
                this.eventoList[vE].msg = "";
            }
        },
        vampPersonClick: function(){
            for(vE in this.vPersonsList){
                this.vPersonsList[vE].msg = "";
            }
        },
        limparDados: function(){
            this.historicos = [];
        },
        rolarDados: function(){
            
            let D1_desafio = randomInt(1, this.dados);
            let st = `Result: ${D1_desafio}`;
            
            if(this.dados != 21){
                let D2_desafio = randomInt(1, this.dados);
                st = `Result: ${D1_desafio} e ${D2_desafio}`; 
            }
            let cc = this.historicos.unshift(st);
            if(cc == 6){
                this.historicos.pop();
            }
        },
        execOracle: function(ora, ind){
            if(ora == 'oraculo_sol' || ora == 'oracle_inspiracao'){
                this.combinacao_opcao(ora, this.oracleList, 2,ind)
            }else if(ora == 'pergunta_oracle'){
                this.combinacao_opcao(ora, this.oracleList, 3,ind)
            }else{
                this.oracleList[ind].msg = oracle[ora].random()
            }
        },
        execEnredo: function(ora, ind){
            let arr = [
                ['enredo_origem', 'enredo_conexao', 'enredo_consequencia', 'enredo_desafio', 
                'enredo_local', 'enredo_objetivo', 'enredo_conflito', 'enredo_recompensa', 'enredo_resolucao']
            ];
            if(arr[0].includes(ora)){
                this.combinacao_opcao(ora, this.enredoList, 3,ind)
            }else{
                this.enredoList[ind].valor = oracle[ora].random()
            }
        },
        execAventura: function(ora, ind){
            if(ora == 'aventura_ideias'){
                this.combinacao_opcao(ora, this.aventuraList, 5,ind)
            }else if(ora == 'aventura_ideias_dois'){
                this.combinacao_opcao(ora, this.aventuraList, 6,ind)
            }else{
                this.aventuraList[ind].valor = oracle[ora].random() 
            }
        },
        execMissao: function(ora, ind){
            let arr = [
                'missao_combate', 'missao_busca', 'missao_infiltracao', 'missao_diplomacia',
                'missao_protecao','missao_investigacao','missao_exploracao', 'missao_transporte',
                'missao_habilidades',
            ]
            if( arr.includes(ora)){
                this.combinacao_opcao(ora, this.missaoList, 3,ind)
            }else{
                this.missaoList[ind].valor = oracle[ora].random() 
            }
        },
        execMaisMissao: function(ora, ind){
            this.missaoMaisList[ind].valor = oracle[ora].random()
        },
        execLocal: function(ora, ind){
            if(ora == 'local_gerar'){
                this.combinacao_opcao(ora, this.localList, 4, ind)
            } else {
                this.localList[ind].msg = oracle[ora].random();
            }
        },
        execEvento: function(ora, ind){
            if(ora == 'option_aventura'){
                this.combinacao_opcao(ora, this.eventoList, 4,ind)
            }else{
                this.eventoList[ind].msg = oracle[ora].random() 
            }
        },
        execResso: function(ora, ind){
            
            if(ora == 'cena_medieval' || ora == 'cena_ubarna' || ora == 'cena_espacial'|| 
                ora == 'cena_tipo_complicacao' || ora == 'cena_local' || ora == 'cena_eve_amb' || ora == 'cena_rumores'){
                this.combinacao_opcao(ora, this.ressoList, 3,ind)
            }else if(ora == 'cena_compl_amigavel' || ora == 'cena_compl_neutro' || ora == 'cena_compl_hostil'){
                this.combinacao_opcao(ora, this.ressoList, 6,ind)
            }else{
                this.ressoList[ind].msg = oracle[ora].random()
            }
        },
        execYokai: function(ora, ind){
            if(ora == 'aparencia_mostro'){
                this.combinacao_opcao(ora, this.yokaiList, 10,ind)
            }else{
                this.yokaiList[ind].msg = oracle[ora].random()
            }
        },
        execVPersons: function(ora, ind){
            if(ora == 'npc_nome_gerado'){
                this.vPersonsList[ind].msg = this.gera_nome(part_nome) + ' ' + this.gera_nome(part_nome);
            }else if(ora == 'vamp_nome_m' || ora == 'vamp_nome_f'){
                let cond = ora == 'vamp_nome_m' ? 0 : 1;
                let nomeu = nomesPerson[cond];
                let nome = nomeu[this.randomInt(0,nomeu.length)]
                let sobrenomeu = nomesPerson[2];
                let sobrenome = sobrenomeu[this.randomInt(0,sobrenomeu.length)];
                this.vPersonsList[ind].msg = nome + " " + sobrenome
            }else if(ora == 'personalidade_npc'){
                this.combinacao_opcao(ora, this.vPersonsList, 2,ind)
            }else if(ora == 'historia_npc' || ora == 'npc_raca'){
                this.combinacao_opcao(ora, this.vPersonsList, 3,ind)
            }else if(ora == 'historia_atual' || ora == 'vilao_npc'){
                this.combinacao_opcao(ora, this.vPersonsList, 5,ind)
            }else if(ora == 'persona_npc' || ora == 'npc_caracter'){
                this.combinacao_opcao(ora, this.vPersonsList, 6,ind)
            }else{
                this.vPersonsList[ind].msg = oracle[ora].random();
            }
            
        },
        execShini: function(ora, ind){
            if(ora == 'probl_pessoal' || ora == 'probl_relacional' || ora == 'probl_local' || ora == 'probl_regional' || ora == 'probl_federal' || ora == 'probl_planetario'){
                this.combinacao_opcao(ora, this.shiniList, 3,ind)
            }else{
                this.shiniList[ind].msg = oracle[ora].random();
            }
        },
        execJogadas: function(ora, ind){
            if(ora == 'acao_dano_um' || ora == 'acao_dano_dois'){
                this.combinacao_opcao(ora, this.jogadasList, 5,ind)
            }else{
                this.jogadasList[ind].msg = oracle[ora].random();
            }
        },
        combinacao_opcao: function(ora, lista, quant, ind){
            let arr = [];
            for (let i = 0; i < quant; i++) {
                let vv = oracle[ora][i]
                arr.push( vv[this.randomInt(0,vv.length)] + "<br />" )
            }
            lista[ind].valor = arr.join(' ');
        },
        randomInt: function (min, max) {
            return min + Math.floor((max - min) * Math.random());
        },
        gera_nome : (lista) => {
            let list_tamanho_nome = [1,2,1,2,3,2,3,3]
            let tam_nome = randomInt(0, list_tamanho_nome.length)
            let nome = '';
            for (var i = 0; i < list_tamanho_nome[tam_nome]; i++) {
                let c = randomInt(0, 100)
                nome += lista[i][c]
            }
            return nome
        }

    },
    filters:{
        porcente: function(val){
            return (val * 4) + "%";
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('select');
    let instances = M.FormSelect.init(elems, {});
});

App = new Vue(params);