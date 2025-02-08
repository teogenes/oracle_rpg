/*********************************** ABAS ************************************************ */

let oracleResult = [
    { label: "Oraculo Geral", ora: "pergunta_oracle", valor: "", msg: "O oraculo das perguntas"},
    { label: "Abstração", ora: "abstracao_oracle", valor: "", msg: "Para ideias abstratas: Situação, Sujeito e Verbo"},
    { label: "Criar Artefato", ora: "criar_aterfato", valor: "", msg: "Criar Artefato"},
    { label: "Maldição", ora: "maldicao_aterfato", valor: "", msg: "Revela a maldição"},
];

let enredoResult = [
    { label: "Origem", ora: "enredo_origem", valor: "", msg: "O que desencadeou o <b>EVENTO INICIAL</b>."},
    { label: "Conexão", ora: "enredo_conexao", valor: "", msg: "Como o <b>EVENTO INICIAL</b> se conecta ao personagem."},
];

let aventuraResult = [
    { label: "Missões", ora: "missao_completa", valor: "", msg: "Cria uma idea para a missão."},
    { label: "Desafio", ora: "vilao_npc", valor: "", msg: "Desafio final da <b>missão</b></b>."},
];

let missaoResult = [
    { label: "Missão", ora: "tipo_missao", valor: "", msg: "Tipo de missão."},
    { label: "Busca", ora: "missao_busca", valor: "", msg: "Os personagens precisam encontrar ou recuperar um item, pessoa ou informação importante."},
    { label: "Combate", ora: "missao_combate", valor: "", msg: "Combate: Os personagens devem enfrentar e derrotar inimigos ou criaturas em batalha."},
    { label: "Infiltração", ora: "missao_infiltracao", valor: "", msg: "Os personagens precisam se infiltrar em uma área ou organização inimiga e obter informações, sabotar ou executar uma tarefa sem serem detectados."},
    { label: "Diplomacia", ora: "missao_diplomacia", valor: "", msg: "Os personagens devem negociar, persuadir ou mediar um conflito entre partes em disputa."},
    { label: "Proteção", ora: "missao_protecao", valor: "", msg: "Os personagens precisam defender uma pessoa, local ou objeto de ameaças ou perigos."},
    { label: "Investigação", ora: "missao_investigacao", valor: "", msg: "Os personagens devem solucionar um mistério, descobrir informações ou desvendar um enigma."},
    { label: "Exploração", ora: "missao_exploracao", valor: "", msg: "Os personagens precisam mapear, explorar ou sobreviver a um ambiente desconhecido ou hostil."},
    { label: "Transporte", ora: "missao_transporte", valor: "", msg: "Os personagens devem escoltar ou entregar uma pessoa, objeto ou mensagem a um destino específico."},
    { label: "Desafio de hab.", ora: "missao_habilidades", valor: "", msg: "Os personagens precisam usar suas habilidades, talentos ou recursos para superar um obstáculo ou situação difícil."},
];

let localResult = [
    { label: "Tipo Local", ora: "tipo_local", valor: "", msg: "Gera o tipo do local"},
    { label: "Natural/Ermo", ora: "local_simple", valor: "", msg: "Gera um local natural/ermo"},
    { label: "Cidade", ora: "cidade_si", valor: "", msg: "<i>1.</i> Cria um esquema de cidade."},
    { label: "Hist. Cidade", ora: "local_historia_cidade", valor: "", msg: "<i>2.</i> Cria uma historia da cidade."},
    { label: "Estruturas", ora: "local_estrutura", valor: "", msg: "<i>3.</i> Cria as estruturas da cidade."},
    { label: "Mais detalhe", ora: "local_detalhe", valor: "", msg: "<i>4.</i> Adiciona mais um detalhe a cidade."},
    { label: "Loc cidade", ora: "local_cidade", valor: "", msg: "Cria local da cidadde"},
    { label: "Loc estranho", ora: "local_estranho", valor: "", msg: "Cria local estranho"},
    { label: "Masmorra", ora: "local_masmorra", valor: "", msg: "<i>1.</i> Cria o tamanho e tipo da masmorra."},
    { label: "Estrutura", ora: "masmorra_compartimento", valor: "", msg: "<i>2.</i> O tipo de Estrutura a encontrar na masmorra."},
    { label: "Compartimento", ora: "masmorra_caminho", valor: "", msg: "<i>3.</i> Cria as caracteristicas de cada parte da masmorra."},
    { label: "Encontro", ora: "masmorra_encontro", valor: "", msg: "<i>3.1.</i> Cria o tipo e o desafio de tipo do encontro do item Comp.(3.)"},
    { label: "Armadilha", ora: "masmorra_armadilha", valor: "", msg: "<i>3.2.</i> Cria a armadilha do tipo de encontro do item Comp.(3.)<br /> Joge <b>2d10</b> e compare com o valor de cada item."},
    { label: "Enigma", ora: "masmorra_enigma", valor: "", msg: "<i>3.3.</i> Cria o enigma do tipo de encontro do item Comp.(3.)<br /> Joge <b>2d10</b> e compare com o valor de cada item."},
];

