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
    ],
    '2027': [
      '2027-01-01', // Nový rok
      '2027-03-26', // Velký pátek
      '2027-03-29', // Velikonoční pondělí
      '2027-05-01', // Svátek práce
      '2027-05-08', // Den vítězství
      '2027-07-05', // Den slovanských věrozvěstů Cyrila a Metoděje
      '2027-07-06', // Den upálení mistra Jana Husa
      '2027-09-28', // Den české státnosti
      '2027-10-28', // Den vzniku samostatného československého státu
      '2027-11-17', // Den boje za svobodu a demokracii
      '2027-12-24', // Štědrý den
      '2027-12-25', // 1. svátek vánoční
      '2027-12-26'  // 2. svátek vánoční
    ],
    '2028': [
      '2028-01-01', // Nový rok
      '2028-04-14', // Velký pátek
      '2028-04-17', // Velikonoční pondělí
      '2028-05-01', // Svátek práce
      '2028-05-08', // Den vítězství
      '2028-07-05', // Den slovanských věrozvěstů Cyrila a Metoděje
      '2028-07-06', // Den upálení mistra Jana Husa
      '2028-09-28', // Den české státnosti
      '2028-10-28', // Den vzniku samostatného československého státu
      '2028-11-17', // Den boje za svobodu a demokracii
      '2028-12-24', // Štědrý den
      '2028-12-25', // 1. svátek vánoční
      '2028-12-26'  // 2. svátek vánoční
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
    // Výpočet předchozího měsíce (aktuální měsíc - 1)
    let predchoziMesic = dnes.getMonth(); // getMonth() vrací 0-11, kde 0 je leden
    let aktualniRok = dnes.getFullYear();
    
    // Pokud je aktuálně leden (měsíc 0), přejdeme na prosinec předchozího roku
    if (predchoziMesic === 0) {
        predchoziMesic = 12; // prosinec
        aktualniRok--; // předchozí rok
    }
    
    // Nastavení hodnot do formuláře
    document.getElementById('mesic').value = predchoziMesic;
    document.getElementById('rok').value = aktualniRok;
    
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
    
    // Výpočet standardních hodin podle zadaných časů v hlavičce
    const standardniHodiny = prepocitejHodinyDle(standardniPrichod, standardniOdchod, prestavkaOd, prestavkaDo);
    
    // Pro svátky a dovolenou používáme pevnou hodnotu 8 hodin
    const pevneHodiny = 8;
    
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
        
        // Použití dynamického seznamu svátků
        const jeSvatek = aktivniSvatky.includes(datumString);
        
        if (jeVikend) {
            tr.classList.add('weekend');
        }
        if (jeSvatek) {
            tr.classList.add('holiday');
            // Počítání svátků (pokud není víkend) - pevných 8 hodin
            if (!jeVikend) {
                svatkyHodiny += pevneHodiny; // Použijeme pevně stanovených 8 hodin pro svátky
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
        prazdnaOption.textContent = ""; // Prázdný text místo "-- Vyberte --"
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
            inputHodiny.value = standardniHodiny.toFixed(1); // Pro běžné dny používáme vypočítané hodiny
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
            celkemHodin += standardniHodiny;
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
            inputPrichod.addEventListener('change', function() {
                // Přepočítat odpracované hodiny
                const radek = tdPrichod.closest('tr');
                const odpracovaneHodiny = vypocitejPracovniDobu(radek);
                
                // Aktualizovat hodnotu v input poli s hodinami
                const hodinyInput = radek.querySelector('.hodiny-input');
                if (hodinyInput) {
                    hodinyInput.value = odpracovaneHodiny.toFixed(1);
                }
                
                // Aktualizovat celkové součty
                aktualizujCelkoveHodiny();
            });
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
            inputOdchod.addEventListener('change', function() {
                // Přepočítat odpracované hodiny
                const radek = tdOdchod.closest('tr');
                const odpracovaneHodiny = vypocitejPracovniDobu(radek);
                
                // Aktualizovat hodnotu v input poli s hodinami
                const hodinyInput = radek.querySelector('.hodiny-input');
                if (hodinyInput) {
                    hodinyInput.value = odpracovaneHodiny.toFixed(1);
                }
                
                // Aktualizovat celkové součty
                aktualizujCelkoveHodiny();
            });
            tdOdchod.appendChild(inputOdchod);
        }
        tr.appendChild(tdOdchod);
        
        // Přerušení - odchod
        const tdPreruseniOdchod = document.createElement('td');
        tdPreruseniOdchod.className = 'input-cell';
        if (!jeVikend && !jeSvatek) {
            // Pro přerušení - odchod
            const inputPreruseniOd = document.createElement('input');
            inputPreruseniOd.type = 'time';
            inputPreruseniOd.value = prestavkaOd;
            inputPreruseniOd.style.width = '100%';
            inputPreruseniOd.addEventListener('change', function() {
                aktualizujCelkoveHodiny();
            });
            tdPreruseniOdchod.appendChild(inputPreruseniOd);
        }
        tr.appendChild(tdPreruseniOdchod);
        
        // Přerušení - příchod
        const tdPreruseniPrichod = document.createElement('td');
        tdPreruseniPrichod.className = 'input-cell';
        if (!jeVikend && !jeSvatek) {
            // Pro přerušení - příchod
            const inputPreruseniDo = document.createElement('input');
            inputPreruseniDo.type = 'time';
            inputPreruseniDo.value = prestavkaDo;
            inputPreruseniDo.style.width = '100%';
            inputPreruseniDo.addEventListener('change', function() {
                aktualizujCelkoveHodiny();
            });
            tdPreruseniPrichod.appendChild(inputPreruseniDo);
        }
        tr.appendChild(tdPreruseniPrichod);
        
        // Poznámka - nová buňka pro zadání poznámky bez placeholderu
        const tdPoznamka = document.createElement('td');
        tdPoznamka.className = 'input-cell';
        const inputPoznamka = document.createElement('input');
        inputPoznamka.type = 'text';
        // Odstraníme placeholder úplně
        // inputPoznamka.placeholder = 'Poznámka';
        inputPoznamka.style.width = '100%';
        tdPoznamka.appendChild(inputPoznamka);
        tr.appendChild(tdPoznamka);
        
        tbody.appendChild(tr);
    }
    
    // Na konci funkce volám inicializaci event delegace
    initEventDelegation();
    
    // Aktualizace celkových součtů
    document.getElementById('celkem-hodin').textContent = celkemHodin.toFixed(1);
    document.getElementById('celkem-sv').textContent = svatkyHodiny.toFixed(1);
    
    // Aktualizace celkové výplaty (hodiny + svátky)
    const celkemVyplata = celkemHodin + svatkyHodiny;
    document.getElementById('celkem-vyplata').textContent = celkemVyplata.toFixed(1);
}

