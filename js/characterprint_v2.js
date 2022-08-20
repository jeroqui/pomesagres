Vue.component('character-has', {
  props: ['has', 'carregaments'],
  data() {
    return {
      base_money: BASE_MONEY,
      ritch_bonus: RITCH_BONUS,
      bartender_bonus: BARTENDER_BONUS,
      bartender_info: Math.random()
    }
  },
  computed: {
    get_character_name () {
      switch (this.has) {
        case "Diners":
          return "Fastigosament ric";
        case "Armament":
          return "Traficant d'armes";
        case "Drogues":
          return "Traficant de drogues";
        case "Diamant robat":
          return "Lladre";
        case "Estatus":
          return "Cèlebre";
        default:
          return this.has;
      }
    },
    prosa () {
      let base = "";

      switch (this.has) {
        case "Vident":
          base += `
          <p>
            Ets vident. Una persona capaç de veure més enllà de l'ànima de les persones; els esperits parlen amb tu i et desvetllen tots els secrets al teu voltant... O no? De fet, no. El teu fort és la investigació: t'assabentes dels secrets dels altres, cosa que és molt útil per fer creure tothom en els teus poders sobrenaturals.
          </p>`;
          break;
        case "Bartender":
          base += `
          <p>
            Ets bartender. Una persona sociable, atenta... i que sap detectar les
            debilitats de la gent. Per a alguns és la beguda, per a d'altres,
            algunes substancies misterioses... però en el cas de l'amfitrió
            saps `
          if (this.bartender_info > 0.5) {
            base += `el que més desitja és tenir.`;
          }else {
            base += `el que té per negociar aquesta nit.`;
          }
          base += `</p>`;
          break;
        case "Diamant robat":
          base += `
          <p>
            Ets el lladre més célebre de la història. Has robat <b>el
            diamant més gran</b> mai catalogat a Europa.
          </p>
          <p>
            La llàstima és que ara la policia et trepitja els talons. Millor que trobis a qui incriminar... però no sense rendibilitzar la feina, és clar.
          </p>`;
          break;
        case "Diners":
          base += `
          <p>
            Ets una persona desorbitadament rica. Com has aconseguit la teva
            fortuna? Això no incumbeix ningú. Si saps mantenir la cara de pòquer, potser puguis intercanviar tota aquesta pasta pel que realment t'interessa.
          </p>`;
          break;
        case "Armament":
          base += `
          <p>
            Armes, això és el que tens. Un fotimer d'armes. Però no hi ha prou persones al món per a tantes bales. I ara, què?
          </p>
          <p>
            Millor que trobis algú a quí vendre-les. Comences amb <b>5 carregaments d'armes</b> en excès, que pots vendre sense
            perdre el teu monopoli.
          </p>`;
          break;
        case "Drogues":
          base += `
          <p>
            Drogues. Moltes drogues. Menges, beus, respires drogues, somies amb
            drogues. Un fotimer de drogues, i de bona qualitat, eh! Però no
            hi ha prou adictes a tot el mon per fer front a la teva oferta.
            I ara, què?
          </p>
          <p>
            Millor que trobis distribuïdors. Comences amb <b>5 carregaments de drogues</b> en excès, que pots vendre sense perdre el teu monopoli. Quines? Les que vulguis. Les tens totes!
          </p>`;
          break;
        case "Estatus":
          base += `<p>
            No tens molts diners, ni armes, ni elements de negociació. Però no passa
            res, ets la persona més coneguda de tota la festa. Et coneix i t'admira tothom. Tens <b>estatus</b> Què feies?... Cantar? Actuar? No?... Polític?
          </p>
          <p>
            Es nota en la manera de caminar, en la teva forma de moure't; tens les històries més bojes i interessants... i tens contactes, oi? I segur que una paraula teva pot obrir moltes portes. Segur que trobaras algú que estigui desesperat per ajudar-te. És el que té la fama.
          </p>`;
          break;
        case "Policia":
          base += `
          <p>
            Ets policia. Exacte: l'encarregat d'arruïnar la festa. Però això no vol dir que no puguis gaudir-la mentre dura.
          </p>
          <p>
            El teu problema és que <b>no tens res</b> ni per oferir ni per vendre.
            Hauràs de passar tota la nit intentant que ningú se n'adoni d'aquest petit detall.
          </p>`;
          break;
        default:
          base += `<div class="error">[[error]]</div> - ` + this.has + `</div>`;
      }

      return base;
    },
    starting_money() {
      let base = BASE_MONEY;
      if (this.has === "Diners") {
        base += RITCH_BONUS;
      }else if (this.has === "Bartender") {
        base += BARTENDER_BONUS;
      }

      return base;
    },
    bartender_info_text() {
      if (this.bartender_info > 0.5) {
        return "El seu objectiu és aconseguir " + this.$store.state.players[0].wants.toLowerCase();
      }else {
        return  "Té " + this.$store.state.players[0].has.toLowerCase() + " per negociar";
      }
    },
    vident_amount() {
      return Math.floor(this.$store.state.players.length / 2) - 1;
    }
  },
  template: `
  <div class="has_wrapper">
    <img v-if="has === 'Armament' || has === 'Policia'" src="src/sheet-decorations/armament.svg" alt="" class="portrait"/>
    <img v-if="has === 'Drogues'" src="src/sheet-decorations/drogues.svg" alt="" class="portrait"/>
    <img v-if="has === 'Estatus'" src="src/sheet-decorations/estatus.svg" alt="" class="portrait"/>
    <img v-if="has === 'Diners'" src="src/sheet-decorations/diners.svg" alt="" class="portrait"/>
    <img v-if="has === 'Diamant robat'" src="src/sheet-decorations/lladre.svg" alt="" class="portrait"/>
    <img v-if="has === 'Bartender'" src="src/sheet-decorations/bartender.svg" alt="" class="portrait"/>
    <img v-if="has === 'Vident'" src="src/sheet-decorations/vident.svg" alt="" class="portrait"/>

    <h3>Personatge: {{ get_character_name }}</h3>
    <div class="character-row">
      <div>
        <p>Comences amb:</p>
        <ul>
          <li v-if="has === 'Diamant robat'"><b>1x <i class="fa-solid fa-gem"></i></b> Diamant robat</li>
          <li v-if="has === 'Vident'">{{vident_amount}} peces <b>d'informació privilegiada</b> extres</li>
          <li v-if="has === 'Armament'"><b>5x <i class="fa-solid fa-gun"></i></b> Carregaments d'armes
            <ul>
              <li v-for="(carregament, index) in carregaments" :key="index">{{carregament[1]}}x <i class="fa-solid fa-compass"></i> a {{carregament[0]}}</li>
            </ul>
          </li>
          <li v-if="has === 'Drogues'"><b>5x <i class="fa-solid fa-pills"></i></b> Carregaments de drogues
            <ul>
              <li v-for="(carregament, index) in carregaments" :key="index">{{carregament[1]}}x <i class="fa-solid fa-compass"></i> a {{carregament[0]}}</li>
            </ul>
          </li>
          <li v-if="has === 'Bartender'"><b>Informació</b> sobre l'amfitrió: {{bartender_info_text}}. </li>
          <li v-if="has === 'Estatus'">L'<b>interés</b> de tots els presents.</li>
          
          <li><b>{{starting_money}}x <i class="fa-solid fa-coins"></i></b> fitxes 
          ({{base_money}} de base<template v-if="has === 'Diners'"> + {{ritch_bonus}} per ser de bona familia</template><template v-if="has === 'Bartender'"> + {{bartender_bonus}} per una rathca de bona sort</template>)
          </li>
        </ul>
      </div>

      <div v-html="prosa">
      </div>
    </div>
  </div>
  `
});



