Vue.component('character-has', {
  props: ['has'],
  computed: {
    text () {
      let base = `<h3>Qui ets?</h3>`;
      switch (this.has) {
        case "Vident":
          base += `
          <p>
            Ets vident. Una persona capaç de veure més enllà de l'ànima
            de les persones. Però no massa. El teu fort és la investigació:
            t'assabentes dels secrets dels altres, cosa que és molt útil
            per fer creure tothom en els teus poders sobrenaturals.
          </p>
          <p>
            Per això coneixes els secrets de la meitat dels jugadors. Si
            saps jugar bé les teves cartes <i>pun intended</i>, et pot ser
            molt útil per a aconseguir el teu objectiu.
          </p>`;
          break;
        case "Bartender":
          base += `
          <p>
            Ets bartender. Una persona sociable i atenta i que sap detectar les
            debilitats de la gent. Per alguns es el beure, per a d'altres
            algunes substancies misterioses, però en el cas de l'amfitrió
            saps que `
          let random = Math.random();
          if (random > 0.5) {
            base += `el que més desitja és tenir` + this.$store.state.players[0].wants + `.`;
          }else {
            base += `el que té per negociar aquesta nit és ` + this.$store.state.players[0].has + `.`;
          }
          base +=  `
          </p>
          <p>
            A més, has tingut una bona ratxa apostant i comences amb <b>10 fitxes</b> més.
          </p>`;
          break;
        case "Diamant robat":
          base += `
          <p>
            Que qui ets? Ets el lladre més célebre de la història. Has robat <b>el
            diamant més gran</b> mai registrat a Europa.
          </p>
          <p>
            La llàstima és que ara tens la policia als talons. Millor que trobis a qui incriminar...
            però no sense rendibilitzar la feina, és clar. Si parles així del cavall,
            no el vendràs mai.
          </p>`;
          break;
        case "Diners":
          base += `
          <p>
            Ets una persona desorbitadament rica. Com has aconseguit la teva
            fortuna? Això no incumbeix ningú.
          </p>
          <p>
            És per això que comences amb <b>20 fitxes</b> més que la resta.
            Si saps mantenir la cara de pòquer, potser les puguis intercanviar
            per el que realment t'interessa.
          </p>`;
          break;
        case "Armament":
          base += `
          <p>
            Armes, això és el que tens. Un fotimer d'armes. Però no hi ha
            prou persones al món per a tantes bales. I ara, què?
          </p>
          <p>
            Millor que trobis algú a quí vendre-les. Comences amb
            <b>5 carregaments d'armes</b> en excès, que pots vendre sense
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
            Millor que trobis distribuidors. Comences amb
            <b>5 carregaments de drogues</b> en excès, que pots vendre sense
            perdre el teu monopoli. Quines? Les que vulguis. Les tens totes!
          </p>`;
          break;
        case "Estatus":
          base += `<p>
            No tens molts diners, ni armes, ni elements de negociació. Però no passa
            res, ets la persona més coneguda de tota la festa. Et coneix i
            t'admira tothom. Tens <b>estatus</b> Què feies?... Cantar? Actuar? Ah! No?... Polític?
          </p>
          <p>
            Es nota en la manera de caminar, en la teva forma de moure't. Tenia raò, oi? Veus!? No tens massa bens
            materials, però tens les històries més bojes i interessants.
            I tens contactes, oi? I segur que una paraula teva pot obrir moltes portes.
            Segur que trobaras algú que estigui desesperat
            per ajudar-te. És el que té la fama.
          </p>`;
          break;
        case "Policia":
          base += `
          <p>
            Ets policia. Exacte: l'encarregat d'arruinar la festa. Però
            això no vol dir que no puguis gaudir-la mentre dura.
          </p>
          <p>
            El teu problema és que <b>no tens res</b> ni per oferir ni per vendre.
            Hauràs de passar tota la nit intentant que ningú se n'adoni d'aquest
            petit detall.
          </p>`;
          break;
        default:
          base += `<div class="error">[[error]]</div> - ` + this.has + `</div>`;
      }
      base += `<p>A més, com tothom, disposes de <b>10 fitxes</b> de base.</p>`;
      return base;
    }
  },
  template: `
  <div v-html="text">
  </div>`
});



