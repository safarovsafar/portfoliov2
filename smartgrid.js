var smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
var settings = {
    filename: 'smartgrid',
     mixinNames: {
         container: 'wp',
     },
    outputStyle: 'scss',
    /* less || scss || sass || styl */
    columns: 24,
    /* number of grid columns */
    offset: '30px',
    /* gutter width px || % */
    mobileFirst: false,
    /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1460px',
        /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        xl: {
            width: '1400px',
        },
        lg: {
            width: '1200px',
            /* -> @media (max-width: 1400px) */
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            fields: '15px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '560px'
        },
        us: {
            width: '360px'
        },
        hs: {
            width: '320px'
        }
        /* 
        We can create any quantity of break points.
 
        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};

smartgrid('./src/assets/scss', settings);