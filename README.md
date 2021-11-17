### UiFront
# Notas
- Versão do Angular CLI - 12.2.7 
- Versão do Node - 12.22.6 
- Bootstrap - 4


Esse é um projeto de library UI, responsável por armanezar componentes da aplicação.

## Organização das pastas
Todo componente precisa ser criado dentro de src/component e para cada component precisa seguir o modelo de criação de um arquivo ts,
e no final lembrar de importa-lo no public-api.ts.

public_api -  é o arquivo responsável por indexar todos os componentes criados(outros arquivos).
 

## Gerando um pacote 
Para gerar um pacote, rode na raiz do projeto 
-> npm run build-library (irá buildar no dist uma versão da lib) <-
-> npm run pack-lib  (irá gerar um arquivo zipado com o dist compilado para instalar a lib)

Uma vez que os dois tenham funcionado, ir na pasta dist/ui-out-lib e copiar o caminho do arquivo .tgz criado.
Por exemplo aqui -> /Users/dev.rwt/ui-front/dist/ui-out-lib/ui-out-lib-0.0.3.tgz
no Projeto principal, para rodar npm i path
para instalar a lib gerada


## Running unit tests
Não trabalhamos com testes, no máximo que fazemos é um teste da nossa sexualidade com a finalidade de denegrir,menosprezar ou ofender um coleguinha de trabalho que tenha ou não tendencias a ser homoafetivo.
Não indicamos, nem gostamos de mentos, porém gostamos de coca-cola.


 
