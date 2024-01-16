Osa0 Tehtävä 0.4<br> 

sequenceDiagram<br> 
    Selain->>+Palvelin: POST https://studies.cs.helsinki.fi/exampleapp/new_note<br> 
    Note over Selain,Palvelin: Selain lähettää POST-pyynnön palvelimelle osoitteeseen /new_note<br> 
    Selain->>+Palvelin: GET https://studies.cs.helsinki.fi/exampleapp/notes<br> 
    Note over Selain,Palvelin: Palvelin ohjaa selaimen tekemään uuden GET-pyynnön endpointiin /notes<br> 
    Note over Selain,Palvelin: Sivu ladataan uudestaan<br> 
    Palvelin-->>-Selain: HTML document<br> 
    Selain->>+Palvelin: GET https://studies.cs.helsinki.fi/exampleapp/notes/main.css<br> 
    Palvelin-->>-Selain: CSS file<br> 
    Selain->>+Palvelin: GET https://studies.cs.helsinki.fi/exampleapp/notes/main.js<br> 
    Palvelin-->>-Selain: JavScript file<br> 
    Selain->>+Palvelin: GET https://studies.cs.helsinki.fi/exampleapp/notes/data.json<br> 
    Note over Selain,Palvelin: JSON-data sisältää nyt äsken lisätyn uuden muistiinpanon<br> 
    Palvelin-->>-Selain:  JSON data<br> 