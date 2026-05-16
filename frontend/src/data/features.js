const features = [
    {
        id: 1,
        title: "Autentisering",
        status: "done",
        detaljer:
            "Applikasjonen har et komplett autentiseringssystem hvor brukere kan registrere seg, logge inn og få tilgang til sin egen brukerdata gjennom en beskyttet session. Systemet håndterer identitet på en sikker måte og sørger for at kun autentiserte brukere får tilgang til relevante deler av applikasjonen."
    },
    {
        id: 2,
        title: "Bruker system",
        status: "done",
        detaljer:
            "Brukere kan administrere sin egen profil ved å oppdatere informasjon og laste opp eller fjerne profilbilde (kun behandlere har profilbilde). Systemet gjør det mulig for administrator rollen å hente ut lister over behandlere og pasienter, avhengig av rolle, og gir dermed en strukturert oversikt over brukerne i system."
    },
    {
        id: 3,
        title: "Booking system",
        status: "done",
        detaljer:
            "Kjernen i applikasjonen er et fleksibelt bookingsystem hvor pasienter kan se tilgjengelige timer, booke avtaler og avlyse ved behov. Behandlere kan opprette nye timer, endre eksisterende avtaler og administrere sine egne tilgjengelige tider. Systemet sørger for at alle operasjoner er synkronisert og reflekterer oppdatert tilgjengelighet til enhver tid."
    },
    {
        id: 4,
        title: "Behandler-visning",
        status: "done",
        detaljer:
            "Brukere kan utforske tilgjengelige behandlere og se hvilke tider som er ledige for hver enkelt. Dette gir en intuitiv måte å navigere i tilbudet på og gjør det enkelt å finne og booke riktig behandler basert på tilgjengelighet."
    },
    {
        id: 5,
        title: "Tilganger og sikkerhet",
        status: "done",
        detaljer:
            "Applikasjonen implementerer rollebasert tilgangskontroll som sikrer at brukere kun får tilgang til funksjoner som er relevante for deres rolle. Middleware håndterer autentisering, validering og autorisering, og beskytter sensitive operasjoner mot uautorisert bruk."
    },
    {
        id: 6,
        title: "Klinikker",
        status: "done",
        detaljer:
            "Nå er det mulig for behandlere å opprette klinikker (behandlingssteder) og styre hvilke behandlere som jobber ved klinikken. Behandlere kan ikke opprette en time på klinikken før de er lagt til. Tanken er at kun brukere med rollen Admin skal kunne redigere klinikker og behandlere, men åpner for at alle behandlere har rettigheter til dette for enklere testing."
    },
    {
        id: 7,
        title: "Kart og veibeskrivelse",
        status: "done",
        detaljer:
            "Nå er det mulig for behandler å legge til lokasjon med kart og veibeskrivelse som følger timen som opprettes. Det er også lagt til autocomplete i søkefelt for adresser."
    },
    {
        id: 8,
        title: "Push varslinger",
        status: "done",
        detaljer:
            "Nå kan behandlere aktivere push varslinger inne på brukerprofilen. Fungerer både på PWA versjon av appen for IOS og Android. Behandler varsles når en pasient booker eller avlyser en time. Varselet kommer med informasjon om pasient navn og timens dato/klokkeslett."
    },
    {
        id: 9,
        title: "Epost time bekreftelse",
        status: "ongoing",
        detaljer:
            "Brukere vil få bekreftelse på mail når man booker eller avlyser en time samt en påminnelses mail 24 timer før timen."
    },
    {
        id: 10,
        title: "AI assistanse",
        status: "ongoing",
        detaljer:
            "Pasienter vil få mulighet til å få hjelp av kunstig intelligens inne i appen for å raskt velge riktig behandler, lokasjon (klinikk) og time (dato og klokkeslett) ved hjelp av AI prompt."
    },
    {
        id: 11,
        title: "Behandler rating",
        status: "planned",
        detaljer:
            "Brukere kan gi stjernerating til behandlere basert på sin opplevelse etter gjennomført time med status gjennomført. Dette gir et enkelt og oversiktlig grunnlag for å vurdere kvalitet og erfaring før booking."
    },
    {
        id: 12,
        title: "Admin side",
        status: "planned",
        detaljer:
            "Egen side for brukere med admin tilgang. Her kan de administrere brukere, timer, klinikker og få full oversikt over appens innhold. En komplett søkefunksjon som henter og administrerer backend data."
    }
];

export default features;