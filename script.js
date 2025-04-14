// České státní svátky 2025
// Lokální databáze svátků pro různé roky
function zakladniSvatky(rok) {
  // Definice svátků pro různé roky
  const svatkyRoky = {
    '2025': [
      '2025-01-01', // Nový rok
      '2025-04-18', // Velký pátek
      '2025-04-21', // Velikonoční pondělí
      '2025-05-01', // Svátek práce
      '2025-05-08', // Den vítězství
      '2025-07-05', // Den slovanských věrozvěstů Cyrila a Metoděje
      '2025-07-06', // Den upálení mistra Jana Husa
      '2025-09-28', // Den české státnosti
      '2025-10-28', // Den vzniku samostatného československého státu
      '2025-11-17', // Den boje za svobodu a demokracii
      '2025-12-24', // Štědrý den
      '2025-12-25', // 1. svátek vánoční
      '2025-12-26'  // 2. svátek vánoční
    ],
    '2026': [
      '2026-01-01', // Nový rok
      '2026-04-03', // Velký pátek
      '2026-04-06', // Velikonoční pondělí
      '2026-05-01', // Svátek práce
      '2026-05-08', // Den vítězství
      '2026-07-05', // Den slovanských věrozvěstů Cyrila a Metoděje
      '2026-07-06', // Den upálení mistra Jana Husa
      '2026-09-28', // Den české státnosti
      '2026-10-28', // Den vzniku samostatného československého státu
      '2026-11-17', // Den boje za svobodu a demokracii
      '2026-12-24', // Štědrý den
      '2026-12-25', // 1. svátek vánoční
      '2026-12-26'  // 2. svátek vánoční
    ]
  };

  // Pokud máme svátky pro požadovaný rok, vrátíme je
  if (svatkyRoky[rok]) {
    return svatkyRoky[rok];
  }
  
  // V opačném případě použijeme algoritmus pro výpočet svátků
  return vypocitejSvatky(rok);
}

// Algoritmus pro výpočet svátků pro roky, které nemáme v databázi
function vypocitejSvatky(rok) {
  const svatky = [];
  
  // Pevné svátky (stejné datum každý rok)
  svatky.push(`${rok}-01-01`); // Nový rok
  svatky.push(`${rok}-05-01`); // Svátek práce
  svatky.push(`${rok}-05-08`); // Den vítězství
  svatky.push(`${rok}-07-05`); // Cyril a Metoděj
  svatky.push(`${rok}-07-06`); // Jan Hus
  svatky.push(`${rok}-09-28`); // Den české státnosti
  svatky.push(`${rok}-10-28`); // Vznik Československa
  svatky.push(`${rok}-11-17`); // Den boje za svobodu a demokracii
  svatky.push(`${rok}-12-24`); // Štědrý den
  svatky.push(`${rok}-12-25`); // 1. svátek vánoční
  svatky.push(`${rok}-12-26`); // 2. svátek vánoční
  
  // Velikonoce - pohyblivý svátek
  const velikonoce = vypocitejVelikonoce(rok);
  const velikonocniPondeli = new Date(velikonoce);
  velikonocniPondeli.setDate(velikonocniPondeli.getDate() + 1);
  
  const velkyPatek = new Date(velikonoce);
  velkyPatek.setDate(velkyPatek.getDate() - 2);
  
  svatky.push(formatujDatum(velkyPatek)); // Velký pátek
  svatky.push(formatujDatum(velikonocniPondeli)); // Velikonoční pondělí
  
  return svatky;
}

// Helper funkce pro výpočet data Velikonoc (Butcherův algoritmus)
function vypocitejVelikonoce(rok) {
  const a = rok % 19;
  const b = Math.floor(rok / 100);
  const c = rok % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mesic = Math.floor((h + l - 7 * m + 114) / 31);
  const den = ((h + l - 7 * m + 114) % 31) + 1;
  
  return new Date(rok, mesic - 1, den);
}

// Helper funkce pro formátování data do YYYY-MM-DD
function formatujDatum(datum) {
  const rok = datum.getFullYear();
  const mesic = String(datum.getMonth() + 1).padStart(2, '0');
  const den = String(datum.getDate()).padStart(2, '0');
  return `${rok}-${mesic}-${den}`;
}

