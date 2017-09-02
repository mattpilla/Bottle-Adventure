app = new Vue({
    el: '#app',
    data: {
        start: 0xadd090,
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
        endian: 'L'
    }
});
