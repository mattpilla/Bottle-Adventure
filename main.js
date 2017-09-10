var ba = new Vue({
    el: '#ba',
    data: {
        start: '',
        hexStart: 0x0,
        timestamp: ['01', '23', '45', '67', '89', 'ab', 'cd', 'ef'],
        rows: [],
        extraRows: [],
        versions: {
            'U': 'NTSC (U)',
            'J': 'NTSC (J)'
        },
        endians: {
            'B': 'Big Endian',
            'L': 'Little Endian'
        },
        version: 'U',
        endian: 'B',
        item: null,
        byte: null,
        cell: {i: null, j: null},
        address: '',
        itemNames: ['Ocarina of Time', 'Hero\'s Bow', 'Fire Arrow', 'Ice Arrow', 'Light Arrow', 'Trade Item 1', 'Bomb', 'Bombchu', 'Deku Stick', 'Deku Nut', 'Magic Beans', 'Trade Item 2', 'Powder Keg', 'Pictograph Box', 'Lens of Truth', 'Hookshot', 'Great Fairy\'s Sword', 'Trade Item 3', 'Bottle 1', 'Bottle 2', 'Bottle 3', 'Bottle 4', 'Bottle 5', 'Bottle 6', 'Postman\'s Hat', 'All-Night Mask', 'Blast Mask', 'Stone Mask', 'Great Fairy\'s Mask', 'Deku Mask', 'Keaton Mask', 'Bremen Mask', 'Bunny Hood', 'Don Gero\'s Mask', 'Mask of Scents', 'Goron Mask', 'Romani\'s Mask', 'Circus Leader\'s Mask', 'Kafei\'s Mask', 'Couple\'s Mask', 'Mask of Truth', 'Zora Mask', 'Kamaro\'s Mask', 'Gibdo Mask', 'Garo\'s Mask', 'Captain\'s Hat', 'Giant\'s Mask', 'Fierce Deity\'s Mask']
    },
    mounted() {
        this.resetStart();
        this.getRows()
    },
    watch: {
        start() {
            this.hexStart = parseInt(this.start, 16);
            this.setByte(this.cell.i, this.cell.j);
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
                    if (i === 0 && j < 8 && this.version === 'J') {
                        this.rows[i][j] = '--';
                    } else if (i === 33 && (this.version === 'U' || j > 7)) {
                        this.rows[i][j]  = '--';
                    } else {
                        this.rows[i][j] = 'ff';
                    }
                }
            }
            if (Number.isInteger(this.item)) {
                var item = this.item;
                this.setLoneByte(item);
                if (this.version === 'J') {
                    item += 1;
                }
                for (var i = 0; i < 8; i++) {
                    var timestampByte = i;
                    if (this.endian === 'L') {
                        timestampByte = (Math.floor(i/4) + 1) * 4 - i % 4 - 1;
                    }
                    var row = Math.floor(item/2);
                    var col = item % 2 * 8;
                    this.rows[row][col + i] = this.timestamp[timestampByte] + 'x';
                    var timerByte = '00';
                    if ((this.endian === 'B' && i === 6) || (this.endian === 'L' && i === 5)) {
                        timerByte = '17';
                    } else if ((this.endian === 'B' && i === 7) || (this.endian === 'L' && i === 4)) {
                        timerByte = '70';
                    }
                    this.rows[row + 3][col + i] = timerByte;
                    this.rows[row + 6][col + i] = timerByte;
                    this.rows[row + 9][col + i] = '00';
                }
            }
            for (var i = 0; i < 11; i++) {
                this.extraRows[i] = [];
                for (var j = 0; j < 16; j++) {
                    if (this.version === 'U' && i % 3 === 0 && j > 7) {
                        this.extraRows[i][j] = 'ff';
                    } else if (this.version === 'J' && i % 3 === 1 && j < 8) {
                        this.extraRows[i][j] = 'ff';
                    } else {
                        this.extraRows[i][j] = '--';
                    }
                }
            }
            if (this.item === 'empty') {
                this.setLoneByte(255);
                for (var i = 0; i < 8; i++) {
                    var timestampByte = i;
                    if (this.endian === 'L') {
                        timestampByte = (Math.floor(i/4) + 1) * 4 - i % 4 - 1;
                    }
                    var row = 0;
                    var col = 8;
                    if (this.version === 'J') {
                        row = 1;
                        col = 0;
                    }
                    this.extraRows[row][col + i] = this.timestamp[timestampByte] + 'x';
                    var timerByte = '00';
                    if ((this.endian === 'B' && i === 6) || (this.endian === 'L' && i === 5)) {
                        timerByte = '17';
                    } else if ((this.endian === 'B' && i === 7) || (this.endian === 'L' && i === 4)) {
                        timerByte = '70';
                    }
                    this.extraRows[row + 3][col + i] = timerByte;
                    this.extraRows[row + 6][col + i] = timerByte;
                    this.extraRows[row + 9][col + i] = '00';
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
        },
        setLoneByte(itemNo) {
            if (this.version === 'J') {
                itemNo += 2;
            }
            var lone = 120 + itemNo;
            if (this.endian === 'L') {
                lone = (Math.floor(itemNo/4) + 1) * 4 + 119 - itemNo % 4;
            }
            this.rows[Math.floor(lone/16)][lone % 16] = '01';
        },
        setByte(i, j, extra) {
            if (i === null || j === null) {
                return;
            }
            if (extra) {
                if (this.extraRows[i][j] !== '--') {
                    var byte = i/3 * 8 + j + 520;
                    if (this.version === 'J') {
                        byte = (i - 1)/3 * 8 + j + 528;
                    }
                    if (this.endian === 'L') {
                        byte = this.toLittleEndian(byte);
                    }
                    this.byte = byte;
                }
            } else if (this.rows[i][j] !== '--') {
                var byte = i * 16 + j;
                var address = `0x${(this.hexStart + byte).toString(16).toUpperCase()}`;
                if (this.version === 'J') {
                    byte -= 8;
                }
                if (this.endian === 'L') {
                    byte = this.toLittleEndian(byte);
                }
                if (byte === this.byte && address === this.address) {
                    this.cell = {i: null, j: null};
                    this.byte = null;
                    this.address = '';
                } else {
                    this.cell = {i: i, j: j};
                    this.address = address;
                    this.byte = byte;
                }
            } else if (this.cell.i === i && this.cell.j === j) {
                this.cell = {i: null, j: null};
                this.byte = null;
                this.address = '';
            }
        },
        toLittleEndian(byte) {
            return 4 * Math.floor(byte/4) + 3 - (byte % 4);
        }
    }
});
