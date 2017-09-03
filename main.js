ba = new Vue({
    el: '#ba',
    data: {
        start: '',
        hexStart: 0x0,
        rows: 33,
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
    },
    watch: {
        start() {
            this.hexStart = parseInt(this.start, 16);
        }
    },
    methods: {
        resetStart() {
            this.start = 'add090';
        }
    }
});