// Funkce pro aktualizaci součtů dovolené
function aktualizujSoucty() {
    let dovolenaHodiny = 0;
    let pracovniVolnoHodiny = 0;
    let sluzbyHodiny = 0;
    let neplVolnoHodiny = 0;
    let pracovniKlidHodiny = 0;
    
    // Pevná hodnota pro dovolenou a další typy nepřítomnosti
    const pevneHodiny = 8;
    
    // Projít všechny selecty směn
    const vsechnySmenySelecty = document.querySelectorAll('#tabulka-body .input-cell select[data-den]');
    
    vsechnySmenySelecty.forEach(function(select) {
        const hodnota = select.value;
        
        // Najít odpovídající řádek
        const radek = select.closest('tr');
        
        // Kontrola, zda řádek není víkend nebo svátek
        if (!radek.classList.contains('weekend') && !radek.classList.contains('holiday')) {
            // Přičíst hodiny podle typu směny
            switch(hodnota) {
                case 'dovolená':
                    dovolenaHodiny += pevneHodiny; // Vždy pevných 8 hodin
                    break;
                case 'služba':
                    sluzbyHodiny += pevneHodiny;
                    break;
                case 'pracovní volno':
                    pracovniVolnoHodiny += pevneHodiny;
                    break;
                case 'neplacené volno (absence)':
                    neplVolnoHodiny += pevneHodiny;
                    break;
                case 'pracovní klid':
                    pracovniKlidHodiny += pevneHodiny;
                    break;
            }
            
            // Změna barvy nebo stylu buněk v řádku pro vizuální odlišení
            const bunky = radek.querySelectorAll('td:not(.input-cell)');
            if (hodnota === 'dovolená' || hodnota === 'pracovní volno' || hodnota === 'pracovní klid' || hodnota === 'neplacené volno (absence)') {
                bunky.forEach(function(bunka) {
                    bunka.style.color = '#777';
                    bunka.style.fontStyle = 'italic';
                });
                
                // Aktualizovat hodnotu v input poli na pevných 8 hodin, pokud existuje
                const hodinyInput = radek.querySelector('.hodiny-input');
                if (hodinyInput) {
                    hodinyInput.value = pevneHodiny.toFixed(1);
                    hodinyInput.disabled = true; // Znemožnit úpravu pro dovolené a další speciální případy
                }
            } else {
                // Vrácení původního stylu
                bunky.forEach(function(bunka) {
                    bunka.style.color = '';
                    bunka.style.fontStyle = '';
                });
                
                // Povolit úpravu hodiny pole, pokud už není zakázáno
                const hodinyInput = radek.querySelector('.hodiny-input');
                if (hodinyInput) {
                    hodinyInput.disabled = false;
                }
            }
        }
    });
    
    // BOD 1: Oprava získání hodnoty svátků z DOM místo neexistující proměnné
    const svatkyHodiny = parseFloat(document.getElementById('celkem-sv').textContent || '0');
    
    // Aktualizace počtů v HTML
    document.getElementById('celkem-d').textContent = dovolenaHodiny.toFixed(1);
    document.getElementById('celkem-sv').textContent = svatkyHodiny.toFixed(1); // Už neměníme hodnotu svátků 
    document.getElementById('celkem-pv').textContent = pracovniVolnoHodiny.toFixed(1);
    document.getElementById('celkem-nu').textContent = sluzbyHodiny.toFixed(1);
    document.getElementById('celkem-nva').textContent = neplVolnoHodiny.toFixed(1);
    document.getElementById('celkem-pk').textContent = pracovniKlidHodiny.toFixed(1);
    
    // Aktualizace celkových hodin a výplaty
    aktualizujCelkoveHodiny();
}

