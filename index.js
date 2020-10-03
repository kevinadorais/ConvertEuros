Vue.use(VueResource);

new Vue ({
    el: "#app",
    data: {
        number: "",
        conversion: "\"Veuillez entrer un nombre\"",
        txDollarUSD: "",
        txDollarCAD: "",
        txLivreSterling: "",
        txfrancCHF: "",
        txRouble: "",
        txYen: "",
        txYuan: "",
        txBaht: "",
        euro: "???",
        dollarUSD: "???",
        dollarCAD: "???",
        livreSterling: "???",
        francCHF: "???",
        rouble: "???",
        yen: "???",
        yuan: "???",
        dinar: "???",
        baht: "???",
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
                this.txDollarUSD = response.body.rates.USD;
                this.txDollarCAD = response.body.rates.CAD;
                this.txLivreSterling = response.body.rates.GBP;
                this.txfrancCHF = response.body.rates.CHF;
                this.txRouble = response.body.rates.RUB;
                this.txYen = response.body.rates.JPY;
                this.txYuan = response.body.rates.CNY;
                this.txBaht = response.body.rates.THB;
                this.euro = `${(this.number.replace(',', '.') * 1).toFixed(2)} `;
                this.dollarUSD = `${(this.txDollarUSD * this.number.replace(',', '.')).toFixed(2)} `;
                this.dollarCAD = `${(this.txDollarCAD * this.number.replace(',', '.')).toFixed(2)} `;
                this.livreSterling = `${(this.txLivreSterling * this.number.replace(',', '.')).toFixed(2)} `;
                this.francCHF = `${(this.txfrancCHF * this.number.replace(',', '.')).toFixed(2)} `;
                this.rouble = `${(this.txRouble * this.number.replace(',', '.')).toFixed(2)} `;
                this.yen = `${(this.txYen * this.number.replace(',', '.')).toFixed(2)} `;
                this.yuan = `${(this.txYuan * this.number.replace(',', '.')).toFixed(2)} `;
                this.baht = `${(this.txBaht * this.number.replace(',', '.')).toFixed(2)} `;
                this.dinar = `${(this.number.replace(',', '.') * 3.24).toFixed(2)} `;
              })
              .catch(function (error) {
                this.conversion = "Erreur ! Impossible d'accéder à l'API." + error
              })
          },
          500
        )
      }
})