// Názvy měsíců v češtině
const mesiceNazvy = [
    "leden", "únor", "březen", "duben", "květen", "červen",
    "červenec", "srpen", "září", "říjen", "listopad", "prosinec"
];

// Nastavení aktuálního měsíce a roku při načtení stránky a načtení seznamu jmen
window.onload = function() {
    const dnes = new Date();
    document.getElementById('mesic').value = dnes.getMonth() + 1;
    document.getElementById('rok').value = dnes.getFullYear();
    
    // Načíst jména ze souboru
    nacistJmenaZeSouboru();
};

// Objekt pro ukládání dat zaměstnanců (jméno -> číslo zaměstnance)
const zamestnanci = {};

// Funkce pro načtení jmen a čísel zaměstnanců ze souboru Seznam_uzivatelu.txt
function nacistJmenaZeSouboru() {
    fetch('Seznam_uzivatelu.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Soubor se seznamem uživatelů nebyl nalezen');
            }
            return response.text();
        })
        .then(data => {
            // Rozdělení textu na řádky a odstranění prázdných řádků
            const radky = data.split('\n')
                .map(radek => radek.trim())
                .filter(radek => radek.length > 0);
                
            // Získání select elementu
            const selectJmeno = document.getElementById('jmeno');
            
            // Vymazání existujících možností
            selectJmeno.innerHTML = '';
            
            // Přidání výchozí prázdné možnosti
            const prazdnaOption = document.createElement('option');
            prazdnaOption.value = '';
            prazdnaOption.textContent = '-- Vyberte jméno --';
            selectJmeno.appendChild(prazdnaOption);
            
            // Zpracování každého řádku (jméno a číslo zaměstnance)
            radky.forEach(radek => {
                // Předpokládáme, že poslední část řádku oddělená mezerou je číslo zaměstnance
                const casti = radek.split(' ');
                
                // Poslední prvek je číslo zaměstnance
                const cislo = casti.pop();
                
                // Zbytek je jméno a příjmení
                const jmeno = casti.join(' ');
                
                // Uložení do objektu zaměstnanců
                zamestnanci[jmeno] = cislo;
                
                // Vytvoření možnosti pro select
                const option = document.createElement('option');
                option.value = jmeno;
                option.textContent = jmeno;
                selectJmeno.appendChild(option);
            });
            
            // Přidání event listeneru pro změnu jména - automatické doplnění čísla zaměstnance
            selectJmeno.addEventListener('change', function() {
                const vybraneJmeno = this.value;
                const cisloInput = document.getElementById('cislo');
                
                if (vybraneJmeno && zamestnanci[vybraneJmeno]) {
                    cisloInput.value = zamestnanci[vybraneJmeno];
                    // Zamknutí pole čísla zaměstnance, aby ho uživatel nemohl změnit
                    cisloInput.readOnly = true;
                } else {
                    cisloInput.value = '';
                    cisloInput.readOnly = false;
                }
            });
        })
        .catch(error => {
            console.error('Chyba při načítání seznamu jmen:', error);
            
            // V případě chyby zobrazíme v select boxu informaci o chybě
            const selectJmeno = document.getElementById('jmeno');
            selectJmeno.innerHTML = '';
            
            const errorOption = document.createElement('option');
            errorOption.value = '';
            errorOption.textContent = 'Nepodařilo se načíst seznam jmen';
            selectJmeno.appendChild(errorOption);
        });
}

