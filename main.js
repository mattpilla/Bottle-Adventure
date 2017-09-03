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
        item: null
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
        endian() {
            this.resetStart();
            this.getRows();
        }
    },
    methods: {
        resetStart() {
            if (this.endian === 'B') {
                this.start = '1f0600';
            } else {
                this.start = 'add090';
            }
        },
        getRows() {
            for (var i = 0; i < 33; i++) {
                this.rows[i] = [];
                for (var j = 0; j < 16; j++) {
                    this.rows[i][j] = 'ff';
                }
            }
            if (Number.isInteger(this.item) && this.endian === 'L') {
                var lone = (Math.floor(this.item/4) + 1) * 4 + 119 - this.item % 4;
                this.rows[Math.floor(lone/16)][lone % 16] = '01';
                for (var i = 0; i < 8; i++) {
                    var timeByte = (Math.floor(i/4) + 1) * 4 - i % 4 - 1;
                    var row = Math.floor(this.item/2);
                    var col = this.item % 2 * 8;
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