let cenaResult = [
    { label: "Ambiente", ora: "cena_ambiente", valor: "", msg: "Estado emocional do ambiente/pessoas."},
    { label: "Event. Ambie", ora: "cena_eve_amb", valor: "", msg: "Criação de eventos do ambiente."},
    { label: "Evento cena", ora: "cena_evento", valor: "", msg: "Criação de eventos de cena."},
    { label: "NPCs", ora: "cena_npc", valor: "", msg: "NPC presente na cena." },
    { label: "Rumores", ora: "cena_rumores", valor: "", msg: "Rumores da cena."},
    { label: "Detal. rumor", ora: "cena_rumor_detalhe", valor: "", msg: "detalhes do Rumor"},
    { label: "Complicações", ora: "cena_tipo_complicacao", valor: "", msg: "Tipo complicações."},
    { label: "C. Amigável", ora: "cena_compl_amigavel", valor: "", msg: "Complicação Amigável."},
    { label: "C. Neutro", ora: "cena_compl_neutro", valor: "", msg: "Complicação Neutro."},
    { label: "C. Hostil", ora: "cena_compl_hostil", valor: "", msg: "Complicação Hostil."},
    { label: "Finalização", ora: "acontece_evento", valor: "", msg: "Finalização da complicação."},
];

let eventoResult = [
    { label: "Encontros", ora: "eventos_acontecimento", valor: "", msg: "" },
    { label: "Eventos", ora: "evento_eGenerico", valor: "", msg: "Eventos aleatórios"},
    { label: "Even. generico", ora: "eventos_generico", valor: "", msg: "Eventos generico"},
    { label: "Reviravolta", ora: "reviravolta", valor: "", msg: "" },
    { label: "Tipo encontro", ora: "evento_encontro", valor: "", msg: "Tipo de encontro"},
    { label: "Enc. vida", ora: "encontro_vida", valor: "", msg: "Encontro de forma de vida"},
    { label: "Enc. estrutura", ora: "encontro_estrutura", valor: "", msg: "Encontro de Estrutura"},
    { label: "Enc. obstaculo", ora: "encontro_obstaculo", valor: "", msg: "Encontro de Obstaculo"},
];

let relacaoResult = [
    { label: "pessoal ", ora: "probl_pessoal", valor: "", msg: "Relação da persona com o ambiente"},
    { label: "relacional", ora: "probl_relacional", valor: "", msg: "Relação das pessoas para a sua persona"},
    { label: "local", ora: "probl_local", valor: "", msg: "Relação do ambiente para a sua persona"},
    { label: "regional", ora: "probl_regional", valor: "", msg: "Relação das pessoas para o ambiente"},
    { label: "federal", ora: "probl_federal", valor: "", msg: "Relação historica a nivel continental"},
    { label: "planetário", ora: "probl_planetario", valor: "", msg: "Relação historica a nivel mundial"},
];

let jogadasResult = [
    { label: "Magias", ora: "magias", valor: "", msg: "Tipos e magias" },
    { label: "Suces./Falha", ora: "acao_teste", valor: "", msg: "Sucesso ou Falha?"},
    { label: "Ação Combate", ora: "acao_combate", valor: "", msg: "" },
    { label: "Situac. combate", ora: "situacao_combate", valor: "", msg: "" },
    { label: "Pagando preço", ora: "pag_preco", valor: "", msg: "" },
    { label: "Dano Elem.", ora: "acao_dano_um", valor: "", msg: "Dano Elemento"},
    { label: "Dano Fisico", ora: "acao_dano_dois", valor: "", msg: "Dano Fisico"},
];

let yokaiResult = [
    { label: "Animal", ora: "mostros", valor: "", msg: "Geração de animais" },
    { label: "Criaturas", ora: "animais_estranho", valor: "", msg: "Animal estranho"},
    { label: "Seres estranhos", ora: "criaturas_estranha", valor: "", msg: "Seres estranha"},
    { label: "Mostruoso", ora: "aparencia_mostro", valor: "", msg: "Geração de mostro"},
    { label: "Vulnerabilidade", ora: "vulnerabilidade", valor: "", msg: "A criatura tem medo de?"},
];

let npcResult = [
    { label: "Raça", ora: "npc_raca", valor: "", msg: "" },
    { label: "Nome M", ora: "vamp_nome_m", valor: "", msg: "" },
    { label: "Nome F", ora: "vamp_nome_f", valor: "", msg: "" },
    { label: "Gerar nome", ora: "npc_nome_gerado", valor: "", msg: "" },
    { label: "Caracteristicas", ora: "persona_npc", valor: "", msg: "Humor (5 niveis) de Hostil(1) a Prestativo(5)"},
    { label: "Carac. Fisicas", ora: "npc_caracter", valor: "", msg: "" },
    { label: "Historico", ora: "historia_npc", valor: "", msg: "" },
    { label: "Personalidade", ora: "personalidade_npc", valor: "", msg: "" },
    { label: "Conflitos", ora: "conflitos_evento", valor: "", msg: "Conflito do npc"},
    { label: "Conversa NPC", ora: "coversa_npc", valor: "", msg: "" },
    { label: "Conv.interesse", ora: "conversa2_npc", valor: "", msg: "" },
    { label: "Conv.hostil", ora: "conversa3_npc", valor: "", msg: "" },
];

let magiaResult = [
    { label: "Celeste", ora: "magia_celeste", valor: "", msg: "Magia celeste!" },
    { label: "Espiritual", ora: "magia_espiritual", valor: "", msg: "Magia espiritual!" },
    { label: "Elemental", ora: "magia_elemental", valor: "", msg: "Magia Elemental!" },
]