async function generujVykaz() {
    // Získání hodnot z formuláře
    const jmeno = document.getElementById('jmeno').value;
    const funkce = document.getElementById('funkce').value;
    const mesicIndex = parseInt(document.getElementById('mesic').value) - 1;
    const rok = parseInt(document.getElementById('rok').value);
    const cislo = document.getElementById('cislo').value;
    const standardniPrichod = document.getElementById('prichod').value;
    const standardniOdchod = document.getElementById('odchod').value;
    const prestavkaOd = document.getElementById('prestavka-od').value;
    const prestavkaDo = document.getElementById('prestavka-do').value;

    // Kontrola vyplnění všech polí
    if (!jmeno || !funkce || isNaN(mesicIndex) || isNaN(rok) || !cislo) {
        alert('Prosím vyplňte všechny údaje');
        return;
    }

    // Nastavení údajů do výkazu
    document.getElementById('vykaz-jmeno').textContent = jmeno;
    document.getElementById('vykaz-funkce').textContent = funkce;
    document.getElementById('vykaz-mesic').textContent = mesiceNazvy[mesicIndex];
    document.getElementById('vykaz-rok').textContent = rok;
    document.getElementById('vykaz-cislo').textContent = cislo;

    try {
        // Získání svátků pro vybraný rok
        const svatky = await ziskejSvatkyProRok(rok);
        
        // Vygenerování tabulky s dynamickým seznamem svátků
        generujTabulku(mesicIndex, rok, standardniPrichod, standardniOdchod, prestavkaOd, prestavkaDo, svatky);
        
        // Zobrazení výkazu
        document.getElementById('vykaz-container').style.display = 'block';
        
        // Přidání tlačítka pro manuální přepočet
        pridejTlacitkoPreepocet();
    } catch (error) {
        console.error('Chyba při generování výkazu:', error);
        alert('Nastala chyba při generování výkazu. Zkuste to prosím znovu.');
    }
}

