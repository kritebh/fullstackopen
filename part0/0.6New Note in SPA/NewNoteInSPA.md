```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {"message": "note created"}
    deactivate server
    Note right of browser: Form Data is submitted at /new_note_spa

    Note right of browser: The newly created note pushed in the notes array and can be shown in container
```