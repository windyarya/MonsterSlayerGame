function getRandomVal(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
};

const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            roundGame: 0,
            winner: null,
            logMsg: []
        };
    },
    computed: {
        monsterBarStyle() {
            if (this.monsterHealth < 0) {
                return { width: '0%'};
            }
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyle() {
            if (this.playerHealth < 0) {
                return { width: '0%'};
            }
            return {width: this.playerHealth + '%'}
        },
        specialBtnAllowed() {
            return this.roundGame % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                // draw
                this.winner = 'draw';
            } else if (value <= 0) {
                // player lost
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 & this.playerHealth <= 0) {
                // draw
                this.winner = 'draw';
            } else if (value <= 0) {
                // monster lost
                this.winner = 'player'
            }
        }
    },
    methods: {
        attackMonster() {
            this.roundGame++;
            var playerAttVal = getRandomVal(5, 12);
            this.monsterHealth = this.monsterHealth - playerAttVal;
            this.addLogMsg('player', 'attack', playerAttVal);
            this.attackPlayer();
        },
        attackPlayer() {
            var monsterAttVal = getRandomVal(7, 15);
            this.playerHealth = this.playerHealth - monsterAttVal;
            this.addLogMsg('monster', 'attack', monsterAttVal);
        },
        specialAttMonster() {
            this.roundGame++;
            var playerSpecialAttVal = getRandomVal(10, 25);
            this.monsterHealth = this.monsterHealth - playerSpecialAttVal;
            this.addLogMsg('player', 'special attack', playerSpecialAttVal);
            this.attackPlayer();
        },
        playerHeal() {
            this.roundGame++;
            var healVal = getRandomVal(8, 20);
            if (this.playerHealth + healVal > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healVal;
            }
            this.addLogMsg('player', 'heal', healVal);
            this.attackPlayer();
        },
        startNewGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.roundGame = 0;
            this.winner = null;
            this.logMsg = [];
        },
        surrenderBtn() {
            this.winner = 'monster';
        },
        addLogMsg(who, what, value) {
            this.logMsg.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    },
});

app.mount('#game');