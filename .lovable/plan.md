# Fase 4 — Espessura dos fios

## Objetivo
Criar uma nova página independente para identificar a intensidade do afinamento dos fios, mantendo o padrão visual e o fluxo atual do quiz.

## Implementação
- Criar a rota `/espessura-fios` com cabeçalho Stanley’s Care, progresso e título de peso leve.
- Exibir a pergunta “Como você percebe a espessura dos seus fios atualmente?” e as cinco respostas fornecidas.
- Apresentar as respostas como uma lista de escolha única; o item inteiro será clicável e avançará diretamente, sem botão de confirmação.
- Conectar todas as opções de `/regiao-queda` à nova página e preservar nome, grau, tempo e região escolhida.
- Manter a navegação de retorno para `/regiao-queda`, restaurando os dados já coletados.
- Incluir validação segura dos parâmetros e metadados próprios da página.

## Visual
- Seguir o design clínico premium escuro já existente, com cards compactos, marcador de seleção e destaque azul.
- Usar pequenos indicadores visuais abstratos de espessura progressiva, sem depender de novas imagens.
- Garantir boa leitura e encaixe em desktop e celular.

## Validação
- Conferir navegação entre as duas páginas, preservação das respostas, seleção por clique e teclado, visual desktop/mobile e ausência de erros.
