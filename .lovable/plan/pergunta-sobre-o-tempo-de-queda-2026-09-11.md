# Pergunta sobre o tempo de queda

## Alterações
- Criar uma página independente em `/tempo-queda`, mantendo o cabeçalho, logo, fundo e identidade visual do quiz.
- Exibir a pergunta “Há quanto tempo você percebe que seu cabelo está caindo ou ficando mais fino?” com cinco respostas de escolha única.
- Usar indicadores visuais coerentes com cada período, incluindo uma opção neutra para “Não tenho certeza”.
- Fazer cada resposta ter estado selecionado claro e acessível, com botão “Continuar” habilitado somente após uma escolha.
- Preservar o nome e o grau já informados ao avançar e ao voltar.
- Ligar o botão “Continuar” da página motivacional à nova pergunta.
- Adaptar a composição para desktop e celular, seguindo a estrutura da referência sem copiar sua identidade visual.

## Detalhes técnicos
- Transportar `nome` e `grau` por parâmetros de busca validados, sem armazenamento permanente.
- Manter a resposta somente no estado desta etapa até que a próxima página seja definida.
- Incluir metadados próprios da nova página e validar seleção, navegação e legibilidade.
