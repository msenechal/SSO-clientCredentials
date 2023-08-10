var msal = require('@azure/msal-node');
var neo4j = require('neo4j-driver')

const config = require(`../params.json`);

function getClientCredentialsToken(cca, clientCredentialRequestScopes) {
    const clientCredentialRequest = {
        scopes: config.scope,
        azureRegion: null,
        skipCache: true,
    };

    return cca
        .acquireTokenByClientCredential(clientCredentialRequest)
        .then(async (response) => {
             var driver = neo4j.driver(config.NEO4J_URI, neo4j.auth.bearer(response.accessToken))
             var session = driver.session({
                database: 'neo4j',
                defaultAccessMode: neo4j.session.WRITE
              })

              try {
                const result = await session.executeWrite(async tx => {
                  return await tx.run(`
                  CREATE (p:Person {name:'ServicePrincipal', type:'servicePrincipalSSO', app:'nodejs'}) RETURN p.name as name
                    `, {}
                  )
                })
              } finally {
                session.close()
                driver.close()
              }

        }).catch((error) => {
            console.log("error");
             console.log(JSON.stringify(error));
        });
}

const clientConfig = {
    auth: config.authOptions
};

const confidentialClientApplication = new msal.ConfidentialClientApplication(clientConfig);
const t = getClientCredentialsToken(confidentialClientApplication);

module.exports = getClientCredentialsToken;