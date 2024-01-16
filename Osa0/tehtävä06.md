sequenceDiagram<br>
    Selain->>+Palvelin: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa<br>
    Note over Selain,Palvelin: Selain lähettää POST-pyynnön palvelimelle osoitteeseen /new_note_spa<br>
    Note over Selain,Palvelin: Pyyntö sisältää uuden muistiinpanon JSON-muodossa<br>
    Note over Selain,Palvelin: Selain ei tee uutta pyyntöä,<br/> vaan uusi muistiipano tulee näkyviin <br/>sivulle selaimeen ladatun JavaScript-koodin avulla