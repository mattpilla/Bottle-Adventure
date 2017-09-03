ba = new Vue({
    el: '#ba',
    data: {
        start: '',
        hexStart: 0x0,
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
        }
    },
    methods: {
        resetStart() {
            this.start = 'add090';
        },
        getRows() {
            for (var i = 0; i < 33; i++) {
                this.rows[i] = [];
                for (var j = 0; j < 16; j++) {
                    this.rows[i][j] = 'ff';
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
