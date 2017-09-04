var ba = new Vue({
    el: '#ba',
    data: {
        start: '',
        hexStart: 0x0,
        timestamp: ['01', '23', '45', '67', '89', 'ab', 'cd', 'ef'],
        rows: [],
        versions: {
            'U': 'NTSC (U)',
            'J': 'NTSC (J)'
        },
        endians: {
            'B': 'Big Endian',
            'L': 'Little Endian'
        },
        version: 'U',
        endian: 'L',
        item: null,
        itemNames: ['Ocarina of Time', 'Hero\'s Bow', 'Fire Arrow', 'Ice Arrow', 'Light Arrow', 'Trade Item 1', 'Bomb', 'Bombchu', 'Deku Stick', 'Deku Nut', 'Magic Beans', 'Trade Item 2', 'Powder Keg', 'Pictograph Box', 'Lens of Truth', 'Hookshot', 'Great Fairy\'s Sword', 'Trade Item 3', 'Bottle 1', 'Bottle 2', 'Bottle 3', 'Bottle 4', 'Bottle 5', 'Bottle 6', 'Postman\'s Hat', 'All-Night Mask', 'Blast Mask', 'Stone Mask', 'Great Fairy\'s Mask', 'Deku Mask', 'Keaton Mask', 'Bremen Mask', 'Bunny Hood', 'Don Gero\'s Mask', 'Mask of Scents', 'Goron Mask', 'Romani\'s Mask', 'Circus Leader\'s Mask', 'Kafei\'s Mask', 'Couple\'s Mask', 'Mask of Truth', 'Zora Mask', 'Kamaro\'s Mask', 'Gibdo Mask', 'Garo\'s Mask', 'Captain\'s Hat', 'Giant\'s Mask', 'Fierce Deity\'s Mask']
    },
    mounted() {
        this.resetStart();
        this.getRows()
    },
    watch: {
        start() {
            this.hexStart = parseInt(this.start, 16);
        },
        item() {
            this.getRows();
        },
        version() {
            this.resetStart();
            this.getRows();
        },
        endian() {
            this.resetStart();
            this.getRows();
        }
    },
    methods: {
        resetStart() {
            var x = this.version + this.endian;
            switch (x) {
                case 'JB':
                    this.start = '1f35a0';
                    break;
                case 'JL':
                    this.start = 'ae0030';
                    break;
                case 'UB':
                    this.start = '1f0600';
                    break;
                case 'UL':
                    this.start = 'add090';
                    break;
            }
        },
        getRows() {
            for (var i = 0; i < 34; i++) {
                this.rows[i] = [];
                for (var j = 0; j < 16; j++) {
                    if (i === 33 && (this.version === 'U' || j > 7)) {
                        this.rows[i][j]  = '--';
                    } else {
                        this.rows[i][j] = 'ff';
                    }
                }
            }
            if (Number.isInteger(this.item) && this.endian === 'L') {
                var item = this.item;
                if (this.version === 'J') {
                    item += 2;
                }
                var lone = (Math.floor(item/4) + 1) * 4 + 119 - item % 4;
                this.rows[Math.floor(lone/16)][lone % 16] = '01';
                if (this.version === 'J') {
                    item -= 1;
                }
                for (var i = 0; i < 8; i++) {
                    var timeByte = (Math.floor(i/4) + 1) * 4 - i % 4 - 1;
                    var row = Math.floor(item/2);
                    var col = item % 2 * 8;
                    this.rows[row][col + i] = this.timestamp[timeByte] + 'x';
                    if (i == 4) {
                        this.rows[row + 3][col + i] = '70';
                        this.rows[row + 6][col + i] = '70';
                    } else if (i == 5) {
                        this.rows[row + 3][col + i] = '17';
                        this.rows[row + 6][col + i] = '17';
                    } else {
                        this.rows[row + 3][col + i] = '00';
                        this.rows[row + 6][col + i] = '00';
                    }
                    this.rows[row + 9][col + i] = '00';
                }
            }
        },
        getIndex(i, j) {
            return (i - 1) * 6 + (j - 1);
        },
        setItem(i, j) {
            var index = this.getIndex(i, j);
            if (this.item === index) {
                this.item = null;
            } else {
                this.item = index;
            }
        }
    }
});