// BOD 2: Centralizovaná funkce pro výpočet pracovní doby - oprava pro standardní inputy
function vypocitejPracovniDobu(radek) {
  // Získání hodnot ze standardních time inputů
  const prichod = radek.querySelector('td:nth-child(4) input[type="time"]')?.value;
  const odchod = radek.querySelector('td:nth-child(5) input[type="time"]')?.value;
  const preruseniOd = radek.querySelector('td:nth-child(6) input[type="time"]')?.value;
  const preruseniDo = radek.querySelector('td:nth-child(7) input[type="time"]')?.value;
  
  return prepocitejHodinyDle(prichod, odchod, preruseniOd, preruseniDo);
}

// BOD 3: Vylepšená validace časových údajů
function casNaMinuty(cas) {
  if (!cas) return 0;
  
  // Přidání validace
  const casPattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!casPattern.test(cas)) {
    console.error(`Neplatný formát času: ${cas}`);
    return 0;
  }
  
  const [hodiny, minuty] = cas.split(':').map(Number);
  return hodiny * 60 + minuty;
}

// Funkce pro přepočet hodin podle příchodu, odchodu a přerušení
function prepocitejHodinyDle(prichod, odchod, preruseniOd, preruseniDo) {
  // Převod časů na minuty
  const prichodMinuty = casNaMinuty(prichod);
  const odchodMinuty = casNaMinuty(odchod);
  const preruseniOdMinuty = casNaMinuty(preruseniOd);
  const preruseniDoMinuty = casNaMinuty(preruseniDo);
  
  // Výpočet celkové doby (v minutách)
  let celkemMinuty = odchodMinuty - prichodMinuty;
  
  // Kontrola platnosti zadaných hodnot
  if (celkemMinuty < 0) {
    console.error('Čas odchodu je před časem příchodu');
    return 0;
  }
  
  // Odečtění přerušení, pokud existuje
  if (preruseniOdMinuty && preruseniDoMinuty) {
    const preruseniMinuty = preruseniDoMinuty - preruseniOdMinuty;
    
    // Kontrola platnosti přerušení
    if (preruseniMinuty < 0) {
      console.error('Čas návratu z přerušení je před časem odchodu na přerušení');
      return 0;
    }
    
    celkemMinuty -= preruseniMinuty;
  }
  
  // Převod na hodiny (s přesností na 0.5 hodiny)
  return Math.round(celkemMinuty / 30) / 2;
}

