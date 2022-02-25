const moment = require('moment');

const isDate = ( value ) => { // se puede usar { req, location, path } en los custom validator.

    if ( !value ) {
        return false;
    }
    const fecha = moment( value )
    if ( fecha.isValid() ){
        return true;
    } else {
        return false;
    }

}


module.exports = {
    isDate
}