function generujTabulku(mesicIndex, rok, standardniPrichod, standardniOdchod, prestavkaOd, prestavkaDo, svatky) {
    const tbody = document.getElementById('tabulka-body');
    tbody.innerHTML = '';

    // Zjištění počtu dní v měsíci
    const pocetDni = new Date(rok, mesicIndex + 1, 0).getDate();
    
    let celkemHodin = 0;
    let svatkyHodiny = 0;

    // Pokud seznam svátků není definován, použijeme základní svátky
    const aktivniSvatky = svatky || zakladniSvatky(rok);

    // Generování řádků pro každý den v měsíci
    for (let den = 1; den <= pocetDni; den++) {
        const datum = new Date(rok, mesicIndex, den);
        const denVTydnu = datum.getDay(); // 0 = neděle, 1 = pondělí, ..., 6 = sobota
        
        const tr = document.createElement('tr');
        tr.dataset.den = den;
        
        // Kontrola, jestli je den víkend nebo svátek
        const jeVikend = denVTydnu === 0 || denVTydnu === 6;
        const datumString = `${rok}-${String(mesicIndex + 1).padStart(2, '0')}-${String(den).padStart(2, '0')}`;
        
        // Použití dynamického seznamu svátků místo natvrdo definovaného seznamu svatky2025
        const jeSvatek = aktivniSvatky.includes(datumString);
        
        if (jeVikend) {
            tr.classList.add('weekend');
        }
        if (jeSvatek) {
            tr.classList.add('holiday');
            // Počítání svátků (pokud není víkend)
            if (!jeVikend) {
                svatkyHodiny += 8;
            }
        }
        
        // Datum
        const tdDatum = document.createElement('td');
        tdDatum.textContent = den;
        tr.appendChild(tdDatum);
        
        // Směny - rozevírací seznam
        const tdSmeny = document.createElement('td');
        tdSmeny.className = 'input-cell';
        
        const selectSmeny = document.createElement('select');
        selectSmeny.dataset.den = den;
        
        // Přidání prázdné výchozí možnosti
        const prazdnaOption = document.createElement('option');
        prazdnaOption.value = "";
        prazdnaOption.textContent = "-- Vyberte --";
        selectSmeny.appendChild(prazdnaOption);
        
        // Přidání možností
        const moznosti = [
            "dovolená",
            "služba",
            "pracovní volno",
            "pracovní klid",
            "neplacené volno (absence)"
        ];
        
        moznosti.forEach(moznost => {
            const option = document.createElement('option');
            option.value = moznost;
            option.textContent = moznost;
            selectSmeny.appendChild(option);
        });
        
        // Přidání event listeneru pro výpočet dovolené
        selectSmeny.addEventListener('change', function() {
            aktualizujSoucty();
        });
        
        tdSmeny.appendChild(selectSmeny);
        tr.appendChild(tdSmeny);
        
        // Hodiny - editovatelné pole pro hodiny
        const tdHodiny = document.createElement('td');
        tdHodiny.className = 'input-cell';
        
        if (!jeVikend && !jeSvatek) {
            const inputHodiny = document.createElement('input');
            inputHodiny.type = 'number';
            inputHodiny.min = '0';
            inputHodiny.max = '24';
            inputHodiny.step = '0.5';
            inputHodiny.value = '8';
            inputHodiny.className = 'hodiny-input';
            inputHodiny.style.width = '100%';
            
            // Přidat event listener pro přepočet při změně hodin
            inputHodiny.addEventListener('input', function() {
                aktualizujCelkoveHodiny();
            });
            
            // Přidat také listener pro change událost pro případ změny šipkami nebo jiným způsobem
            inputHodiny.addEventListener('change', function() {
                aktualizujCelkoveHodiny();
            });
            
            tdHodiny.appendChild(inputHodiny);
            celkemHodin += 8;
        }
        tr.appendChild(tdHodiny);
        
        // Příchod - také editovatelný
        const tdPrichod = document.createElement('td');
        tdPrichod.className = 'input-cell';
        if (!jeVikend && !jeSvatek) {
            const inputPrichod = document.createElement('input');
            inputPrichod.type = 'time';
            inputPrichod.value = standardniPrichod;
            inputPrichod.style.width = '100%';
            tdPrichod.appendChild(inputPrichod);
        }
        tr.appendChild(tdPrichod);
        
        // Odchod - editovatelný
        const tdOdchod = document.createElement('td');
        tdOdchod.className = 'input-cell';
        if (!jeVikend && !jeSvatek) {
            const inputOdchod = document.createElement('input');
            inputOdchod.type = 'time';
            inputOdchod.value = standardniOdchod;
            inputOdchod.style.width = '100%';
            tdOdchod.appendChild(inputOdchod);
        }
        tr.appendChild(tdOdchod);
        
        // Přerušení - odchod
        const tdPreruseniOdchod = document.createElement('td');
        tdPreruseniOdchod.className = 'input-cell';
        if (!jeVikend && !jeSvatek) {
            const inputPreruseniOd = document.createElement('input');
            inputPreruseniOd.type = 'time';
            inputPreruseniOd.value = prestavkaOd;
            inputPreruseniOd.style.width = '100%';
            tdPreruseniOdchod.appendChild(inputPreruseniOd);
        }
        tr.appendChild(tdPreruseniOdchod);
        
        // Přerušení - příchod
        const tdPreruseniPrichod = document.createElement('td');
        tdPreruseniPrichod.className = 'input-cell';
        if (!jeVikend && !jeSvatek) {
            const inputPreruseniDo = document.createElement('input');
            inputPreruseniDo.type = 'time';
            inputPreruseniDo.value = prestavkaDo;
            inputPreruseniDo.style.width = '100%';
            tdPreruseniPrichod.appendChild(inputPreruseniDo);
        }
        tr.appendChild(tdPreruseniPrichod);
        
        // Poznámka - nová buňka pro zadání poznámky
        const tdPoznamka = document.createElement('td');
        tdPoznamka.className = 'input-cell';
        const inputPoznamka = document.createElement('input');
        inputPoznamka.type = 'text';
        inputPoznamka.placeholder = 'Poznámka';
        inputPoznamka.style.width = '100%';
        tdPoznamka.appendChild(inputPoznamka);
        tr.appendChild(tdPoznamka);
        
        tbody.appendChild(tr);
    }
    
    // Aktualizace celkových součtů
    document.getElementById('celkem-hodin').textContent = celkemHodin;
    document.getElementById('celkem-sv').textContent = svatkyHodiny;
    
    // Aktualizace celkové výplaty (hodiny + svátky - dovolené budou přidány později)
    const celkemVyplata = celkemHodin + svatkyHodiny;
    document.getElementById('celkem-vyplata').textContent = celkemVyplata;
}