// BOD 4: Optimalizace přístupu k localStorage s verzováním
async function ziskejSvatkyProRok(rok) {
  try {
    // Nejprve zkontrolujeme, zda už máme svátky v localStorage
    const cachedData = localStorage.getItem(`svatky_${rok}`);
    if (cachedData) {
      try {
        const data = JSON.parse(cachedData);
        
        // Kontrola verze dat
        if (data.version === 1 && data.data) {
          console.log(`Načteny svátky pro rok ${rok} z cache`);
          return data.data;
        }
        // Pokud data nemají správnou verzi, pokračujeme dál
      } catch (e) {
        console.error('Chyba při parsování dat z cache:', e);
        // Pokračujeme k načtení nových dat
      }
    }
    
    // Zkontrolujeme, zda máme svátky v databázi, pokud ne, vypočítáme je
    const svatky = zakladniSvatky(rok);
    
    // Uložení do cache s verzí pro příště
    const dataToCache = {
      version: 1,
      data: svatky,
      timestamp: Date.now()
    };
    
    localStorage.setItem(`svatky_${rok}`, JSON.stringify(dataToCache));
    
    return svatky;
  } catch (error) {
    console.error(`Chyba při získávání svátků pro rok ${rok}:`, error);
    // V případě chyby použijeme základní svátky bez cacheování
    return zakladniSvatky(rok);
  }
}

// BOD 5: Vylepšená event delegace s okamžitým přepočtem
function initEventDelegation() {
  // Odstraníme existující listener, pokud existuje
  const tbody = document.getElementById('tabulka-body');
  const existingClone = tbody.cloneNode(true);
  tbody.parentNode.replaceChild(existingClone, tbody);
  
  // Přidání event delegace pro tabulku
  document.getElementById('tabulka-body').addEventListener('change', function(e) {
    // Zpracování změny v časových polích
    if (e.target && (e.target.type === 'time')) {
      // Najít odpovídající řádek
      const radek = e.target.closest('tr');
      
      // Zkontrolovat, zda není vybrána speciální hodnota
      const selectSmeny = radek.querySelector('select[data-den]');
      if (!selectSmeny || !selectSmeny.value) {
        // Přepočítat hodiny pro tento řádek
        const odpracovaneHodiny = vypocitejPracovniDobu(radek);
        
        // Aktualizovat hodnotu v input poli
        const hodinyInput = radek.querySelector('.hodiny-input');
        if (hodinyInput) {
          hodinyInput.value = odpracovaneHodiny.toFixed(1);
        }
        
        // Aktualizovat celkové součty
        aktualizujCelkoveHodiny();
      }
    }
    
    // Zpracování změny v selectu směn
    if (e.target && e.target.tagName === 'SELECT' && e.target.dataset.den) {
      aktualizujSoucty();
    }
    
    // Zpracování změny v poli s hodinami
    if (e.target && e.target.classList.contains('hodiny-input')) {
      aktualizujCelkoveHodiny();
    }
  });
  
  // Přidání event delegace pro změny při vstupu (input) - okamžitá aktualizace
  document.getElementById('tabulka-body').addEventListener('input', function(e) {
    // Zpracování změny v časových polích
    if (e.target && (e.target.type === 'time')) {
      // Najít odpovídající řádek
      const radek = e.target.closest('tr');
      
      // Zkontrolovat, zda není vybrána speciální hodnota
      const selectSmeny = radek.querySelector('select[data-den]');
      if (!selectSmeny || !selectSmeny.value) {
        // Přepočítat hodiny pro tento řádek
        const odpracovaneHodiny = vypocitejPracovniDobu(radek);
        
        // Aktualizovat hodnotu v input poli
        const hodinyInput = radek.querySelector('.hodiny-input');
        if (hodinyInput) {
          hodinyInput.value = odpracovaneHodiny.toFixed(1);
        }
        
        // Aktualizovat celkové součty
        aktualizujCelkoveHodiny();
      }
    }
  });
}