Vue.component('character-wants', {
  props: ['wants', 'has'],
  data() {
    return {
      base_money: BASE_MONEY,
      bartender_bonus: BARTENDER_BONUS
    }
  },
  computed: {
    starting_money() {
      let base = BASE_MONEY;
      if (this.has === "Bartender") {
        base += BARTENDER_BONUS;
      }

      base += 200;

      return base;
    },
    objectiu_text(){
      switch (this.wants) {
        case "Estatus":
        case "Diners":
        case "Armament":
        case "Drogues":
          return "Aconseguir " + this.wants.toLowerCase();
        case "Diamant robat":
          return "Aconseguir el diamant";
        default:
          return this.wants;
      }
    },
    players_count () {
      return store.state.players.length;
    }
  },
  template: `
  <div class="wants_wrapper">
    <h3>Objectiu: {{objectiu_text}}</h3>
    <div class="character-row">
      <div>
        <template v-if="has != 'Policia'">
        <p>Has d'acabar la partida amb:</p>

        <ul>
          <li v-if="wants === 'Diamant robat'"><b>1x <i class="fa-solid fa-gem"></i></b> Diamant robat</li>
          <li v-if="wants === 'Armament'"><b>4x <i class="fa-solid fa-gun"></i></b> Carregaments d'armes</li>
          <li v-if="wants === 'Drogues'"><b>4x <i class="fa-solid fa-pills"></i></b> Carregaments de drogues</li>
          <li v-if="wants === 'Estatus'">L'<b>interés</b> de tots els presents.</li> <!-- // TODO: -->
          <li v-if="wants === 'Diners'"><b>{{starting_money}}x <i class="fa-solid fa-coins"></i></b> fitxes <template v-if="has === 'Bartender'">({{base_money}} de base + {{bartender_bonus}} per que comences amb més que la resta)</template>
        </li>
        </ul>
        </template>

        <template v-if="has === 'Policia'">
          <p>Has d'acabar la partida amb tota la informació que puguis.</p>
          <p> Utilitza l'anvers de la pàgina per anotar:</p>
          <ul>
            <li>Les <b>transaccions</b> de tots els bens ilegals</li>
            <li>Els culpables d'assessinat (si n'hi han)</li>
          </ul>
        </template>
      </div>


      <div class="recompte_punts">
        <p>Recompte de punts:</p>
        <ul v-if="has === 'Policia'">
          <li>Recuperar el diamant:
            <div class="point_grid"><div class="point_cell">+4</div></div>
          </li>
          <li>
            <div class="point_grid"><div v-for="index in players_count" :key="index" class="point_cell">+1</div></div>
            <span>x info</span>
          </li>
          <li>
            <div class="point_grid"><div v-for="index in 4" :key="index" class="point_cell">+3</div></div>
            <span>x culpable d'assessinat</span>
          </li>
          <li>
            <div class="point_grid"><div v-for="index in 5" :key="index" class="point_cell points_bad">-2</div></div>
            <span>x error</span>
          </li>
        </ul>
        <ul v-else>
          <li>Aconseguir l'objectiu:
            <div class="point_grid"><div class="point_cell">+5</div></div>
          </li>
          <li>Aconseguir l'objectiu i mantenir els teus actius de partida:
            <div class="point_grid"><div class="point_cell">+5</div></div>
          </li>
          <li>
            <div class="point_grid"><div v-for="index in 4" :key="index" class="point_cell">+1</div></div>
            <span>x cada <b>50 <i class="fa-solid fa-coins"></i></b> fitxes extres</span>
          </li>
          <li>
            <div class="point_grid"><div v-for="index in 3" :key="index" class="point_cell points_bad">-{{index + 2}}</div></div>
            <span>x cada assessinat</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  `
});