// Funkce pro aktualizaci součtů dovolené
function aktualizujSoucty() {
    let dovolenaHodiny = 0;
    let pracovniVolnoHodiny = 0;
    let sluzbyHodiny = 0;
    let neplVolnoHodiny = 0;
    let pracovniKlidHodiny = 0;
    
    // Projít všechny selecty směn
    const vsechnySmenySelecty = document.querySelectorAll('#tabulka-body .input-cell select[data-den]');
    
    vsechnySmenySelecty.forEach(function(select) {
        const hodnota = select.value;
        
        // Najít odpovídající řádek
        const radek = select.closest('tr');
        
        // Získat hodnotu hodin (pokud je v inputu)
        const hodinyInput = radek.querySelector('.hodiny-input');
        const hodinyValue = hodinyInput ? parseFloat(hodinyInput.value) || 8 : 8;
        
        // Kontrola, zda řádek není víkend nebo svátek
        if (!radek.classList.contains('weekend') && !radek.classList.contains('holiday')) {
            // Přičíst hodiny podle typu směny
            switch(hodnota) {
                case 'dovolená':
                    dovolenaHodiny += hodinyValue;
                    break;
                case 'služba':
                    sluzbyHodiny += hodinyValue;
                    break;
                case 'pracovní volno':
                    pracovniVolnoHodiny += hodinyValue;
                    break;
                case 'neplacené volno (absence)':
                    neplVolnoHodiny += hodinyValue;
                    break;
                case 'pracovní klid':
                    pracovniKlidHodiny += hodinyValue;
                    break;
            }
            
            // Změna barvy nebo stylu buněk v řádku pro vizuální odlišení
            const bunky = radek.querySelectorAll('td:not(.input-cell)');
            if (hodnota === 'dovolená' || hodnota === 'pracovní volno' || hodnota === 'pracovní klid' || hodnota === 'neplacené volno (absence)') {
                bunky.forEach(function(bunka) {
                    bunka.style.color = '#777';
                    bunka.style.fontStyle = 'italic';
                });
            } else {
                // Vrácení původního stylu
                bunky.forEach(function(bunka) {
                    bunka.style.color = '';
                    bunka.style.fontStyle = '';
                });
            }
        }
    });
    
    // Aktualizace počtů v HTML
    document.getElementById('celkem-d').textContent = dovolenaHodiny.toFixed(1);
    document.getElementById('celkem-sv').textContent = svatkyHodiny; // Tato proměnná by měla být definována jinde
    document.getElementById('celkem-pv').textContent = pracovniVolnoHodiny.toFixed(1);
    document.getElementById('celkem-nu').textContent = sluzbyHodiny.toFixed(1);
    document.getElementById('celkem-nva').textContent = neplVolnoHodiny.toFixed(1);
    document.getElementById('celkem-pk').textContent = pracovniKlidHodiny.toFixed(1);
    
    // Aktualizace celkových hodin a výplaty
    aktualizujCelkoveHodiny();
}

function tiskVykazu() {
    window.print();
}

// Funkce pro získání svátků pro zadaný rok
async function ziskejSvatkyProRok(rok) {
  // Nejprve zkontrolujeme, zda už máme svátky v localStorage
  const cachedSvatky = localStorage.getItem(`svatky_${rok}`);
  if (cachedSvatky) {
    return JSON.parse(cachedSvatky);
  }
  
  try {
    // Pokud nemáme v cache, zkusíme načíst z Google Calendar API
    const svatky = await nactiSvatkyZGoogleCalendar(rok);
    
    // Uložení do cache pro příště
    localStorage.setItem(`svatky_${rok}`, JSON.stringify(svatky));
    
    return svatky;
  } catch (error) {
    console.warn('Nepodařilo se načíst svátky z API:', error);
    
    // Pokud API selže, použijeme lokální data
    const lokalniSvatky = zakladniSvatky(rok);
    
    // Uložení do cache pro příště
    localStorage.setItem(`svatky_${rok}`, JSON.stringify(lokalniSvatky));
    
    return lokalniSvatky;
  }
}

