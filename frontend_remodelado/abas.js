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
    { label: "Vilão", ora: "vilao_enredo", valor: "", msg: "<b>VILÃO</b> em geral."},
];

let aventuraResult = [
    { label: "Aventura", ora: "aventura_inicio", valor: "", msg: "Cria uma idea para a aventura."},
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

let masmorraResult = [
    { label: "Masmorra", ora: "local_masmorra", valor: "", msg: "<i>1.</i> Cria o tamanho e tipo da masmorra."},
    { label: "Estrutura", ora: "masmorra_compartimento", valor: "", msg: "<i>2.</i> O tipo de Estrutura a encontrar na masmorra."},
    { label: "Corredor", ora: "masmorra_corredor", valor: "", msg: "Corredores da <b>Estrutura</b>!"},
    { label: "Sala", ora: "masmorra_sala", valor: "", msg: "Salas da <b>Estrutura</b>!"},
    { label: "Conteúdo", ora: "conteudo_estrutura", valor: "", msg: "Conteúdo da <b>Estrutura</b>!"},
    { label: "Encontro", ora: "masmorra_encontro", valor: "", msg: ""},
];

let cenaResult = [
    { label: "Caracteristica", ora: "caracte_cena", valor: "", msg: "Caracteristica da <b>Cena</b> propriadamente dita."},
    { label: "Ambiente", ora: "cena_ambiente", valor: "", msg: "Estado emocional do ambiente/pessoas."},
    { label: "NPCs", ora: "cena_npc", valor: "", msg: "NPC presente na cena." },
    { label: "Rumores", ora: "cena_rumores", valor: "", msg: "Rumores da cena."},
    { label: "Detal. rumor", ora: "cena_rumor_detalhe", valor: "", msg: "detalhes do Rumor"},
    { label: "Complicações", ora: "cena_tipo_complicacao", valor: "", msg: "Tipo complicações."},
    { label: "C. Amigável", ora: "cena_compl_amigavel", valor: "", msg: "Complicação Amigável."},
    { label: "C. Neutro", ora: "cena_compl_neutro", valor: "", msg: "Complicação Neutro."},
    { label: "C. Hostil", ora: "cena_compl_hostil", valor: "", msg: "Complicação Hostil."},
];

let eventoResult = [
    { label: "Eventos", ora: "evento_eGenerico", valor: "", msg: "Eventos aleatórios"},
    { label: "Even. generico", ora: "eventos_generico", valor: "", msg: "Eventos generico"},
    { label: "Event. Ambie", ora: "cena_eve_amb", valor: "", msg: "Criação de eventos do ambiente."},
    { label: "Evento cena", ora: "cena_evento", valor: "", msg: "Criação de eventos de cena."},
    { label: "Reviravolta", ora: "reviravolta", valor: "", msg: "" },
];

let jogadasResult = [
    { label: "Magias", ora: "magias", valor: "", msg: "Tipos e magias" },
    { label: "Suces./Falha", ora: "acao_teste", valor: "", msg: "Sucesso ou Falha?"},
    { label: "Ação Combate", ora: "acao_combate", valor: "", msg: "" },
    { label: "Situac. combate", ora: "situacao_combate", valor: "", msg: "" },
    { label: "Pagando preço", ora: "pag_preco", valor: "", msg: "" },
];

let yokaiResult = [
    { label: "Animal", ora: "mostros", valor: "", msg: "Geração de animais" },
    { label: "Criaturas", ora: "animais_estranho", valor: "", msg: "Animal estranho"},
    { label: "Seres estranhos", ora: "criaturas_estranha", valor: "", msg: "Seres estranha"},
    { label: "Mostruoso", ora: "aparencia_mostro", valor: "", msg: "Geração de mostro"},
    { label: "Vulnerabilidade", ora: "vulnerabilidade", valor: "", msg: "A criatura tem medo de?"},
];

let npcResult = [
    { label: "Nome M", ora: "vamp_nome_m", valor: "", msg: "" },
    { label: "Nome F", ora: "vamp_nome_f", valor: "", msg: "" },
    { label: "Gerar nome", ora: "npc_nome_gerado", valor: "", msg: "" },
    { label: "Caracteristicas", ora: "persona_npc", valor: "", msg: "Humor (5 niveis) de Hostil(1) a Prestativo(5)"},
    { label: "Carac. Fisicas", ora: "npc_caracter", valor: "", msg: "" },
    { label: "Historico", ora: "historia_npc", valor: "", msg: "" },
    { label: "Conflitos", ora: "conflitos_evento", valor: "", msg: "Conflito do npc"},
    { label: "Posicionamento", ora: "posicionamento_npc", valor: "", msg: "Posicionamento inicial da conversão e a atividade atual (NPC)"},
    { label: "Conversa NPC", ora: "coversa_npc", valor: "", msg: "" },
    { label: "Vínculo NPC", ora: "vinculo_npc", valor: "", msg: "Vínculo entre NPCs" },
];

let personResult = [
    { label: "Família", ora: "person_familia", valor: "", msg: "Sua família! *Irmão: jogue na coluna 4 uma vez para cada irmão para definir tudo sobre ele." },
    { label: "Sit Família", ora: "sit_familia", valor: "", msg: "Situação da família!" },
    { label: "Você", ora: "este_você", valor: "", msg: "Sua vida!" },
    { label: "Motivação", ora: "motivacao_person", valor: "", msg: "Motivação da persona!" },
    { label: "Aconteceu", ora: "aconteceu_person", valor: "", msg: "O que aconteceu de marcante na sua vida pregresa!" },
    { label: "Gran eventos", ora: "grande_evento", valor: "", msg: "Grandes Eventos!" },
    { label: "Gran inimigo", ora: "grande_inimigo", valor: "", msg: "Grandes Inimigo!" },
    { label: "Gran amigo", ora: "grande_amigo", valor: "", msg: "Grandes Amigo!" },
    { label: "Ah, o Amor", ora: "person_amor", valor: "", msg: "Ah, o Amor!" },
]

let ermosResult = [
    { label: "Tipo Ermo", ora: "tipo_ermo", valor: "", msg: "Tipo de Ermo!"},
    { label: "P. Referência", ora: "refer_ermo", valor: "", msg: "<b>Pontos de referência!</b>"},
    { label: "Assentamentos", ora: "local_historia_cidade", valor: "", msg: "História do <b>Assentamentos!</b>!"},
    { label: "Aldeia", ora: "aldeia_ermo", valor: "", msg: "Aldeia dos <b>Assentamentos!</b>"},
    { label: "Vila", ora: "vila_ermo", valor: "", msg: "Vila dos <b>Assentamentos!</b>"},
    { label: "Cidade", ora: "cidade_ermo", valor: "", msg: "Cidade dos <b>Assentamentos!</b>"},
    { label: "Castelo", ora: "castelo_ermo", valor: "", msg: "Castelo dos <b>Assentamentos!</b>"},
    { label: "Torre", ora: "torre_ermo", valor: "", msg: "Torre dos <b>Assentamentos!</b>"},
    { label: "Mosteiro", ora: "mosteiro_ermo", valor: "", msg: "Mosteiro/Convento dos <b>Assentamentos!</b>"},
    { label: "Templos", ora: "templos_ermo", valor: "", msg: "Templo dos <b>Assentamentos!</b>"},
];

let hexResult = [

]