Vue.component('character-wants', {
  props: ['wants'],
  computed: {
    text () {
      let base = `
        <h3>Què vols?</h3>
      `;
      switch (this.wants) {
        case "Diners":
          base += `
          <p>
            Ja tens moltes altres coses. Però el que necessites són diners,
            fitxes. És el que realment compta.
          </p>
          <p>El teu objectiu és acabar el joc amb més de <b>20 fitxes</b></p>`;
          break;
        case "Diamant robat":
          base += `
          <p>
            Els diners, les drogues, les armes... tot això està molt bé,
            però qui les pot diferenciar les unes de les altres? No es pot
            pas comparar amb <b>un diamant</b>. <i>Diamonds are forever</i> o
            <i>A girl's best friend</i>, a qui li importa? Et dic que són
            diamants! I aquest és unic...
          </p>
          <p>
            Si l'aconsegueixes seràs la persona més feliç... esperem.
          </p>`;
          break;
        case "Armament":
          base += `
          <p>
            T'agrada negociar, i t'agrada guanyar. I en el món de les armes qui fa la
            venda és qui sempre guanya. Per això vols aconseguir tenir el control d'aquest
            negoci.
          </p>
          <p>
            Si aconsegueixes la direcció de <b>4 carregaments d'armes</b>
            com a mínim, hauràs assolit el teu objectiu.
          </p>`;
          break;
        case "Drogues":
          base += `
          <p>
            Qui no vol passar-s'ho bé, eh? O millor encara, cobrar per facilitar
            que la resta s'ho passi bé. Això és un negoci segur... vull dir
            assegurat.
          </p>`;
          if (Math.random() > 0.5) {
            base += `<p>Sobredosi? No, no m'agrada parlar d'aquestes coses.</p>`;
          }
          base += `<p>
            Si aconsegueixes la direcció de <b>4 carregaments de drogues</b>
            com a minim hauràs aconseguit tot el que volies. Però... de debó
            penses aturar-te aquí?
          </p>`;
          break;
        case "Estatus":
          base += `
          <p>
            Diners, fet; armes, fet; drogues, fet. Però qui t'estima? Qui
            està per tu? Els metges.
          </p>
          <p>
            Tu el que vols és que et tinguin en compte. Ser important! La
            manera de fer-ho? Ajudar algú que ja tingui <b>estatus</b> social.
            (L'amfitrió, recorda, pot no tenir-ne.)
          </p>`;
          break;
        case "Policia":
          base += `
          <p>
            La teva missió és senzilla. Assebentar-te de tots els fets
            il·legals que tenen lloc durant la festa: tràfic d'armes, de drogues,
            fins i tot la venda d'un diamant robat! Ara bé, vigila, tenir diners
            no és delicte... Si no demostres que ténen un origen ilícit, és clar, Aleshores
            sí.
          </p>`;
          break;
        default:
          base += `<div class="error">[[error]]</div> - ` + this.wants + `</div>`;
      }
      return base;

    }
  },
  template: `
  <div v-html="text">
  </div>`
});



