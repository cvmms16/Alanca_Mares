# Alanca_Mares — site demonstrativo

Site front-end para a agenda cultural de Palmares-PE.

## Como executar
1. Baixe ou clone o repositório.
2. Abra a pasta no Visual Studio Code.
3. Abra `index.html` no navegador. Também pode usar a extensão Live Server.

## Estrutura
- `index.html`: estrutura das páginas e formulários.
- `css/style.css`: identidade visual e layout responsivo.
- `js/script.js`: busca, filtros, detalhes e cadastro demonstrativo.

## Funcionalidades
- Listagem de eventos;
- Busca por nome, descrição e local;
- Filtro por categoria;
- Visualização dos detalhes;
- Cadastro e exclusão de eventos no navegador.

## Limitações da versão
Esta é uma demonstração front-end. Os eventos de exemplo não representam uma programação oficial confirmada. Os eventos cadastrados são armazenados no `localStorage` do navegador e não são compartilhados entre dispositivos. Para uso real, será necessário integrar um banco de dados e definir quem poderá cadastrar ou moderar eventos.

## Sugestão de fluxo GitHub
- `main`: versão estável;
- `feature/nome-da-funcionalidade`: novas funcionalidades;
- `hotfix/nome-da-correcao`: correções urgentes;
- `release/v1.0.0`: preparação de uma versão.

Use commits pequenos com mensagens como `feat: adiciona filtro por categoria`, `fix: corrige busca de eventos` e `docs: atualiza instruções de execução`.
