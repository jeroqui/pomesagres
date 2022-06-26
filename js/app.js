

var app = new Vue({
  el: '#app',
  store,
  data: {
    status: ""
  },
  mounted() {
    while (store.state.players.length < 5){
      this.newplayer();
    }
  },
  methods: {
    newplayer () {
      store.commit("newplayer");
    },
    generate () {
      store.commit("initplayers");


      this.status = "Preparant les variables";
      // -- Setup secrets
      var secrets = [
        "Assessi pare",
        "Odi amfitrió",
        "Robar amfitrió",
        "Clan familiar",
        "Estafador",
        "Rob Banks",
        "Addicte",
        "Segall",
        "Amant",
        "Negoci Vigilat",
        "Negoci Vigilat",
        "Odi Negoci",
        "En busca"
      ];

      var negocis = [
        "Pentinats Silvestre",
        "Ventura & Germans",
        "Vives & Associats",
        "Associació Bancaria Don Vignolo",
        "Tabacs SOTO",
        "Club de golf",
        "Edicions Salvador",
        "Penitenciaria Fonoll del Vespre",
        "Xarcuteria Maria i Família",
        "Molner Casino",
        "Conserves Ràfols",
        "Cadavers Casado"
      ];

      // Game variables
      var base_haves = [
        "Diamant robat",
      ];

      var unique_haves = [
        "Vident",
        "Bartender",
      ];

      // El vident i el Bartender no apareixen junts amb menys de 7 jugadors.
      if (store.state.players.length < 7) { // Only one of the custom characters will appear with less than 7 players.
        base_haves.push(unique_haves[Math.floor(Math.random() * unique_haves.length)]);
      }else {
        for (var i = 0; i < unique_haves.length; i++) {
          base_haves.push(unique_haves[i]);
        }
      }


      var haves_options = [
        "Diners",
        "Armament",
        "Drogues",
        "Estatus"
      ];

      // Control distribution
      if (store.state.players.length < 5) {
        store.commit("error", "No hi ha prou personatges. (Minim 5)");
        return false;
      } else if (store.state.players.length > secrets.length + 1) {
        store.commit("error", "El joc no està preparat per tants jugadors. Hi estem treballant.");
        return false;
      }

      this.status = "Preparant els actius i els dessitjos";
      // Si les condicions per a que es pugui fer la distribució és compleixen continuem amb la generació
      let diference = store.state.players.length - 1 - base_haves.length; // cal calcular tots els que ens falten per a poder repartir un a cada jugador
      for (let i = 0; i < diference; i++) {
        base_haves.push(haves_options[i%haves_options.length]); // Anem omplint la llista amb les opcions (haves_options)
      }

      var haves_wants = [];
      for (let i = 0; i < base_haves.length; i++) {
        let list = [base_haves[i], base_haves[i]];

        haves_wants.push(list);
      }



      var reordered_haves_wants = [];
      let old_haves_wants_length = haves_wants.length;
      for (let i = 0; i < old_haves_wants_length; i++) {
        let index = Math.floor(Math.random() * haves_wants.length);

        reordered_haves_wants.push(haves_wants[index]);
        haves_wants.splice(index, 1);
      }

      var reordered_wants = [];
      for (let i = 0; i < reordered_haves_wants.length; i++) {
        reordered_wants.push(reordered_haves_wants[i][1]);
      }

      // displace
      reordered_wants = reordered_wants.concat([reordered_wants.shift()]);


      // Ara els tornem a unir als haves
      for (let i = 0; i < reordered_haves_wants.length; i++) {
        reordered_haves_wants[i][1] = reordered_wants[i];
      }


      this.status = "Aplicant les condicions per als rols";
      // Comprovem que no hagin quedat volers i tenirs iguals
      for (let i = 0; i < reordered_haves_wants.length; i++) {
        if (reordered_haves_wants[i][0] === reordered_haves_wants[i][1]) {

          // Si són iguals, cal buscar un altre amb que intercanviar el valor
          for (let j = 0; j < reordered_haves_wants.length; j++) {
            if (reordered_haves_wants[j][1] != reordered_haves_wants[i][1] && reordered_haves_wants[i][1] != reordered_haves_wants[j][0]) {
              // Si les condicions es compleixen volem intercanviar-ne els valors
              let to_swap = reordered_haves_wants[j][1];
              reordered_haves_wants[j][1] = reordered_haves_wants[i][1];
              reordered_haves_wants[i][1] = to_swap;
              break;
            }
          }

        }
      }

      // No pot ser que algu vulgui ser vident.
      for (let i = 0; i < reordered_haves_wants.length; i++) {
        // Axi que si el tenir que estem processant és un dels de la llista de "unics", en busquem un altre per al seu voler equivalent.
        let control = 0;
        while (unique_haves.includes(reordered_haves_wants[i][1])) {
          let index = Math.floor(Math.random() * reordered_haves_wants.length);
          reordered_haves_wants[i][1] = reordered_haves_wants[index][1];

          control++;

          if (control > 20) {
            let otheroption = 0;
            for (let j = 0; j < reordered_haves_wants.length; j++) {
              if (!unique_haves.includes(reordered_haves_wants[j][1])) {
                otheroption = reordered_haves_wants[j][1];
              }
            }
            reordered_haves_wants[i][1] = otheroption;
          }
        }
      }


      // Decidim un jugador per a repartir-li el policia:
      var policeindex = Math.floor(Math.random() * store.state.players.length);

      reordered_haves_wants.splice(policeindex, 0, ["Policia", "Policia"]);

      // Si el bartender ha tocat a l'Anfitrió:
      if (reordered_haves_wants[0][0] === "Bartender"){
        // Desplacem tota la llista per un i ens assegurem que ja no és aixi.
        reordered_haves_wants = reordered_haves_wants.concat([reordered_haves_wants.shift()]);
      }

      this.status = "Repartint els actius i els dessitjos";
      // i assignem cada convinació a un jugador.
      for (var i = 0; i < store.state.players.length; i++){
        store.commit("playersetattr", {attr: "has", value: reordered_haves_wants[i][0], playerkey: i});
        store.commit("playersetattr", {attr: "wants", value: reordered_haves_wants[i][1], playerkey: i});
      }


      this.status = "Repartint els secrets";
      // Fase 3, secrets.
      for (var i = 0; i < store.state.players.length; i++){

        if (store.state.players[i].has === "Policia"){ // Si és el policia se li reparteix el secret de policia
          store.commit("playersetattr", {attr: "secret", value: {nom: "Policia"}, playerkey: i});
          continue;
        }

        // Si no és el policia, li repartim un secret qualsevol
        let random = Math.floor(Math.random() * secrets.length);
        let secret = {nom: secrets[random]};

        // Si es tracte de l'amfitrio, no podem repartir-li el secret d'odiar-se a si mateix.
        while (i == 0 && (secret.nom === "Odi amfitrió" || secret.nom === "Robar amfitrió")) {
          random = Math.floor(Math.random() * secrets.length);
          secret = {nom: secrets[random]};
        }

        // Si es tracta d'un secret que afecta a tercers, cal determinar a qui afecta.
        if (["Assessi pare", "Clan familiar", "Segall", "Amant"].includes(secret.nom)) {
          let randomplayerindex = Math.floor(Math.random() * store.state.players.length);
          while (randomplayerindex === i) {
            randomplayerindex = Math.floor(Math.random() * store.state.players.length);
          }
          secret.relatedPlayer = randomplayerindex;
        } else if (["Negoci Vigilat", "Odi Negoci"].includes(secret.nom)) {
          let randomnegoci = Math.floor(Math.random() * negocis.length);
          secret.relatedBusiness = negocis[randomnegoci];
          negocis.splice(randomnegoci, 1);
        } else if (["Odi amfitrió", "Robar amfitrió"].includes(secret.nom)) {
          secret.relatedPlayer = 0;
        }
        // I l'assignem al jugador.
        store.commit("playersetattr", {attr: "secret", value: secret, playerkey: i});

        /* SECRET DEBUGING
        console.log(store.state.players[i].name);
        console.log(secrets);
        console.log(secret);
        console.log("-------");
        */

        // Un cop tenim determinat el secret l'eliminem de la llista
        secrets.splice(random, 1);
      }


      this.status = "Confessant els secrets";
      // Fase 4: Sap el secret d'un dels altres.
      var secrets_totell = [];
      var playersecrets = []; // Para el vidente.
      for (var i = 0; i < store.state.players.length; i++){
        let obj = {playerkey: i, secret: store.state.players[i].secret};
        let list = [i, obj];
        secrets_totell.push(list);
        playersecrets.push(obj);
      }

      var reordered_secrets = [];
      while (secrets_totell.length > 0) {
        let index = Math.floor(Math.random() * secrets_totell.length);
        reordered_secrets.push(secrets_totell[index]);

        secrets_totell.splice(index, 1);
      }



      var secrets_reordered_objects = [];
      for (let i = 0; i < reordered_secrets.length; i++) {
        secrets_reordered_objects.push(reordered_secrets[i][1]);
      }

      // displace
      secrets_reordered_objects.splice(0, 0, secrets_reordered_objects[secrets_reordered_objects.length-1]).splice(-1, 1);

      for (let i = 0; i < reordered_secrets.length; i++) {
        reordered_secrets[i][1] = secrets_reordered_objects[i];
      }

      // Comprovar si els personatges saben secrets que els involucrin, i en aquest cas, intercanviar-lo per un altre que no ho faci
      for (let i = 0; i < reordered_secrets.length; i++) {
        if (!reordered_secrets[i][1].secret.hasOwnProperty('relatedPlayer')) {
          continue;
        }

        if (i === reordered_secrets[i][1].secret.relatedPlayer) {
          for (let j = 0; j < reordered_secrets.length; j++) {
            if (reordered_secrets[j][1].secret.hasOwnProperty('relatedPlayer')) {
              if (i === reordered_secrets[j][1].secret.relatedPlayer) {
                continue;
              }
            } else if (j === i) {
              continue;
            }

            // if this secret does not involve the player that's going to know it:
            let old_player_secret = reordered_secrets[i][1];
            reordered_secrets[i][1] = reordered_secrets[j][1];
            reordered_secrets[j][1] = old_player_secret;old_player_secret
            break;
          }
        }
      }


      // Donem els secrets als jugadors.
      for (var i = 0; i < reordered_secrets.length; i++) {
        store.commit("playerknows", {secret: reordered_secrets[i][1], playerkey: reordered_secrets[i][0]});
      }



      // I al vident li afegim els secrets pertinents.
      for (let i = 0; i < store.state.players.length; i++) {
        if (store.state.players[i].has === "Vident") {
          let control = 0;
          while (store.state.players[i].knows.length < ((store.state.players.length / 2) - 1)) {
            let random = Math.floor(Math.random() * playersecrets.length);

            if (playersecrets[random].playerkey != i && !store.state.players[i].knows.includes(playersecrets[random])) {
              if (playersecrets[random].secret.hasOwnProperty('relatedPlayer')) {
                if (playersecrets[random].secret.relatedPlayer != i) {
                  store.commit("playerknows", {secret: playersecrets[random], playerkey: i});
                }
              }else {
                store.commit("playerknows", {secret: playersecrets[random], playerkey: i});
              }
            }

            control++;
            if (control > 30) {
              for (let j = 0; j < playersecrets.length; j++) {
                if (playersecrets[j].playerkey != i && !store.state.players[i].knows.includes(playersecrets[j])) {
                  if (playersecrets[random].secret.hasOwnProperty('relatedPlayer')) {
                    if (playersecrets[random].secret.relatedPlayer === i) {
                      continue;
                    }
                  }

                  store.commit("playerknows", {secret: playersecrets[j], playerkey: i});
                }
              }
            }
            if (control > 100) {
              console.error("Fuck");
              return 0;
            }
          }
          break;
        }
      }

      this.status = "Generació completa";
      store.state.generated = true;
      window.gtag('event', 'generate');
    },
    deletePlayer (key) {
      store.commit("deleteplayer", key);
    }
  },
  computed: {
    players: {
      get () {
        return store.state.players;
      },
      set (value) {
        store.commit("setplayers", value);
      }
    },
    error () {
      return store.state.error;
    },
    generated () {
      return store.state.generated;
    }
  },
  template: `
  <div id="app">
    <div id="generador" v-if="!generated">
      <div class="container">
        <h1>Generador de <strong>personatges</strong>:</h1>

        <draggable v-model="players" group="playersGroup" handle=".handle">
          <div v-for="(player, key) in players" :key="key" class="playerinput">
            <span class="handle"><i class="fas fa-grip-lines"></i></span>
            <input type="text" v-model="player.name" placeholder="Nom" class="together"/>
            <input type="text" v-model="player.familyName" placeholder="Cognom" class="together"/>

            <input v-if="key === 0" type="text" v-model="player.jugador" placeholder="Amfitrió"/>
            <input v-else type="text" v-model="player.jugador" placeholder="Jugador"/>

            <span @click="deletePlayer(key)" class="delete"><i class="fas fa-trash-alt"></i></span>
          </div>
        </draggable>

        <div class="error" v-if="error">{{error}}</div>

        <div class="flex-row buttons">
          <button @click="newplayer">New</button>
          <div class="flex-row">
            <span v-if="players.length >= 5">Jugadors: {{players.length}}</span>
            <span v-else style="color: red">Jugadors: {{players.length}}</span>
            <button @click="generate" :disabled="players.length < 5">Genera els personatges</button>
          </div>
        </div>

        <span>{{status}}</span>

      </div>
    </div>

    <characterprint v-else></characterprint>
  </div>`
});


var apprecompte = new Vue({
  el: '#recompte-material',
  store,
  methods: {
    scrollto (id) {
      document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start'});
    }
  },
  computed: {
    chips () {
      return store.getters.necessariChips;
    },
    cards () {
      return store.getters.necessariCards;
    },
    generated () {
      return store.state.generated;
    }
  },
  template: `<div id="recompte-material">
    <p v-if="generated">
      Per a jugar et caldran <strong>{{chips}}</strong> fitxes i <strong>{{cards.drogues + cards.armament}}</strong> targetes de visita
      (<template v-if="cards.drogues > 0">{{cards.drogues}} de drogues</template><template v-if="cards.drogues > 0 && cards.armament > 0"> i </template><template v-if="cards.armament > 0">{{cards.armament}} d'armament</template>).
    </p>
    <p v-else>
      <a href="#generador-personatges" @click.prevent="scrollto('generador-personatges')">Genera els personatges</a> per a saber quant de material necessitaras.
    </p>
  </div>`
});