function aktualizujCelkoveHodiny() {
  let celkemHodin = 0;
  
  // Projít všechny řádky tabulky
  const radky = document.querySelectorAll('#tabulka-body tr');
  
  radky.forEach(function(radek) {
    // Přeskočit víkendy a svátky
    if (radek.classList.contains('weekend') || radek.classList.contains('holiday')) {
      return;
    }
    
    // Zkontrolovat, zda není vybrána speciální hodnota (dovolená, služba atd.)
    const selectSmeny = radek.querySelector('select[data-den]');
    if (selectSmeny && selectSmeny.value) {
      return; // Přeskočit řádky se speciálními hodnotami
    }
    
    // Najít pole pro hodiny
    const hodinyInput = radek.querySelector('.hodiny-input');
    if (hodinyInput) {
      // Načíst hodnotu přímo z pole s hodinami
      const hodinyValue = parseFloat(hodinyInput.value) || 0;
      celkemHodin += hodinyValue;
    }
  });
  
  // Aktualizace celkových hodin v HTML
  const celkemHodinElement = document.getElementById('celkem-hodin');
  if (celkemHodinElement) {
    celkemHodinElement.textContent = celkemHodin.toFixed(1);
  }
  
  // Získat hodnoty dovolených, svátků atd.
  const svatkyHodiny = parseFloat(document.getElementById('celkem-sv')?.textContent || '0');
  const dovolenaHodiny = parseFloat(document.getElementById('celkem-d')?.textContent || '0');
  const pracovniVolnoHodiny = parseFloat(document.getElementById('celkem-pv')?.textContent || '0');
  
  // Vypočítat celkovou výplatu (hodiny + svátky + dovolené + pracovní volno)
  const celkemVyplata = celkemHodin + svatkyHodiny + dovolenaHodiny + pracovniVolnoHodiny;
  
  // Aktualizace celkové výplaty v HTML
  const celkemVyplataElement = document.getElementById('celkem-vyplata');
  if (celkemVyplataElement) {
    celkemVyplataElement.textContent = celkemVyplata.toFixed(1);
  }
}

// Vylepšená funkce pro tisk výkazu, která zajistí správné zobrazení časových údajů
function tiskVykazu() {
    // Přidání dočasného stylu pro tisk
    const tiskStyle = document.createElement('style');
    tiskStyle.id = 'docasny-tisk-styl';
    tiskStyle.textContent = `
        @media print {
            .tisk-cas {
                font-family: monospace;
                width: 100%;
                display: inline-block;
                text-align: center;
                white-space: nowrap;
                font-size: 12px;
                min-width: 4em; /* Zajistit dostatečný prostor pro zobrazení času */
            }
            
            /* Zajistit, aby buňky tabulky měly dostatečnou šířku */
            #tabulka-body td {
                padding: 3px 5px;
                min-width: 60px;
            }
        }
    `;
    document.head.appendChild(tiskStyle);
    
    // Nahradit hodnoty časových inputů textovými prvky s pevným formátem
    const casoveInputy = document.querySelectorAll('input[type="time"]');
    const casovePoholdery = [];
    
    casoveInputy.forEach(input => {
        // Uložení aktuální hodnoty inputu
        casovePoholdery.push({
            value: input.value,
            parent: input.parentNode
        });
        
        // Funkce pro zajištění správného formátu času
        const formatovatCas = (cas) => {
            if (!cas) return '';
            // Rozdělit na hodiny a minuty a zajistit formát HH:MM
            const parts = cas.split(':');
            if (parts.length === 2) {
                return parts[0].padStart(2, '0') + ':' + parts[1].padStart(2, '0');
            }
            return cas;
        };
        
        // Nahradit input textovým prvkem s pevným formátem
        const textovyPrvek = document.createElement('div'); // Používáme div místo span pro lepší kontrolu šířky
        textovyPrvek.className = 'tisk-cas';
        textovyPrvek.textContent = formatovatCas(input.value);
        textovyPrvek.style.width = '100%';
        textovyPrvek.style.textAlign = 'center';
        
        input.style.display = 'none'; // Skrýt původní input
        input.parentNode.appendChild(textovyPrvek); // Přidat textový prvek jako potomka
    });
    
    // Skrýt prázdné výběry v selectech
    const vsechnySelecty = document.querySelectorAll('select');
    vsechnySelecty.forEach(select => {
        if (!select.value) {
            select.style.visibility = 'hidden';
        }
    });
    
    // V sekci přípravy k tisku ve funkci tiskVykazu()
    // Po zpracování časových inputů
    const numberInputs = document.querySelectorAll('input[type="number"]');
    const numberHolders = [];

    numberInputs.forEach(input => {
        // Uložení reference pro obnovu
        numberHolders.push({
            input: input,
            value: input.value
        });
        
        // Vytvořit textový element s hodnotou
        const textEl = document.createElement('div');
        textEl.className = 'tisk-number';
        textEl.textContent = parseFloat(input.value).toFixed(1);
        textEl.style.textAlign = 'center';
        
        // Skrýt původní input a přidat text
        input.style.display = 'none';
        input.parentNode.appendChild(textEl);
    });
    
    // Tisk výkazu
    window.print();
    
    // Obnovení původních hodnot po tisku
    setTimeout(() => {
        // Odstranit dočasný styl
        document.getElementById('docasny-tisk-styl')?.remove();
        
        // Obnovit původní inputy
        document.querySelectorAll('.tisk-cas').forEach(prvek => {
            prvek.remove();
        });
        
        // Zobrazit původní inputy
        casovePoholdery.forEach(holder => {
            const inputs = holder.parent.querySelectorAll('input[type="time"]');
            inputs.forEach(input => {
                input.style.display = '';
            });
        });
        
        // Obnovit viditelnost selectů
        vsechnySelecty.forEach(select => {
            select.style.visibility = '';
        });
        
        // Po obnovení časových inputů
        numberHolders.forEach(holder => {
            holder.input.style.display = '';
        });

        document.querySelectorAll('.tisk-number').forEach(el => {
            el.remove();
        });
    }, 500); // Krátké zpoždění pro dokončení tisku
}



