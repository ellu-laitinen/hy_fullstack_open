sequenceDiagram<br>
    Selain->>+Palvelin: GET https://studies.cs.helsinki.fi/exampleapp/spa<br>
    Note over Selain,Palvelin: Selain lähettää GET-pyynnön palvelimelle osoitteeseen /spa<br>
    Palvelin-->>-Selain: HTML document<br>
    Selain->>+Palvelin: GET https://studies.cs.helsinki.fi/exampleapp/notes/main.css<br>
    Palvelin-->>-Selain: CSS file<br>
    Selain->>+Palvelin: GET https://studies.cs.helsinki.fi/exampleapp/notes/spa.js<br>
    Palvelin-->>-Selain: JavScript file<br>
    Selain->>+Palvelin: GET https://studies.cs.helsinki.fi/exampleapp/notes/data.json<br>
    Palvelin-->>-Selain:  JSON data<br>
  
  
   