// Handles all the text generation related to the secrets.
Vue.component('character-secret', {
  props: ['secret'],
  computed: {
    secret_text(){
      let base = "";

      switch (this.secret.nom) {
        case "Assessi pare":
          let random = Math.random();
          base += `Vas matar `
          if (random > 0.5) {
            base += "el pare "
          }else {
            base += "la mare "
          }
          base += `d’un dels altres convidats, `;
          if (random > 0.5) {
            base += "el Sr. "
          }else {
            base += "la Sra. "
          }
          base += this.$store.state.players[
              this.secret.relatedPlayer
            ].familyName + `. Des d'aleshores ets l'<b>enemic</b> del seu fill.`;
          break;
        case "Odi amfitrió":
          base += `Odies l’amfitrió, ` + this.$store.state.players[0].name + " " + this.$store.state.players[0].familyName + `. És el teu <b>enemic</b> irreconciliable.`;
          break;
        case "Robar amfitrió":
          base += `Penses robar a l'amfitrió, ` + this.$store.state.players[0].name + " " + this.$store.state.players[0].familyName + `. Això et converteix en el seu <b>enemic</b>. (<b>-1 punt</b> si no aconsegueixes robar-li res).  <div class="point_grid"><div class="point_cell points_bad">-1</div></div>`;
          break;
        case "Clan familiar":
          base += `La familia ` + this.$store.state.players[this.secret.relatedPlayer].familyName + ` t’ha fet la vida impossible. A aquesta gent, ni aigua. Són els teus <b>enemics</b>.`;
          break;
        case "Estafador":
          base += `La mentida és un art per a tu, la falsedat, la teva arma. (<b>-1 punt</b> si no estafes algú durant la partida). Potser has comprat una cosa i no l'has pagada, potser has venut informació falsa... <div class="point_grid"><div class="point_cell points_bad">-1</div></div>`;
          break;
        case "Rob Banks":
          base += `Has robat divuit bancs. La darrera vegada un policia et va disparar a la
            cama i van estar apunt d'enxampar-te. Naturalment, detestes la policia, són els teus <b>enemics</b>.`;
          break;
        case "Addicte":
          base += `Quantes hores fa que no consumeixes? (<b>-1 punt</b> si no aconsegueixes com a mínim un carregament de drogues) <div class="point_grid"><div class="point_cell points_bad">-1</div></div>`;
          break;
        case "Policia":
          base += `Un <b>policia</b> directe a la gola del llop. Seria un problema si algú se n'asabantés... i, malauradament, algú té sospites ben fonamentades. De moment el millor serà buscar una bona identitat falsa i negar tota acusació.`;
          break;
        case "Segall":
          base += `Per escapar de la policia et vas veure obligat a delatar a ` + this.$store.state.players[this.secret.relatedPlayer].name + `, que mai va saber qui l'havia traït. Malauradament, amb una vida trencada per la presó, mai et perdonarà si ho descobreix. Seràs el <strong>seu enemic</strong>.`;
          break;
        case "Amant":
          base += `Ja fa uns anys, vas ser l'amant de la parella de ` + this.$store.state.players[this.secret.relatedPlayer].familyName + `. Per sort, encara no ho sap, però no li farà cap gràcia i si se n'asebenta, seràs el <strong>seu enemic</strong>.`;
          break;
        case "Odi Negoci":
          base += `Odies el propietari/a de ` + this.secret.relatedBusiness + `. Vols tenir el control dels seus carregaments i assegurar-te que ningú els reculli abans
            que la policia rebi la teva denuncia anònima. (<b>-1 punt</b> si no controles una de les seves mercaderies). <div class="point_grid"><div class="point_cell points_bad">-1</div></div>`;
          break;
        case "En busca":
          base += `Estàs en cerca i captura. Si la policia descobrís qui ets, perdries la teva llibertat, i <b>-3 punt</b> (+1 punt per al policia). <div class="point_grid"><div class="point_cell points_bad">-3</div></div>`;
          break;
        default:
          base += `<div class="error">[[error]] - ` + this.secret.nom + `</div>`;
      }

      return base;
    }
  },
  template: `
  <div class="secret_wrapper">
    <h3>Secret</h3>
    <div class="character-row">
      <div>
        <p v-html="secret_text"></p>
      </div>

      <div class="recompte_punts">
        <p>Un enemic teu ha:</p>
        <ul>
          <li>Aconseguit el seu objectiu:
            <div class="point_grid"><div class="point_cell points_bad">-2</div></div>
          </li>
          <li><span style="display:block; margin-left: 2rem;"></span>Ho has impedit:
            <div class="point_grid"><div class="point_cell">+1</div></div>
          </li>
          <li>Ha mort:
            <div class="point_grid"><div class="point_cell">+2</div></div>
          </li>
        </ul>
      </div>
    </div>
  </div>`
});


