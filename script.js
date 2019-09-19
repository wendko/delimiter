const vm = new Vue({
    el: '#app',
    data: {
        originalText: 'a',
        oldSeparator: '',
        newSeparator: ',',
    },
    computed: {
        transformedText: function () {
            return this.originalText
                .split(this.oldSeparator)
                .join(this.newSeparator);
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
            return this.separateDuplicates.reduce(x => {

            }, []);
        }
    }
});