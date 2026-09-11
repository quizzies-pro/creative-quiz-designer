# Página motivacional personalizada

## Alterações
- Criar uma nova página independente em `/motivacional`, seguindo a composição da referência: texto à esquerda, imagem à direita e botão “Continuar” fixado na faixa inferior.
- Personalizar a mensagem conforme o grau 1, 2, 3 ou 4 selecionado na etapa anterior, usando exatamente os textos fornecidos.
- Criar uma imagem original com homens adultos e estética clínica premium, coerente com a Stanley’s Care e com foco em cuidado capilar.
- Fazer cada card de grau abrir a página motivacional, preservando também o nome informado.
- Manter acesso direto à página com uma mensagem segura caso nenhum grau tenha sido informado.
- Preservar cabeçalho, logo, cores, fundo e adaptação para celular já usados no quiz.

## Detalhes técnicos
- Transportar `nome` e `grau` pelo estado validado da navegação, sem banco de dados.
- Usar a imagem gerada como arquivo gerenciado do projeto, com texto alternativo.
- Manter o botão “Continuar” pronto visualmente nesta etapa, sem inventar uma próxima pergunta ainda não definida.
- Validar o fluxo completo, os quatro textos e a legibilidade em desktop e celular.