// Funkce pro načítání svátků z Google Calendar API - nahrazena lokálním výpočtem
async function nactiSvatkyZGoogleCalendar(rok) {
  // Místo volání API vždy používáme lokální výpočet svátků
  console.log('Používám lokální výpočet svátků pro rok', rok);
  return vypocitejSvatky(rok);
}

// Funkce pro získání svátků pro zadaný rok - zjednodušená bez API
async function ziskejSvatkyProRok(rok) {
  try {
    // Nejprve zkontrolujeme, zda už máme svátky v localStorage
    const cachedData = localStorage.getItem(`svatky_${rok}`);
    if (cachedData) {
      try {
        const data = JSON.parse(cachedData);
        
        // Kontrola verze dat
        if (data.version === 1 && data.data) {
          console.log(`Načteny svátky pro rok ${rok} z cache`);
          return data.data;
        }
        // Pokud data nemají správnou verzi, pokračujeme dál
      } catch (e) {
        console.error('Chyba při parsování dat z cache:', e);
        // Pokračujeme k načtení nových dat
      }
    }
    
    // Zkontrolujeme, zda máme svátky v databázi, pokud ne, vypočítáme je
    const svatky = zakladniSvatky(rok);
    
    // Uložení do cache s verzí pro příště
    const dataToCache = {
      version: 1,
      data: svatky,
      timestamp: Date.now()
    };
    
    localStorage.setItem(`svatky_${rok}`, JSON.stringify(dataToCache));
    
    return svatky;
  } catch (error) {
    console.error(`Chyba při získávání svátků pro rok ${rok}:`, error);
    // V případě chyby použijeme základní svátky bez cacheování
    return zakladniSvatky(rok);
  }
}

function pridejTlacitkoPreepocet() {
  // Kontrola, zda tlačítko již neexistuje
  if (document.getElementById('btn-prepocet')) {
    return; // Tlačítko už existuje, není potřeba ho přidávat znovu
  }
  
  // Vytvoření nového tlačítka
  const tlacitko = document.createElement('button');
  tlacitko.id = 'btn-prepocet';
  tlacitko.className = 'btn btn-secondary';
  tlacitko.textContent = 'Přepočítat hodiny';
  tlacitko.type = 'button';
  
  // Přidání event listeneru
  tlacitko.addEventListener('click', function() {
    aktualizujCelkoveHodiny();
    aktualizujSoucty();
    console.log('Hodiny byly přepočítány');
  });
  
  // Přidání tlačítka do DOM - vložíme ho před tlačítko tisku
  const tiskTlacitko = document.getElementById('btn-print');
  if (tiskTlacitko && tiskTlacitko.parentNode) {
    tiskTlacitko.parentNode.insertBefore(tlacitko, tiskTlacitko);
  } else {
    // Pokud nenajdeme tlačítko tisku, přidáme ho na konec ovládacích prvků
    const ovladaciPrvky = document.querySelector('.vykaz-controls');
    if (ovladaciPrvky) {
      ovladaciPrvky.appendChild(tlacitko);
    }
  }
}

// Přidat do inicializační funkce nebo hned po načtení stránky
function pridejCSSProSelecty() {
    const style = document.createElement('style');
    style.textContent = `
        select option[value=""] {
            color: #999;
        }
        
        @media print {
            select option[value=""] {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', pridejCSSProSelecty);