// Funkce pro načítání svátků z Google Calendar API
async function nactiSvatkyZGoogleCalendar(rok) {
  // Pro testovací účely použijeme raději zakladniSvatky - nahraďte později skutečným API klíčem
  const API_KEY = ''; // Váš Google API klíč - zatím prázdný
  const CALENDAR_ID = 'cs.czech#holiday@group.v.calendar.google.com'; // ID pro český kalendář svátků
  
  // Pokud nemáme API klíč, použijeme místní data
  if (!API_KEY) {
    console.log('Google Calendar API klíč není nastaven, používám lokální data');
    return zakladniSvatky(rok);
  }
  
  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?` +
      `key=${API_KEY}&timeMin=${rok}-01-01T00:00:00Z&timeMax=${rok}-12-31T23:59:59Z`
    );
    
    if (!response.ok) {
      throw new Error('Nepodařilo se načíst data z Google Calendar');
    }
    
    const data = await response.json();
    return data.items.map(item => {
      // Získat datum ve formátu YYYY-MM-DD z Google Calendar API
      return item.start.date;
    });
  } catch (error) {
    console.error('Chyba při načítání svátků z Google Calendar:', error);
    // V případě chyby použijeme lokální data
    return zakladniSvatky(rok);
  }
}

// Přidejte testovací funkci
async function testApi() {
  try {
    const rok = 2026;
    console.log("Testování API pro svátky roku", rok);
    const svatky = await nactiSvatkyZGoogleCalendar(rok);
    console.log("API vrátilo svátky:", svatky);
    
    // Kontrola, zda API vrátilo očekávané svátky
    if (!svatky || svatky.length < 10) {
      console.warn("API vrátilo neplatný počet svátků, pravděpodobně nefunguje správně");
    }
  } catch (error) {
    console.error("Test API selhal:", error);
  }
}

// Spusťte test při načtení stránky
window.addEventListener('DOMContentLoaded', function() {
  // Odkomentujte následující řádek pro otestování API
  // testApi();
});

// Export funkcí pro testování
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    mesiceNazvy,
    zakladniSvatky,
    vypocitejSvatky,
    vypocitejVelikonoce,
    formatujDatum,
    zamestnanci,
    nacistJmenaZeSouboru,
    generujVykaz,
    generujTabulku,
    aktualizujSoucty,
    aktualizujCelkoveHodiny,
    prepocitejHodinyDle,
    casNaMinuty,
    tiskVykazu,
    ziskejSvatkyProRok,
    nactiSvatkyZGoogleCalendar
  };
}

// Opravená funkce aktualizujCelkoveHodiny
function aktualizujCelkoveHodiny() {
    // Získání všech vstupů pro hodiny
    const vsechnyHodinyInputy = document.querySelectorAll('#tabulka-body .hodiny-input');
    
    let celkemHodin = 0;
    
    // Sečtení hodnot ze všech inputů
    vsechnyHodinyInputy.forEach(function(input) {
        // Převést na číslo a přidat k součtu
        const hodinyValue = parseFloat(input.value) || 0;
        celkemHodin += hodinyValue;
        console.log(`Hodnota v input: ${input.value}, převedeno na číslo: ${hodinyValue}, průběžný součet: ${celkemHodin}`);
    });
    
    // Aktualizace zobrazeného součtu hodin (zaokrouhleno na 1 desetinné místo)
    document.getElementById('celkem-hodin').textContent = celkemHodin.toFixed(1);
    console.log(`Celkový součet hodin: ${celkemHodin.toFixed(1)}`);
    
    // Aktualizace celkové výplaty
    const svatkyHodiny = parseFloat(document.getElementById('celkem-sv').textContent) || 0;
    const dovolenaHodiny = parseFloat(document.getElementById('celkem-d').textContent) || 0;
    const celkemVyplata = celkemHodin + svatkyHodiny + dovolenaHodiny;
    document.getElementById('celkem-vyplata').textContent = celkemVyplata.toFixed(1);
    console.log(`Celková výplata: ${celkemVyplata.toFixed(1)}`);
}

// Nová funkce pro kompletní přepočítání všech hodnot
function prepocitejVsechnyHodnoty() {
    console.log("Přepočítávám všechny hodnoty...");
    
    // Nejprve aktualizujeme součty směn (dovolené, volno, služby atd.)
    aktualizujSoucty();
    
    // Pak aktualizujeme celkové hodiny
    aktualizujCelkoveHodiny();
    
    console.log("Přepočítání dokončeno.");
}

// Přidání tlačítka pro manuální přepočet (pro případ problémů)
function pridejTlacitkoPreepocet() {
    const vykazContainer = document.getElementById('vykaz-container');
    const tiskButton = document.querySelector('#vykaz-container button');
    
    if (vykazContainer && tiskButton) {
        const prepocetButton = document.createElement('button');
        prepocetButton.textContent = "Přepočítat hodnoty";
        prepocetButton.style.marginRight = "10px";
        prepocetButton.addEventListener('click', prepocitejVsechnyHodnoty);
        
        vykazContainer.insertBefore(prepocetButton, tiskButton);
    }
}