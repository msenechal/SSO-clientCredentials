import sys
import json
import base64
import msal
from neo4j import GraphDatabase, bearer_auth

config = json.load(open(sys.argv[1]))

app = msal.ConfidentialClientApplication(
    config["client_id"], authority=config["authority"],
    client_credential=config["secret"],
    )

result = None
result = app.acquire_token_for_client(scopes=config["scope"])

if "access_token" in result:
    print(result['access_token'])
    with GraphDatabase.driver(config["NEO4J_URI"], auth=bearer_auth(result['access_token'])) as driver:
        driver.verify_connectivity()
        records, summary, keys = driver.execute_query(
        "CREATE (p:Person {name:'ServicePrincipal', type:'servicePrincipalSSO', app:'python'}) RETURN p", 
        database_="neo4j",
        )
else:
    print(result.get("error"))
    print(result.get("error_description"))
    print(result.get("correlation_id")) 