Vue.component('privinfo', {
  props: ['knows'],
  methods: {
    info_about (i) {
      if (this.knows[i].secret.nom === "Negoci Vigilat") {
        return "Negoci Vigilat";
      }else {
        return this.$store.state.players[this.knows[i].playerkey].name;
      }
    },
    know_text(i) {
      let base = "";

      var random = Math.random();
      if (random > 0.4){
        base += `Saps que `;
      } else if (random > 0.7){
        base += `Et consta que `;
      } else {
        base += `Has descobert que `;
      }

      if (this.knows[i].secret.nom === "Negoci Vigilat") {
        base += "el negoci <i>" + this.knows[i].secret.relatedBusiness + "</i>";
      }else {
        base += this.$store.state.players[this.knows[i].playerkey].name + " " + this.$store.state.players[this.knows[i].playerkey].familyName;
      }

      switch (this.knows[i].secret.nom) {
        case "Assessi pare":
          random = Math.random();
          base += ` va matar `;
          if (random > 0.5) {
            base += "el Sr. "
          }else {
            base += "la Sra. "
          }
          base += this.$store.state.players[this.knows[i].secret.relatedPlayer].familyName + `. El seu fill/a no ho sap. Com treure profit d'una informació tan delicada?`;
          break;
        case "Estafador":
          if (this.$store.state.players[this.knows[i].playerkey].tracte === "Dona") {
            base += ` és una estafadora de talla internacional. `;
          }else {
            base += ` és un estafador de talla internacional. `;
          }
          base += "Segur que aquesta nit té alguna jugada entre mans.";
          break;
        case "Rob Banks":
          base += ` ha robat divuit bancs. La darrera vegada la policia gairebé l'enxampa, se'n va ensortir amb un tret a la cama. Encara no els ho ha perdonat.`;
          break;
        case "Robar amfitrió":
          base += ` pensa robar a l'amfitrió, ` + this.$store.state.players[0].name + " " + this.$store.state.players[0].familyName + `. No saps si és personal, però saps que no li farà cap gràcia.`;
          break;
        case "Odi amfitrió":
          base += ` odia profundament l’amfitrió, ` + this.$store.state.players[0].name + " " + this.$store.state.players[0].familyName + ` i farà el que pugui per complicar-li la nit, els negocis, les amistats i la vida en general.`;

          random = Math.random();
          if (random > 0.5) {
            base += ` Potser és un bon aliat?`;
          }else {
            base += `Hauras de vigilar amb aquest...`;
          }
          break;
        case "Clan familiar":
          base += ` odia la familia ` + this.$store.state.players[this.knows[i].secret.relatedPlayer].familyName + `: sempre li han fet la vida impossible i qualsevol amb aquest cognom és <i>persona non grata</i>... Potser fer-li arribar una invitació no ha estat la idea més assenyada.`;
          break;
        case "Addicte":
          base += ` té un petit problema amb certes substàncies addictives... de fet, farà el que sigui per posar les grapes a qualsevol carregament de drogues.`;
          break;
        case "Policia":
          base += ` és un policia infiltrat que no dubtara en portar-vos a tots a la garjola.`;
          break;
        case "Segall":
          base += ` va delatar a ` + this.$store.state.players[this.knows[i].secret.relatedPlayer].name + `, que mai va saber qui l'havia traït. Una notícia així pot capgirar totalment la nit a més d'una persona.`;
          break;
        case "Amant":
          base += ` va ser l'amant de la parella de ` + this.$store.state.players[this.knows[i].secret.relatedPlayer].familyName + `.., que mai ho ha sabut! Una revelació d'aquesta magnitud pot tenir conseqüencies terribles.`;
          break;
        case "Negoci Vigilat":
          base += ` està vigilat i que, per tant, les mercaderies que s'hi amaguen es confiscaran abans que ningú pugui aprofitar-les. Els carregaments d'aquest negoci no comptaran al final del joc.`;
          break;
        case "Odi Negoci":
          base += ` odia el propietari/a del negoci ` + this.knows[i].secret.relatedBusiness + `. Intentarà controlar els seus carregaments sigui com sigui.`;
          break;
        case "En busca":
          base += ` és un dels individus més buscats de tot el territori. Recompensa de <b>50 fitxes</b> pel delator.`;
          break;
        default:
          base += `<div class="error">[[error]] - ` + this.knows[i].secret.nom + `</div>`;
      }
      return base;
    }
  },
  template: `
  <div class="priv_info_wrapper">
    <h3>Informació privilegiada</h3>
    <table>
      <tr v-for="(item, i) in knows">
        <td>
          {{i + 1}}
        </td>
        <td>
          {{info_about(i)}}
        </td>
        <td v-html="know_text(i)">
        </td>
      </tr>
    </table>
    <template v-html="text">
    </template>
  </div>`
});


