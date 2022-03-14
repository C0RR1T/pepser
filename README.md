# OpenApi Project

...mit Spring Boot und React.

## Ziele

1. Wir lernen den OpenApi-Standard als Beispiel für einen API-Contract besser kennen und wenden ihn auf ein eigenes Beispiel an.
2. Wir schreiben eine kurze technische Spezifikation.
3. Wir generieren Code für ein RESTfull Spring Boot Backend und ein React Frontend und nutzen diesen.

## Skelett

In diesem Beispiel-Ponyhofprojekt sind Java- und React-Sources zusammengelegt.
Es bringt bereits einen Gradle basierten [OpenApi-Generator](https://github.com/OpenAPITools/openapi-generator) mit sich.
Der Task `openapi` erstellt Stubs für Spring Boot und ReactJS (`gradlew openapi` oder im `build.gradle` -> `openapi`).
Der Task muss bei Äderungen an der Spezifikation neu ausgeführt werden.

- Generierte Sourcefiles liegen in `build/generated/openapi-spring` bzw in `src/generated/openapi`
- Nach dem Starten des Spring Boot Servers ist ein SwaggerUI erreichbar unter http://localhost:8080/api/swagger-ui/index.html

## Auftrag

Dies ist eine Gruppenarbeit. Die Aufgabe besteht darin ein Backend in Spring Boot sowie ein Frontend in React zu schreiben. Zu den technischen Anforderungen gehört eine OpenApi Spezifikation (OAS) sowie eine kurze objektorientierte Analyse als Teil einer technischen Spezifikation.

Das Thema darf frei gewählt werden, als Illustrationsbeispiel wird hier ein Ponyhof verwendet. Es gibt folgende minimalen Anforderungen:

1. Es werden mindestens drei voneinander abhängige Objekte modeliert.   
   z.B. eine Ponyhofapplikation mit Ponies, Reiter und einem Futterplan.
2. Ein modeliertes Objekt hat mindestens fünf Attribute.   
   z.B. ein Pony hat Attribute wie ID (Zahl), Name, Farbe (Enum), Geburtstag (Datum), Besitzer (FK auf Reiter)...
3. Es gibt CRUD Operationen für diese Objekte und alle Operationen sind im UI nutzbar.   
   z.B. gibt es im Frontend eine Tabelle aller Ponies, und man kann nach Farbe filtern via `GET /ponies?color=BLACK`.
4. Alle Endpunkte sind durch die OpenApi Spezifikation (v3.0.3) definiert und der generierte Code darf nicht manuell angepasst werden.

Es braucht keine Datenbankanbindung und keine Security.

## Bewertungsrichtlinien

Diese Gruppenarbeit gibt zwei unabhängige Noten für die Module M326 und M226b. Die Arbeit ist als ein einzelnes Git-Repo abzugeben. Diese beinhaltet alle Sourcefiles sowie den technischen Bericht.

### M326 Bewertungskriterien

Es wird hauptsächlich die Qualität der OpenApi Spezifikation und der Dokumentation bewertet. Erwartet wird:

1. Bericht
    1. Der Bericht ist in [AsciiDoc](https://docs.asciidoctor.org/asciidoc/latest/) oder [Markdown](https://commonmark.org/help/) geschrieben. Für Grafiken wird [PlantUML](https://plantuml.com/) empfolen.
    2. Es werden drei Usecases beschrieben incl. Usecasediagramm.
    3. Es gibt eine kurze objektorientierte Analyse und ein Klassendiagramm.
    4. Zu jedem Usecase gibt es mindestens ein Testcase (mit Beschreibung, Vorbedingungen, erwartetem Ergebnis) und einem illustrierenden Sequenzdiagramm.
    5. Es wurden UI Wireframes gezeichnet.
    6. Ein persönliches Fazit.
2. OAS
    1. Die OAS ist valid und lesbar (hat `summarys`, `descriptions` und `examples` usw).
    2. In der OAS werden Objekte widerverwendet (via `$ref`), auch Fehlerfälle werden definiert und sinnvolle HTTP Status Codes verwendet.
    3. Es werden `query`-paremters, `path`-parameters, `arrays`, komplexe Typen usw verwendet.

### M226b Bewertungskriterien

Es wird hauptsächlich die Qualität und der Umfang des Codes bewertet.

1. Spring Boot
    1. Alle Endpunkte sind in Spring Boot implementiert, der Code ist sinnvoll und deckt die Spezifikation ab. Es werden Fehlerfälle behandelt. Neben simplen CRUD Operationen gibt es auch komplexere wie z.B. eine Suche mit Filter und Paging.
    3. Es werden die generieren Interfaces implementiert.
    4. Es gibt sillvolle JUnit-Tests.
2. React
    1. Es wird nur generierter (Typescript) Clientcode für Backendoperationen verwendet.
    2. Alle Operationen/Endpunkte sind via UI erreichbar und sinnvoll. Dies ist der zeitaufwändigste Teil dieser Arbeit.
    3. Es gibt Jest (oder ähnliche) UI-Tests.

### weiterführende Ideen

Weiterführende Ideen:

- Einfache Security und ein Login
- Datenbankanbindung z.B. an eine H2DB
- Automatisch generierte Dokumentation als pdf/html
- erweitertes CI/CD
- custom Styles für das Frontend
