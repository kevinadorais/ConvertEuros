Vue.use(VueResource);

new Vue ({
    el: "#app",
    data: {
        number: "",
        conversion: "\"Veuillez entrer un nombre\"",
        montant: {
          THB: {
            pays: "Baht (Thailande)",
            conversion: "???",
            taux: ""
          },
          TND: {
            pays: "Dinar Tunisien(Tunisie)",
            conversion: "???",
            taux: ""
          },
          USD: {
            pays: "Dollar Américain (Etats-Unis)",
            conversion: "???",
            taux: ""
          },
          CAD: {
            pays: "Dollar Canadien (Canada)",
            conversion: "???",
            taux: ""
          },
          EUR: {
            pays: "Euro (Europe)",
            conversion: "???",
            taux: ""
          },
          CHF: {
            pays: "Franc Suisse (Suisse)",
            conversion: "???",
            taux: ""
          },
          GBP: {
            pays: "Livre Sterling (Royaume-Uni)",
            conversion: "???",
            taux: ""
          },
          RUB: {
            pays: "Rouble Russe (Russie)",
            conversion: "???",
            taux: ""
          },
          JPY: {
            pays: "Yen (Japon)",
            conversion: "???",
            taux: ""
          },
          CNY: {
            pays: "Yuan (Chine)",
            conversion: "???",
            taux: ""
          }
        }
    },
    watch: {
        number(){
            this.conversion = "\"J'attends que vous arrêtiez de taper...\""
            this.getConversion()
        }     
    },
    methods: {
        getConversion: _.debounce(
          function () {
            if (!this.number) {
              this.conversion = '\"Je ne peux pas vous donner une réponse avant que vous ne rentriez un nombre !\"';
              return;
            } else if (this.number.search(/^[\d.,]+$/) === -1) {
              this.conversion = "\"Ne tapez que des chiffres\""
              return;
            }
            this.conversion = 'Je récupère le taux de change...'
            this.euro= this.number
            this.$http.get('https://api.exchangeratesapi.io/latest')
              .then(function (response) {
                this.montant.CAD.taux = response.body.rates.CAD;
                this.montant.CHF.taux = response.body.rates.CHF;
                this.montant.CNY.taux = response.body.rates.CNY;
                this.montant.EUR.taux = 1;
                this.montant.GBP.taux = response.body.rates.GBP;
                this.montant.JPY.taux = response.body.rates.JPY;
                this.montant.RUB.taux = response.body.rates.RUB;
                this.montant.THB.taux = response.body.rates.THB;
                this.montant.TND.taux = 3.237;
                this.montant.USD.taux = response.body.rates.USD;
                this.montant.CAD.conversion = `${(this.montant.CAD.taux * this.number.replace(',', '.')).toFixed(2)} `;
                this.montant.CHF.conversion = `${(this.montant.CHF.taux * this.number.replace(',', '.')).toFixed(2)} `;
                this.montant.CNY.conversion = `${(this.montant.CNY.taux * this.number.replace(',', '.')).toFixed(2)} `;
                this.montant.EUR.conversion = `${(this.montant.EUR.taux * this.number.replace(',', '.')).toFixed(2)} `;
                this.montant.GBP.conversion = `${(this.montant.GBP.taux * this.number.replace(',', '.')).toFixed(2)} `;
                this.montant.JPY.conversion = `${(this.montant.JPY.taux * this.number.replace(',', '.')).toFixed(2)} `;
                this.montant.RUB.conversion = `${(this.montant.RUB.taux * this.number.replace(',', '.')).toFixed(2)} `;
                this.montant.THB.conversion = `${(this.montant.THB.taux * this.number.replace(',', '.')).toFixed(2)} `;
                this.montant.TND.conversion = `${(this.montant.TND.taux * this.number.replace(',', '.')).toFixed(2)} `;
                this.montant.USD.conversion = `${(this.montant.USD.taux * this.number.replace(',', '.')).toFixed(2)} `;
              })
              .catch(function (error) {
                this.conversion = "Erreur ! Impossible d'accéder à l'API." + error
              })
          },
          500
        )
    }
})