Vue.component('character', {
  props: ['player', 'playerKey'],
  template: `
  <div class="character">
    <div class="flex-row">
      <h2 v-if="player.name">{{player.name}} <strong v-if="player.familyName">{{player.familyName}}</strong></h2>
      <h2 v-else>Personatge <strong>{{key + 1}}</strong></h2>
      <span v-if="playerKey === 0">Amfitrió: {{player.jugador}}</span>
      <span v-else>Jugador: {{player.jugador}}</span>
    </div>

    <character-has :has="player.has" :carregaments="player.carregaments"></character-has>
    <character-wants :wants="player.wants" :has="player.has"></character-wants>
    <character-secret :secret="player.secret"></character-secret>
    <privinfo :knows="player.knows"></privinfo>

    <img src="src/divider.svg" alt="" class="divider"/>
  </div>
  `
});


Vue.component('characterprint', {
  data: function () {
    return {
      slides: 0,
      printInvites: true
    };
  },
  computed: {
    players: {
      get () {
        return this.$store.state.players;
      },
      set (value) {
        this.$store.commit("setplayers", value);
      }
    },
    address: {
      get () {
        return this.$store.state.address;
      },
      set (value) {
        this.$store.commit("setaddress", value);
      }
    }
  },
  methods: {
    lastSlide(){
      if (this.slides < this.$store.state.players.length -1){
        this.slides++;
      }
    },
    nextSlide(){
      if (this.slides > 1){
        this.slides--;
      }
    },
    styleInvitacio (key) {
      if (this.slides >= key){
        return "invitacio";
      }else {
        return "invitacio hide";
      }
    },
    print() {
      if (!window.print){
        alert("El teu navegador no permet generar documents a partir de pàgines web. Intenta-ho des d'un altre navegador o dispositiu.");
      }
      window.print();
      gtag('event', 'print', {
        'event_category': 'Character generation',
        'event_label': "Printed the character sheets",
        'invites': this.$store.state.printInvites
      });

    }
  },
  mounted () {
    this.slides = store.state.players.length - 1;
  },
  template: `<div id="characterprint">
    <div class="container print-info">
      <h1>Personatges:</h1>
      <p><code>Ctrl + P</code> per generar un PDF amb totes les fitxes de personatge (acostumen a tenir dues pàgines, es poden imprimir a dues cares).</p>
      <p>Cal fer arribar la fitxa i la resta de materials a cada jugador amb el marge suficient per a que puguin preparar el seu personatge i estratègia. Idealment, demana-ho a algú que no participi en el joc, per a no asebentar-te dels secrets dels altres i poder jugar tu també.</p>

      <hr />
    </div>

    <div class="character-wrapper">
      <div class="container">
        <character v-for="(player, key) in players" :key="key" :player="player" :playerKey="key"></character>
      </div>
      <div class="gradient">
      </div>
      <div class="confidencial"><span>CONFIDENCIAL</span></div>
    </div>

    <div class="container print-info">
        <hr />

        <h1>Invitacions:</h1>
        <p>Pots omplir aquestes invitacions per a convidar a tothom.</p>
        <label for="printInvites">Marca aquesta casella per incloure aquestes invitacions al PDF.</label>
        <input type="checkbox" name="printInvites" v-model="printInvites">
    </div>


    <div id="invitacions" v-if="printInvites">
      <button @click="lastSlide()" :disabled="slides >= players.length - 1"><i class="fas fa-caret-left"></i></button>
      <div id="invitacions-slides">
        <div class="card-wrapper" v-for="(player, key) in players" :key="key" v-if="key > 0">
          <div class="card-separator" v-for="i in key - 1"></div>
          <div :class="styleInvitacio(key)">
            <div class="convidat">
              <select v-model="player.tracte" class="machine">
                <option value="Neutre">Estimat/da:</option>
                <option value="Dona">Estimada:</option>
                <option value="Home">Estimat:</option>
              </select>
              <span class="convidatName">{{player.name}} {{player.familyName}}</span>
            </div>
            <textarea class="motiu" v-model="player.invite"></textarea>
            <textarea type="text" class="lloc machine" v-model="address" placeholder="Adressa" rows="2" maxlength="100"></textarea>
            <div class="amfitrio">{{players[0].name}} {{players[0].familyName}}</div>
          </div>
        </div>
      </div>
      <button @click="nextSlide()" :disabled="slides <= 1"><i class="fas fa-caret-right"></i></button>
    </div>

    <div class="flex-row center print-info">
      <button @click="print()" class="big">Imprimeix! <i class="fas fa-camera-retro"></i></button>
    </div>

  </div>`
});
