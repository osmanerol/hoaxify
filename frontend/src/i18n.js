import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { register } from 'timeago.js';

i18n.use(initReactI18next).init({
    resources:{
        en:{
            translations:{
                "Sign Up":"Sign Up",
                Login:"Login",
                Username:"Username",
                "Display Name":"Display Name",
                Password:"Password",
                "Password Confirm":"Password Confirm",
                "password missmatch":"password missmatch",
                "Do you have an account ?":"Do you have an account ?",
                "Don't you have an account ?":"Don't you have an account ?",
                Logout:"Logout",
                Users:"Users",
                Previous:"< previous",
                Next:"next >",
                "Load Failure":"Load Failure",
                "User not found":"User not found.",
                Edit:"Edit",
                "Change Display Name":"Change Display Name",
                Save:"Save",
                Cancel:"Cancel",
                "Choose file":"Choose file",
                Profile:"Profile",
                "There are no hoaxes":"There are no hoaxes.", 
                "Load old hoaxes":"Load old hoaxes.",
                "There are new hoaxes":"There are new hoaxes."
            }
        },
        tr:{
            translations:{
                "Sign Up":"Kaydol",
                Login:"Giriş Yap",
                Username:"Kullanıcı Adı",
                'Display Name':"Tercih Edilen İsim",
                Password:"Şifre",
                "Password Confirm":"Şifre Tekrar",
                "password missmatch":"şifreler eşleşmiyor",
                "Do you have an account ?":"Zaten hesabın var mı ?",
                "Don't you have an account ?":"Hesabın yok mu ?",
                Logout:"Çıkış Yap",
                Users:"Kullanıcılar",
                Previous:"< önceki",
                Next:"sonraki >",
                "Load Failure":"Liste alınamadı",
                "User not found":"Kullanıcı bulunamadı.",
                Edit:"Düzenle",
                "Change Display Name":"Tercih Edilen İsmi Değiştir",
                Save:"Kaydet",
                Cancel:"İptal Et",
                "Choose file":"Dosya Seç",
                Profile:"Profil",
                "There are no hoaxes":"Hoax bulunamadı.",
                "Load old hoaxes":"Geçmiş hoaxları getir.",
                "There are new hoaxes":"Yeni hoaxlar var."
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

const timeagoTR=(number, index)=>{
    return [
      ['az önce', 'şimdi'],
      ['%s saniye önce', '%s saniye içinde'],
      ['1 dakika önce', '1 dakika içinde'],
      ['%s dakika önce', '%s dakika içinde'],
      ['1 saat önce', '1 saat içinde'],
      ['%s saat önce', '%s saat içinde'],
      ['1 gün önce', '1 gün içinde'],
      ['%s gün önce', '%s gün içinde'],
      ['1 hafta önce', '1 hafta içinde'],
      ['%s hafta önce', '%s hafta içinde'],
      ['1 ay önce', '1 ay içinde'],
      ['%s ay önce', '%s ay içinde'],
      ['1 yıl önce', '1 yıl içinde'],
      ['%s yıl önce', '%s yıl içinde'],
    ][index];
}

register('tr',timeagoTR);

export default i18n;