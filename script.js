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
        originalText: '',
        transformedText: '',
        oldDelimiter: '',
        newDelimiter: ',',
        coloredTheme: false,
    },
    methods: {
        removeDuplicates: function () {
            this.transformedText = this.separateDuplicates.unique.join(this.newDelimiter);
        },
        copy: function () {
            document.getElementById("transformedText").select();
            document.execCommand('copy');
        }
    },
    watch: {
        originalText: function (originalText) {
            this.transformedText = originalText
                .split(this.oldDelimiter)
                .join(this.newDelimiter);
        },
        oldDelimiter: function (oldDelimiter) {
            this.transformedText = this.originalText
                .split(oldDelimiter)
                .join(this.newDelimiter);
        },
        newDelimiter: function (newDelimiter) {
            this.transformedText = this.originalText
                .split(this.oldDelimiter)
                .join(newDelimiter);
        },
        coloredTheme: function (isColoredTheme) {
            const theme = isColoredTheme ? 'unicorn' : 'horse';
            [
                '--c-icon-bg',
                '--c-border',
                '--c-focus',
                '--c-primary',
                '--c-secondary',
                '--c-text-btn',
                '--c-text-label',
                '--c-text-title',
                '--c-heart'
            ].forEach(cssVar => {
                document.documentElement.style.setProperty(
                    cssVar,
                    `var(--${theme}-${cssVar.replace('--', '')})`
                );
            });
        }
    },
    computed: {
        transformedTextArr: function () {
            return this.transformedText.split(this.newDelimiter);
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