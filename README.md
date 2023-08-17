# Neo4j SSO with drivers

This repository is to demonstrate how to connect to a Neo4j database using driver (currently Nodejs / Python).
More details are available in the blog post: [How to Integrate Neo4j With SSO on Azure — One Login to Rule Them All](https://medium.com/neo4j/how-to-integrate-neo4j-with-sso-on-azure-one-login-to-rule-them-all-3492b41a9aa8)

## NODEJS

```[shell]
cd nodejs
npm i neo4j-driver @azure/msal-node
node index.js
```

## PYTHON

```[shell]
pip install -r python/requirements.txt
python python/main.py params.json
```

# .NET

_WIP_
