import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources:{
        en:{
            translations:{
                "Sign Up":"Sign Up",
                "Login":"Login",
                "Username":"Username",
                "Display Name":"Display Name",
                "Password":"Password",
                "Password Confirm":"Password Confirm",
                "password missmatch":"password missmatch",
                "Do you have an account ?":"Do you have an account ?",
                "Don't you have an account ?":"Don't you have an account ?"
            }
        },
        tr:{
            translations:{
                "Sign Up":"Kaydol",
                "Login":"Giriş Yap",
                "Username":"Kullanıcı Adı",
                "Display Name":"Tercih Edilen İsim",
                "Password":"Şifre",
                "Password Confirm":"Şifre Tekrar",
                "password missmatch":"şifreler eşleşmiyor",
                "Do you have an account ?":"Zaten hesabın var mı ?",
                "Don't you have an account ?":"Hesabın yok mu ?"
            }
        }
    },
    lng:'en',
    fallbackLng:'en',
    ns:['translations'],
    defaultNS:'translations',
    keySeparator:false,
    interpolation:{
        escapeValue:false,
        formatSeparator:','
    },
    react:{
        wait:true
    }
});

export default i18n;