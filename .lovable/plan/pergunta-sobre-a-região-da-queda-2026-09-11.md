# Pergunta sobre a região da queda

## Alterações
- Criar uma página independente em `/regiao-queda`, mantendo o cabeçalho, logo, fundo e identidade visual do quiz.
- Fazer `/diagnostico-capilar` avançar automaticamente para essa página após 4 segundos, preservando `nome`, `grau` e `tempo`.
- Exibir a pergunta “Onde você percebe que seu cabelo está ficando mais fino ou rarefeito?” com cinco respostas de escolha única.
- Usar as cinco imagens enviadas nas opções: Entradas, Topo da cabeça, Coroa, Entradas + topo e Em várias regiões da cabeça.
- Organizar as respostas em uma lista visual compacta, com imagem, texto e indicação clara da opção selecionada.
- Fazer cada item inteiro funcionar como botão, sem botão adicional de confirmação nesta etapa.
- Adaptar a composição para desktop e celular, mantendo todas as imagens legíveis e sem sobreposições.

## Detalhes técnicos
- Gerenciar as imagens como assets do projeto, sem depender diretamente dos links externos.
- Validar os parâmetros `nome`, `grau` e `tempo` na nova página, com valores seguros para acesso direto.
- Cancelar a navegação automática se a tela de diagnóstico for fechada antes dos 4 segundos.
- Incluir metadados próprios da nova página.
- Validar o redirecionamento, a seleção das cinco opções, o carregamento das imagens e a apresentação em desktop e celular.
