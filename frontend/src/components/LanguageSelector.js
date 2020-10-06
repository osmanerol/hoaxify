import React from 'react';
import { changeLanguage } from '../api/ApiCall';

const LanguageSelector = props => {
    const onChangeLanguage=language=>{
        const { i18n }=props;
        i18n.changeLanguage(language)
        changeLanguage(language);
    }

    return (
        <div className="change-language">
            <img src="https://www.countryflags.io/us/flat/24.png" onClick={()=>onChangeLanguage('en')} alt="USA flag" style={{cursor:'pointer'}} />
            <img src="https://www.countryflags.io/tr/shiny/24.png" onClick={()=>onChangeLanguage('tr')} alt="Turkish flag" style={{cursor:'pointer'}} />
        </div>
    );
};


export default LanguageSelector;