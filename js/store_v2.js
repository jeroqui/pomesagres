
/* Setup global option */

const global_base_haves = [
  "Diamant robat",
];


const global_unique_haves = [
  "Vident",
  "Bartender",
];


const global_haves_options = [
  "Diners",
  "Armament",
  "Drogues",
  "Estatus"
];


const global_negocis_armament = [
  "Vives & Associats",
  "Associació Bancaria Don Vignolo",
  "Tabacs SOTO",
  "Molner Casino",
  "Conserves Ràfols",
  "Cadavers Casado"
];


const global_negocis_drogues = [
  "Pentinats Silvestre",
  "Ventura & Germans",
  "Club de golf",
  "Edicions Salvador",
  "Penitenciaria Fonoll del Vespre",
  "Xarcuteria Maria i Família",
];

const global_negocis = [
  ...global_negocis_armament, ...global_negocis_drogues
];


const global_secrets = [
  "Assessi pare",
  "Odi amfitrió",
  "Robar amfitrió",
  "Clan familiar",
  "Estafador",
  "Rob Banks",
  "Addicte",
  "Segall",
  "Amant",
  "Odi Negoci",
  "En busca"
];




/**
 * CONFIGURATION VARIABLES
 */

const BASE_MONEY = 100;
const RITCH_BONUS = 200;
const BARTENDER_BONUS = 100;



const store = new Vuex.Store({
  state: {
    players: [],
    demoInvites: [
      "Fa massa temps de la nostra darrera trobada, i no pots privar-nos més de la teva presència. Segurament et plaurà fer la coneixença d'alguns dels meus convidats aquesta nit.",
      "Deixem per una nit els negocis. He organitzat una vetllada encantadora per a presentar-te algú molt especial...",
      "Em plau convidar-vos a casa meva, per a un refrigeri i un vespre distés en companyia d'alguns amics i coneguts.",
      "No us conec directament, però uns amics m'han parlat molt bé de vosté i dels seus exitosos negocis. Potser li agradaria acompanyar-nos, a mi i altres homes de negocis el dia que celebro l'aniversari de la meva companyia."
    ],
    demoPlayers: [{
        name: "Gustav",
        familyName: "Holst",
        tracte: "Home"
      },
      {
        name: "Peter",
        familyName: "Parker",
        tracte: "Home"
      },
      {
        name: "Mar",
        familyName: "Ioneta",
        tracte: "Neutre"
      },
      {
        name: "Dean",
        familyName: "Martin",
        tracte: "Home"
      },
      {
        name: "Jonathan",
        familyName: "Harker",
        tracte: "Home"
      },
      {
        name: "Audrey",
        familyName: "Hepburn",
        tracte: "Dona"
      },
      {
        name: "Marilyn",
        familyName: "Monroe",
        tracte: "Dona"
      },
      {
        name: "Humphrey",
        familyName: "Bogart",
        tracte: "Home"
      },
      {
        name: "Marlene",
        familyName: "Dietrich",
        tracte: "Dona"
      },
      {
        name: "Fats",
        familyName: "Waller",
        tracte: "Home"
      },
      {
        name: "Al",
        familyName: "Bowlly",
        tracte: "Home"
      },
      {
        name: "Douglas",
        familyName: "Fairbanks",
        tracte: "Home"
      },
      {
        name: "Gloria",
        familyName: "Swanson",
        tracte: "Dona"
      },
      {
        name: "Norma",
        familyName: "Talmadge",
        tracte: "Dona"
      },
      {
        name: "Greta",
        familyName: "Garbo",
        tracte: "Dona"
      }
    ],
    generated: false,
    error: "",
    address: `142nd, Lennox avenue;
14 de gener, 22:00h`,
    priv_info: ["Negoci Vigilat"]
  },
  getters: {
    necessariChips: state => {
      var chips = 0;
      for (let i = 0; i < state.players.length; i++){
        if (state.players[i].has === "Diners") {
          chips += 2;
        }else if (state.players[i].has === "Bartender") {
          chips += 1;
        }
        chips += 1;
      }
      return chips;
    },
    necessariCards: state => {
      var cards = {armament: 0, drogues: 0};
      for (let i = 0; i < state.players.length; i++) {
        if (state.players[i].has === "Armament") {
          cards.armament += 5;
        }else if (state.players[i].has === "Drogues") {
          cards.drogues += 5;
        }
      }
      return cards;
    }
  },
  mutations: {
    newplayer (state) {
      let playerobj = {}
      if (state.demoPlayers.length > 0){
        let random = Math.floor(Math.random() * state.demoPlayers.length);
        playerobj = state.demoPlayers[random];
        state.demoPlayers.splice(random, 1);
      }else {
        playerobj = {name: "", familyName: "", tracte: "Neutre"};
      }

      let random = Math.floor(Math.random() * state.demoInvites.length);
      playerobj.invite = state.demoInvites[random];

      state.players.push(playerobj);

      state.error = "";
    },
    setplayers (state, value) {
      state.players = value;
    },
    setaddress (state, value) {
      state.address = value;
    },
    deleteplayer (state, key) {
      state.players.splice(key, 1);
    },
    initplayers (state) {
      for (var i = 0; i < state.players.length; i++){
          Vue.set(state.players[i], "has", "");
          Vue.set(state.players[i], "wants", "");
          Vue.set(state.players[i], "secret", {});
          Vue.set(state.players[i], "knows", []);
      }

    },
    error (state, error) {
      state.error = error;
    },
    playersetattr (state, {attr, value, playerkey}) {
      Vue.set(state.players[playerkey], attr, value);
    },
    playerknows (state, {secret, playerkey}) {
      state.players[playerkey].knows.push(secret);
    }
  },
  actions: {
    setupTestingplayers (context) {
      context.commit("setplayers", [
        {
          jugador: "Jacob",
          name: "Test",
          familyName: "Too",

          has: "Diners",
          wants: "Diamant robat"
        }
      ]);
    }
  }
});
