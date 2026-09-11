# Otimização completa do quiz

## Resultado esperado
O quiz ficará mais rápido, consistente e confortável no celular, preservando o visual e todas as respostas já existentes.

## O que será feito
- Ajustar a escala do resultado para nunca aparecer próxima do nível inicial/verde: todos os perfis começarão em **Moderado** e poderão avançar para **Elevado** e **Prioritário**.
- Reduzir o custo das imagens, priorizando apenas o conteúdo visível e carregando as demais sob demanda.
- Melhorar a troca entre páginas com pré-carregamento inteligente, sem alterar a lógica das respostas.
- Padronizar telas, botões, áreas de toque, espaçamentos e alturas para celulares pequenos e grandes.
- Remover esperas e atualizações excessivas nas telas de análise, mantendo a percepção de diagnóstico personalizado.
- Corrigir links internos inconsistentes e garantir navegação limpa pelo histórico.
- Respeitar redução de movimento e evitar animações custosas em dispositivos móveis.

## Validação
- Percorrer o quiz completo em viewport mobile e desktop.
- Conferir ausência de cortes, sobreposições e deslocamentos inesperados.
- Medir carregamento inicial, requisições, estabilidade visual e resposta aos toques.
- Confirmar que todas as respostas continuam chegando corretamente ao resultado e ao recado final.

## Detalhes técnicos
- Aplicar lazy loading, dimensões explícitas e prioridade seletiva nas imagens.
- Ativar preload por intenção na navegação do TanStack Router.
- Consolidar regras compartilhadas somente onde isso reduzir repetição sem mudar o design.
- Otimizar timers para reduzir renderizações e adaptar esperas quando `prefers-reduced-motion` estiver ativo.
