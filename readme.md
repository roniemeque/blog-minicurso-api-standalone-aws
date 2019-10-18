## Necessário configurar environment!

Criar uma arquivo env.yml na raiz. Ex:

```
dev:
  MONGODB_URI: mongodb+srv://admin:<password>@blog-cluster-bqpyn.mongodb.net/test?retryWrites=true&w=majority
  MONGODB_DBNAME: blog
```

## Configurar CLI Serverless

https://serverless.com/framework/docs/getting-started/

## Rodando localmente

Com a CLI do Serverless configurada, rodar:
`serverless offline`
Obs: a habilidade de rodar offline vem do plugin serverless-offline que está incluido no projeto, projetos novos não tem esse suporte nativo!
Para configurar o serverless-offline em projetos novos é só adicionar como dependência no package.json e adicionar na listagem de plugins d arquivo serverless.yml (criar item se nao existir)

## Fazendo deploy

Configurar conta AWS e vincular na CLI do Serverless:
https://serverless.com/framework/docs/providers/aws/guide/credentials/

Executar `serverless deploy`