// Handles all the text generation related to the secrets.
Vue.component('character-secret', {
  props: ['secret', 'relatedPlayer', 'knows'],
  computed: {
    text () {
      let base = `<h3>Secrets</h3>`;

      switch (this.secret.nom) {
        case "Assessi pare":
          base += `
          <p>
            Vas matar el pare o mare d’un dels altres convidats, el senyor o la
            senyora ` + this.$store.state.players[this.secret.relatedPlayer].familyName + `. Et converteixes
            en l'<b>enemic/ga</b> del seu fill.
          </p>`;
          break;
        case "Odi amfitrió":
          base += `
          <p>
            Odies l’amfitrió, ` + this.$store.state.players[0].name + " " + this.$store.state.players[0].familyName + `. Es converteix en el teu <b>enemic</b>.
          </p>`;
          break;
        case "Robar amfitrió":
          base += `
          <p>
            Penses robar a l'amfitrió, ` + this.$store.state.players[0].name + " " + this.$store.state.players[0].familyName + `. Et converteixes en el seu <b>enemic</b>. (<b>+1 punt</b> si el robes).
          </p>`;
          break;
        case "Clan familiar":
          base += `
          <p>
            La familia ` + this.$store.state.players[this.secret.relatedPlayer].familyName + ` t’ha fet la vida impossible. Qualsevol amb aquest cognom es converteix en el teu <b>enemic</b>.
          </p>`;
          break;
        case "Estafador":
          base += `
          <p>
            Tu estafes, és el que fas. (<b>+1 punt</b> si estafes algú).
          </p>`;
          break;
        case "Rob Banks":
          base += `
          <p>
            Has robat divuit bancs. L'última vegada un policia et va disparar a la
            cama i van estar apunt d'enxampar-te. Detestes la policia, són els teus <b>enemics</b>.
          </p>`;
          break;
        case "Addicte":
          base += `
          <p>
            Ets un addicte. (<b>+1 punt</b> si compres drogues)
          </p>`;
          break;
        case "Policia":
          base += `
          <p>
            Per si no quedava clar, el teu secret és que ets <b>policia</b>. Seria
            un problema si algú se n'asabantes. I creus que ja hi ha algú que ho
            sap. De moment el millor es negar tota acusació.
          </p>`;
          break;
        case "Segall":
          base += `
          <p>
            Per escapar de la policia et vas veure obligat a delatar a ` + this.$store.state.players[this.secret.relatedPlayer].name + `. Mai es va assebentar que vas ser tu qui el va traicionar, però per culpa teva va passar moltes hores a la presó. Et converteixes en el <strong>seu enemic</strong>.
          </p>`;
          break;
        case "Amant":
          base += `
          <p>
            Ja fa uns anys, vas ser l'amant de la parella de ` + this.$store.state.players[this.secret.relatedPlayer].familyName + `. Ell/a encara no ho sap, però no li farà cap gràcia. Et converteixes en el <strong>seu enemic</strong>.
          </p>`;
          break;
        case "Negoci Vigilat":
          base += `
          <p>
            Tens contactes a la policia, i saps que el negoci ` + this.secret.relatedBusiness + `. està vigilat per sospita de contraband. Els carregaments amagats en aquest negoci seran confiscats en uns dies, <strong>no computen al final de la partida</strong>.
          </p>`;
          break;
        case "Odi Negoci":
          base += `
          <p>
            Odies el propietari/a del negoci ` + this.secret.relatedBusiness + `. Vols tenir el control dels seus carregaments per assegurar-te que ningú els reculli abans
            que la policia rebi la teva denuncia anònima. (<b>+2 punt</b> si controles la targeta de visita).
          </p>`;
          break;
        case "En busca":
          base += `
          <p>
            Estàs en cerca i captura. Si la policia ha descobert qui ets, perds <b>-3 punt</b> (+1 punt per al policia).
          </p>`;
          break;
        default:
          base += `<div class="error">[[error]] - ` + this.secret.nom + `</div>`;
      }

      base += "<hr />";

      // I ara afegim els secrets que saps dels altres personatges.
      for (var i = 0; i < this.knows.length; i++) {
        let random = Math.random();
        if (random > 0.4){
          base += `<p>Saps que `;
        } else if (random > 0.7){
          base += `<p>Recordes que `;
        } else {
          base += `<p>Has descobert que `;
        }

        base += this.$store.state.players[this.knows[i].playerkey].name + " " + this.$store.state.players[this.knows[i].playerkey].familyName;

        switch (this.knows[i].secret.nom) {
          case "Assessi pare":
            base += ` va matar al senyor o la senyora ` + this.$store.state.players[this.knows[i].secret.relatedPlayer].familyName + `. El seu fill/a no ho sap, però potser juga al teu favor si utilitzes correctament la informació.
            </p>`;
            break;
          case "Estafador":
            base += ` és un estafador. Potser l'enganxes estafant algú.</p>`;
            break;
          case "Rob Banks":
            base += ` ha robat divuit bancs, l'última vegada un policia va estar apunt
            d'enxampar-lo/la amb un tret a la cama. Encara no els ho ha perdonat.</p>`;
            break;
          case "Robar amfitrió":
            base += ` pensa robar a l'amfitrió, ` + this.$store.state.players[0].name + " " + this.$store.state.players[0].familyName + `.
              No saps si és personal, però saps que a l'amfitrió no li farà massa
              gràcia.
            </p>`;
            break;
          case "Odi amfitrió":
            base += ` odia profundament l’amfitrió, ` + this.$store.state.players[0].name + " " + this.$store.state.players[0].familyName + ` i farà el que pugui per
              dificultar-li la feina.`;

            let random = Math.random();
            if (random > 0.5) {
              base += ` Potser és un bon aliat?`;
            }else {
              base += `Hauras de vigilar amb aquest...`;
            }
            base += `</p>`;
            break;
          case "Clan familiar":
            base += ` odia la familia ` + this.$store.state.players[this.knows[i].secret.relatedPlayer].familyName + `, que l'hi
              ha fet la vida impossible. Odia a qualsevol amb aquest cognom... Potser
              convidar-lo/la no ha estat la idea més assenyada que ha tingut l'amfitrió.
            </p>`;
            break;
          case "Addicte":
            base += ` és un addicte que farà el que sigui per posar les grapes a
              alguns carregaments de drogues.
            </p>`;
            break;
          case "Policia":
            base += ` és un policia infiltrat, que no dubtara en portar-vos a tots
              a la garjola.
            </p>`;
            break;
          case "Segall":
            base += ` va delatar a ` + this.$store.state.players[this.knows[i].secret.relatedPlayer].name + `. Mai se'n va assebentar que vas ser tu qui el va traicionar, però per culpa seva va passar moltes hores a la presó.
            </p>`;
            break;
          case "Amant":
            base += ` va ser l'amant de la parella de ` + this.$store.state.players[this.knows[i].secret.relatedPlayer].familyName + `, que encara no ho ha descobert.
            </p>`;
            break;
          case "Negoci Vigilat":
            base += ` te informació sobre un carregament que serà confiscat i que, per tant, perdrà el seu valor.
            </p>`;
            break;
          case "Odi Negoci":
            base += ` odia el propietari/a del negoci ` + this.knows[i].secret.relatedBusiness + `. Intentarà controlar el carregament sigui com sigui.
            </p>`;
            break;
          case "En busca":
            base += ` és un dels individus més buscats de tot el territori. Recompensa de <b>5 fitxes</b> per el delator.
            </p>`;
            break;
          default:
            base += `<div class="error">[[error]] - ` + this.knows[i].secret.nom + `</div>`;
        }
      }

      return base;
    }
  },
  template: `
  <div v-html="text">
  </div>`
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
        <p><code>Ctrl + P</code> per generar un PDF amb totes les fitxes de personatge separades per pàgines. Posa-les en un sobre i dona-les als jugadors. O millor, demana-ho a algú altre per a no asebentar-te dels secrets dels altres i poder jugar tu també.</p>

        <hr />
    </div>

      <div class="character-wrapper">
        <div class="container">
          <div class="character" v-for="(player, key) in players" :key="key">
            <div class="flex-row">
              <h2 v-if="player.name && player.familyName">{{player.name}} <strong>{{player.familyName}}</strong></h2>
              <h2 v-else>Personatge <strong>{{key + 1}}</strong></h2>
              <span v-if="key === 0">Amfitrió: {{player.jugador}}</span>
              <span v-else>Jugador: {{player.jugador}}</span>
            </div>

            <character-has :has="player.has" :players="players"></character-has>
            <character-wants :wants="player.wants" :players="players"></character-wants>
            <character-secret :secret="player.secret" :knows="player.knows" :relatedPlayer="player.secretRelatedPlayer" :players="players"></character-secret>

            <img src="src/divider.svg" alt="" class="divider"/>
          </div>
        </div>
        <div class="gradient">
        </div>
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
