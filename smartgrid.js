var smartgrid = require('smart-grid');

var settings = {
    filename: 'smartgrid',
    mixinNames: {
        container: 'wp',
    },
    outputStyle: 'less',
    /* less || scss || sass || styl */
    columns: 12,
    offset: '30px',
    /* отступ между колонок */
    mobileFirst: false,
    /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1200px',
        fields: '30px' /* отступ главного containerа */
    },
    breakPoints: {
        lg: {
            width: '1100px',
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            fields: '15px'
        },
        xs: {
            width: '560px'
        },
    }
};

smartgrid('./src/less/', settings);