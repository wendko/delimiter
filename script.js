Vue.filter('handleWhiteSpace', function (value) {
    if (!value) { return '' }
    // New line check must supercede whitespace check
    if (value.match(/\n+/g)) {
        return 'new line';
    } else if (value.match(/\s+/g)) {
        return 'whitespace';
    } else {
        return value;
    }
})


const vm = new Vue({
    el: '#app',
    data: {
        originalText: 'a',
        oldSeparator: '',
        newSeparator: ',',
        // transformedText: '',
    },
    methods: {
        test: function () {
            console.log('hihi');
            console.log(this.transformedText);

            this.transformedText = this.separateDuplicates.unique.join('!!');
            console.log(this.transformedText);
        },
        removeDuplicates: function () {
            this.transformedText = this.separateDuplicates.unique.join(this.newSeparator);
        },
        copy: function () {
            document.getElementById("transformedText").select();
            document.execCommand('copy');
        }
    },
    computed: {
        transformedText: {
            get: function () {
                return this.originalText
                    .split(this.oldSeparator)
                    .join(this.newSeparator);
            },
            set: function (newVal) { }
        },
        transformedTextArr: function () {
            return this.transformedText.split(this.newSeparator);
        },
        separateDuplicates: function () {
            return this.transformedTextArr.reduce((acc, cur) => {
                if (acc.unique.includes(cur)) {
                    acc.duplicates.push(cur);
                } else {
                    acc.unique.push(cur);
                }
                return acc;
            }, { unique: [], duplicates: [] });
        },
        getDuplicateCount: function () {
            return this.separateDuplicates.duplicates.reduce((acc, cur) => {
                const existingEntry = acc.find(x => x.name === cur);
                if (!existingEntry) {
                    acc.push({ name: cur, count: 1 });
                } else {
                    existingEntry.count++;
                }
                return acc;
            }, []);
        }
    }

});