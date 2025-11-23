<h1>🌱 EcoWork – Aplicativo Mobile</h1>
<h3>Global Solution – FIAP 2025 • Development Mobile</h3>

---

## Visão Geral

O **EcoWork Mobile** é o aplicativo complementar da plataforma EcoWork — um ecossistema corporativo de sustentabilidade voltado para incentivar ações ecologicamente corretas entre colaboradores de empresas.

O app fornece aos colaboradores:

- Registro simples e rápido de consumos sustentáveis  
- Dashboard com metas da empresa e últimos registros  
- Ranking de colaboradores  
- Assistente inteligente para dicas ecológicas  
- Autenticação JWT integrada à API Java  
- Tela de introdução e apresentação da solução  

Todas as funcionalidades do app estão integradas diretamente à **API Java Spring Boot** desenvolvida no projeto da disciplina de Java Advanced.

---

## Deploy da Aplicação

### **🔗 Firebase App Distribution**
O app foi publicado utilizando o Firebase App Distribution, conforme exigido pela sprint:

[[Firebase App Distribution](https://appdistribution.firebase.google.com/testerapps/1:12522275666:android:1b22da7fdaf2f9ddf0708b/releases/41cbl2kgoa10o?utm_source=firebase-console)]

O professor avaliador foi adicionado como testador:  
 *proffernando.abreu@fiap.com.br*

---

## Arquitetura da Solução

### **Mobile (React Native + Expo)**
- Navegação com **React Navigation**
- Consumo da API via **Axios**
- Armazenamento seguro com **AsyncStorage**
- Autenticação com **JWT**
- Estilização com **StyleSheet**
- Tela inicial ("Home") redirecionando pós-login

### **Back-end (Java Spring Boot)**
A API Java fornece todos os dados consumidos pelo aplicativo.  
Endereços usados no app:

| Tela | Endpoint |
|------|----------|
| Login | `POST /api/auth/login` |
| Dashboard | `GET /api/consumos/usuario/{id}` |
| Dashboard | `GET /api/metas/empresa/{id}` |
| Ranking | `GET /api/ranking/global` |
| Ranking empresa | `GET /api/ranking/empresa/{empresaId}` |
| Registrar Consumo | `POST /api/consumos` |
| Listar Consumos | `GET /api/consumos/usuario/{id}` |

---

## Funcionalidades do App

### **1. Tela de Login e Registro**
- Autenticação via JWT
- Validação de credenciais
- Armazenamento local do token

### **2. Home — Introdução**
- Explica objetivos e funcionamento do EcoWork
- Mostra propósito e como navegar no app

### **3. Dashboard**
- Nome do usuário e empresa
- Últimos consumos registrados
- Metas da empresa

### **4. Registro de Consumo**
- Tipos: energia, água, transporte, papel, etc.
- Campos dinâmicos
- Envio direto para a API

### **5. Ranking**
- Ranking global
- Ranking por empresa
- Mostra pontos, posição, nome e empresa

### **6. EcoAssist (IA)**
- Assistente com dicas ecológicas
- Baseado no conceito educativo da plataforma

### **7. Tela “Sobre o App”**
- Exibe o hash do commit de referência
- Exigência obrigatória da sprint

---

## Tecnologias Utilizadas

### **Front-end Mobile**
- React Native
- Expo
- TypeScript
- React Navigation
- Axios
- AsyncStorage

### **Back-end**
- Java 21
- Spring Boot 3
- Spring Security + JWT
- PostgreSQL
- JPA/Hibernate
- Maven

### **Distribuição**
- Firebase App Distribution
- Expo EAS Build

---

## Fluxo de Autenticação (Login & Proteção de Rotas)

O EcoWork Mobile utiliza **autenticação JWT integrada com a API Java**, garantindo que apenas usuários autorizados possam acessar as telas internas.

### Login
O usuário informa **e-mail e senha** na tela inicial.  
O app envia a requisição:

```
POST /api/auth/login
```

Se as credenciais forem válidas, a API retorna um **token JWT**, que é salvo localmente via:

- `AsyncStorage`
- Configuração automática do Axios (`Authorization: Bearer <token>`)

Após salvar o token e os dados do usuário, o app redireciona automaticamente para a **Home**.

---

### Proteção de Rotas
Todo o fluxo de navegação é protegido pelo `AuthContext`.

Sempre que o app inicia:

1. Ele tenta carregar o token salvo.
2. Se o token **não existir** ou **for inválido**, o usuário é redirecionado automaticamente para a tela de **Login**.
3. Se o token existir, a sessão é restaurada e o app abre direto na **Home**.

Isso também impede que qualquer tela interna seja acessada sem autenticação.

---

### Tentativa de acessar áreas protegidas sem token
Caso o usuário tente:

- abrir o aplicativo sem token  
- ou se o token tiver expirado  
- ou se tentar navegar manualmente para uma rota protegida  

O app **bloqueia o acesso** e força o retorno ao Login.

Em caso de resposta `401 Unauthorized` da API:

- a sessão é automaticamente limpa  
- o usuário é desconectado  
- e a navegação volta para o Login

---

### Logout
Ao fazer logout:

- Token é removido do AsyncStorage  
- Usuário é removido do contexto  
- Header Authorization do Axios é apagado  
- Navegação volta para o Login

Isso garante segurança total e evita qualquer acesso indevido às telas internas.

---

### Fluxo resumido
```
Login -> Salva Token -> Abre Home
Sem Token -> Redireciona para Login
Token Válido -> Permite navegação
Token Inválido -> Logout automático -> Login
```

Esse fluxo cumpre todos os requisitos da disciplina e garante **segurança, consistência e rastreabilidade** entre backend e mobile.


---

## Como Executar o App Localmente

```sh
npm install
npx expo start
```

- Use **Expo Go** para testar no celular  
- Ou use emulador Android  

---

## Como Executar a API Java

```sh
mvn clean package
mvn spring-boot:run
```

Certifique-se de configurar corretamente:
- PostgreSQL
- application.properties
- Variáveis de ambiente

---

## Conclusão

O projeto EcoWork Mobile entrega uma solução completa para incentivar práticas sustentáveis nas empresas, integrando:

- API robusta em Java  
- Aplicativo mobile intuitivo  
- Gamificação (ranking + metas)  
- Distribuição profissional via Firebase  

A solução atende **100% dos requisitos** especificados pela sprint.

---

## Apresentação e Demonstração Técnica 

🔗 *Link para o vídeo:* [[vídeo](https://youtu.be/jHjOrSd5dcE)]

---

## Equipe de Desenvolvimento

| Nome                                | RM       | GitHub                                |
|-------------------------------------|----------|----------------------------------------|
| **Murilo Ribeiro Santos**           | RM555109 | [@murilors27](https://github.com/murilors27) |
| **Thiago Garcia Tonato**            | RM99404  | [@thiago-tonato](https://github.com/thiago-tonato) |
| **Ian Madeira Gonçalves da Silva**  | RM555502 | [@IanMadeira](https://github.com/IanMadeira) |

**Curso:** Análise e Desenvolvimento de Sistemas  
**Instituição:** FIAP — Faculdade de Informática e Administração Paulista  
**Ano:** 2025
